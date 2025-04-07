import {
  AppContentWrapper,
  AppMainWrapper,
  AppTitleWrapper,
  WbcFairProgrammeCoverPopover,
  WbcFairProgrammePopover,
  WbcGalleryListing,
  WbcMultiImageUpload,
  WbcSubmitBtn,
  WbPageLoader,
} from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { fairTypes, titles } from '@/constants';
import { updateSrCounter } from '@/features/commonSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { FairProgrammeProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Editor from 'react-simple-wysiwyg';

type FormProps = {
  title: string | undefined;
  occurance: string | undefined;
};

const WbAddEditFairProgramme = () => {
  document.title = `Fairs & Programmes | Add New | ${titles.services} `;

  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<FormProps>({
    title: '',
    occurance: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [description, setDescription] = useState<string | undefined>('');
  const [coverImg, setCoverImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { slug, uuid } = useParams();
  const [editData, setEditData] = useState<FairProgrammeProps | null>(null);
  const [dbCover, setDbCover] = useState<string | null>(null);
  const { srCounter } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  // ---------------------------------------

  function onChange(e: { target: { value: string } }) {
    setDescription(e.target.value);
  }

  // ---------------------------------------

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors({
        ...errors,
        cover: ['Invalid file type. Allowed: jpeg, png, jpg, webp'],
      });
      setCoverImg(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > 100 * 1024) {
      setErrors({ ...errors, cover: ['File size must be less than 100 KB'] });
      setCoverImg(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setCoverImg(file);
  };

  // ---------------------------------------

  const clearImg = () => {
    setCoverImg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setErrors({ ...errors, cover: [] });
  };

  // ---------------------------------------

  const resetError = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ---------------------------------------

  const resetForm = () => {
    if (!uuid) {
      setForm({
        title: '',
        occurance: '',
      });
      setErrors(null);
      setDescription('');
    } else {
      setForm({
        title: editData?.title,
        occurance: editData?.occurance,
      });
      setErrors(null);
      setDescription(editData?.description || '');
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
    setCoverImg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ---------------------------------------

  const fetchData = async () => {
    if (uuid) {
      setIsLoading(true);
      try {
        const response = await customFetch.get(`/fair-programme/edit/${uuid}`);

        if (response.status === 200) {
          const newEditData = response.data.data;
          setEditData(newEditData);
          setForm({
            ...form,
            title: newEditData.title,
            occurance: newEditData.occurance,
          });
          setDescription(newEditData.description || '');
          setDbCover(newEditData.cover_image);
        }
      } catch (error) {
        return showError('Something went wrong!');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // ---------------------------------------

  useEffect(() => {
    fetchData();
  }, [uuid, srCounter]);

  // ---------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;

    if (!form.title) {
      errorBag = { ...errorBag, title: ['Title is required'] };
      errorCount++;
    }
    if (!form.occurance) {
      errorBag = { ...errorBag, occurance: ['Occurance is required'] };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, description: description ? description : '' };
    data = coverImg ? { ...data, cover: coverImg } : data;
    const apiUrl = uuid
      ? `/fair-programme/update/${uuid}`
      : `/fair-programme/store`;
    const msg = uuid ? 'updated' : 'added';

    setIsLoading(true);
    try {
      const response = await customFetch.post(apiUrl, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      let fuuid = '';
      if (response.status === 201 || response.status === 200) {
        resetForm();
        showSuccess(`Fair / programme ${msg} successfully!`);
        fuuid = response.data.uuid;
        dispatch(updateSrCounter());
      }
      const redirect = uuid ? pathname : `${pathname}/${fuuid}`;
      navigate(redirect);
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        return setErrors((error as any)?.response?.data?.errors);
      } else if ((error as any)?.response?.status === 404) {
        return showError((error as any)?.response?.data?.errors[0]);
      }
      return showError(`Something went wrong!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppMainWrapper>
      {isLoading && <WbPageLoader />}
      <AppTitleWrapper>Add new fair / programme</AppTitleWrapper>
      <AppContentWrapper>
        {/* Fair / Programme details add / edit starts here ------------------ */}
        <div className="p-2 border border-muted-foreground/10 flex flex-col justify-start items-start">
          <form className="w-full" onSubmit={handleSubmit}>
            <div className="w-full grid grid-cols-3 grid-flow-row gap-6">
              <div className="col-span-2">
                <div className="w-full p-2 bg-sky/10 text-sm font-medium tracking-widest uppercase text-sky-500 mb-4">
                  information
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2 flex flex-col gap-2">
                      <Label
                        htmlFor="title"
                        className="capitalize text-muted-foreground"
                      >
                        title <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        type="text"
                        id="title"
                        name="title"
                        placeholder="Enter title"
                        value={form.title}
                        onChange={handleChange}
                        onKeyUp={resetError}
                      />
                      <span className="text-red-500 text-xs">
                        {errors?.title?.[0]}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor="occurance"
                        className="capitalize text-muted-foreground"
                      >
                        occurance <span className="text-red-500">*</span>
                      </Label>
                      <select
                        className="flex h-9 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                        name="occurance"
                        id="occurance"
                        value={form.occurance}
                        onChange={handleChange}
                      >
                        <option value="">- Select -</option>
                        {fairTypes.map((type) => (
                          <option key={type.value} value={type.value}>
                            {type.label}
                          </option>
                        ))}
                      </select>
                      <span className="text-red-500 text-xs">
                        {!form.occurance && errors?.occurance?.[0]}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="description"
                      className="capitalize text-muted-foreground"
                    >
                      description <WbcFairProgrammePopover />
                    </Label>
                    <Editor
                      name="description"
                      id="description"
                      value={description}
                      onChange={onChange}
                      className="border-input placeholder:text-muted-foreground aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-52 w-full bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                    />
                  </div>
                </div>
              </div>
              <div className="">
                <div className="w-full p-2 bg-sky/10 text-sm font-medium tracking-widest uppercase text-sky-500 mb-4">
                  cover photo
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-2">
                    <Label className="text-muted-foreground">
                      Select a cover photo
                      <WbcFairProgrammeCoverPopover />
                    </Label>
                    <Input
                      type="file"
                      id="cover"
                      name="cover"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                    />
                    <span className="text-red-500 text-xs">
                      {errors?.cover?.[0]}
                    </span>
                  </div>
                  <div className="flex flex-row justify-start items-start">
                    <div className="w-40 h-44 border border-dashed flex justify-center items-center">
                      {coverImg ? (
                        <img
                          src={URL.createObjectURL(coverImg)}
                          alt="cover"
                          className="w-full h-full object-cover"
                        />
                      ) : dbCover ? (
                        <img
                          src={`${titles.baseUrl}${dbCover}`}
                          alt="cover"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-muted-foreground font-extralight">
                          preview
                        </span>
                      )}
                    </div>
                    {coverImg && (
                      <Button
                        type="button"
                        variant={'ghost'}
                        className="hover:bg-transparent"
                        onClick={clearImg}
                      >
                        <X className="text-red-500" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-3 flex justify-end items-center gap-4">
                <WbcSubmitBtn
                  isLoading={isLoading}
                  text="Save"
                  customClass="cs-btn-primary"
                />
                <Button type="button" variant={'outline'} onClick={resetForm}>
                  Reset
                </Button>
                <Link to={`/${titles.servicesUrl}/${slug}/fairs-programmes`}>
                  <Button type="button" variant={'outline'}>
                    Back to List
                  </Button>
                </Link>
              </div>
            </div>
          </form>
        </div>
        {/* Fair / Programme details add / edit ends here ------------------ */}

        {/* Previous gallery images start ----------------- */}
        {editData && (
          <div className="mt-4 p-2 border border-muted-foreground/10 flex flex-col justify-start items-start">
            <div className="w-full p-2 bg-sky/10 text-sm font-medium tracking-widest uppercase text-sky-500 flex justify-between items-center">
              <p>previously uploaded</p>
            </div>
            <WbcGalleryListing galleries={editData.gallery} />
          </div>
        )}
        {/* Previous gallery images end ----------------- */}

        {/* New image upload section starts here ----------------- */}
        <div className="mt-4 p-2 border border-muted-foreground/10 flex flex-col justify-start items-start">
          <div className="w-full p-2 bg-sky/10 text-sm font-medium tracking-widest uppercase text-sky-500 flex justify-between items-center">
            <p>upload new photos</p>
          </div>
          <WbcMultiImageUpload />
        </div>
        {/* New image upload section ends here ----------------- */}
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbAddEditFairProgramme;
