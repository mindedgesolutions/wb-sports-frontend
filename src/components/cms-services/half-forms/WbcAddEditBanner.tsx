import { Label } from '@/components/ui/label';
import serviceWebsiteMenus from '@/constants/wbMenu';
import { WebsiteMenuProps } from '@/types/menu';
import { nanoid } from 'nanoid';
import { WbcBannerPopover } from '@/components';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import { X } from 'lucide-react';
import WbcSubmitBtn from '../WbcSubmitBtn';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateSrCounter } from '@/features/commonSlice';
import { BannerProps } from '@/types/contents';
import { titles } from '@/constants';

const WbcAddEditBanner = ({
  editId,
  setEditId,
}: {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const menus = serviceWebsiteMenus() as WebsiteMenuProps[];
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [form, setForm] = useState({ page: '', pageTitle: '' });
  const [banner, setBanner] = useState<File | null>(null);
  const [savedImage, setSavedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();
  const { banners } = useAppSelector((state) => state.banners);

  const editData: BannerProps | 0 | null | undefined =
    banners &&
    editId &&
    banners.find((banner: BannerProps) => banner.id === editId);

  // ------------------------------

  useEffect(() => {
    if (editData) {
      setForm({
        page: (editData as BannerProps).page_url ?? null,
        pageTitle: (editData as BannerProps).page_title ?? null,
      });
      setSavedImage((editData as BannerProps).image_path ?? null);
    }
  }, [editId]);

  // ------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ------------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors({
        ...errors,
        banner: ['Invalid file type. Allowed: jpeg, png, jpg, webp'],
      });
      setBanner(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > 100 * 1024) {
      setErrors({ ...errors, banner: ['File size must be less than 100 KB'] });
      setBanner(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setBanner(file);
  };

  // ------------------------------

  const resetError = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ------------------------------

  const clearImage = () => {
    setBanner(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ------------------------------

  const resetForm = () => {
    setForm({ ...form, page: '', pageTitle: '' });
    setBanner(null);
    setErrors(null);
    setSavedImage(null);
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;

    if (!editId && !form.page) {
      errorBag = { ...errorBag, page: ['Page is required'] };
      errorCount++;
    }
    if (!editId && !banner) {
      errorBag = { ...errorBag, banner: ['Banner is required'] };
      errorCount++;
    }
    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    let defaultTitle = '';

    !editId
      ? (menus as WebsiteMenuProps[]).map((menu) => {
          if (menu.link === form.page) {
            defaultTitle = menu.name;
          } else {
            menu.subMenus?.map((subMenu) => {
              if (subMenu.link === form.page) {
                defaultTitle = subMenu.name;
              }
            });
          }
        })
      : form.pageTitle;

    const data = new FormData();
    data.append('page', form.page);
    data.append('pageTitle', form.pageTitle || defaultTitle);
    banner && data.append('banner', banner);

    // for (let entry of data) {
    //   console.log(entry);
    // }
    // return;

    const url = editId ? `/banners/update/${editId}` : `/banners`;
    const msg = editId ? 'Banner updated' : 'Banner uploaded successfully';

    setIsLoading(true);
    try {
      const response = await customFetch.post(url, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200 || response.status === 201) {
        showSuccess(msg);
        resetForm();
        dispatch(updateSrCounter());
      }
    } catch (error) {
      console.log(error);
      if ((error as any).status === 400) {
        return setErrors((error as any)?.response?.data?.message);
      }
      setErrors((error as any)?.response?.data?.errors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border p-2">
      <div className="bg-muted-foreground/10 text-muted-foreground p-2 text-base font-medium tracking-wider">
        {editId ? 'Edit banner details' : 'Add new banner'}
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mt-6">
          <div className="flex flex-col justify-start items-start gap-2">
            <Label className="text-muted-foreground">
              Select a page <span className="text-red-500">*</span>
            </Label>
            <select
              className="flex h-10 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              name="page"
              id="page"
              value={form.page}
              onChange={handleChange}
              disabled={!!editId}
            >
              <option value="">- Select -</option>
              {menus.map((menu: WebsiteMenuProps) => {
                const hasSubMenus = menu.subMenus && menu.subMenus.length > 0;
                if (!hasSubMenus) {
                  return (
                    <option
                      key={nanoid()}
                      value={menu.link!}
                      className="text-muted-foreground"
                    >
                      {menu.name}
                    </option>
                  );
                }
                return (
                  <optgroup
                    key={nanoid()}
                    label={menu.name}
                    className="text-sky font-medium"
                  >
                    {menu.subMenus?.map((subMenu) => (
                      <option
                        key={nanoid()}
                        value={subMenu.link!}
                        className="text-muted-foreground"
                      >
                        {subMenu.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
            <span className="text-red-500 text-xs -mt-1">
              {!form.page && errors?.page?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label className="text-muted-foreground">Change page title</Label>
            <Input
              type="text"
              name="pageTitle"
              id="pageTitle"
              value={form.pageTitle}
              onChange={handleChange}
              onKeyUp={resetError}
              placeholder="Leave empty to use dropdown page title"
            />
            <span className="text-red-500 text-xs -mt-1"></span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <div className="flex flex-row gap-2">
              <Label className="text-muted-foreground">
                Select an image{' '}
                {!!editId ? (
                  '(optional)'
                ) : (
                  <span className="text-red-500">*</span>
                )}
              </Label>
              <WbcBannerPopover />
            </div>
            <Input
              type="file"
              name="banner"
              id="banner"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <span className="text-red-500 text-xs -mt-1">
              {!banner && errors?.banner?.[0]}
            </span>
            <div className="w-full flex justify-start items-start gap-2">
              <div className="w-full h-28 border border-dashed flex justify-center items-center">
                {banner ? (
                  <img
                    src={URL.createObjectURL(banner)}
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                ) : savedImage ? (
                  <img
                    src={titles.baseUrl + savedImage}
                    alt="banner"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-sm font-extralight tracking-widest">
                    preview banner
                  </p>
                )}
              </div>
              {banner && (
                <Button variant="ghost" onClick={clearImage}>
                  <X className="text-red-500 h-8" />
                </Button>
              )}
            </div>
          </div>
          <Separator />
          <div className="my-4 flex flex-row justify-between items-center">
            <Button
              type="button"
              variant="outline"
              className="cs-btn-reset"
              onClick={resetForm}
            >
              Reset
            </Button>
            <WbcSubmitBtn
              isLoading={isLoading}
              text="Upload"
              customClass="cs-btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default WbcAddEditBanner;
