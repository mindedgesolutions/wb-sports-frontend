import { useRef, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import WbcSubmitBtn from './cms-services/WbcSubmitBtn';
import { Button } from './ui/button';
import { titles } from '@/constants';
import { X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import AppProfileImgPopover from './AppProfileImgPopover';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { setCurrentUser } from '@/features/currentUserSlice';

type FormProps = {
  name: string;
  mobile: string | number;
  email: string;
};

const AppProfile = () => {
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [form, setForm] = useState<FormProps>({
    name: currentUser?.name || '',
    mobile: currentUser?.user_details.mobile || '',
    email: currentUser?.email || '',
  });
  const [profileImg, setProfileImg] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dbProfileImg, setDbProfileImg] = useState<string | null>(
    currentUser?.user_details.profile_img || null
  );
  const dispatch = useAppDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === 'mobile' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, mobile: Number(numberValue) });
    }
  };

  // ------------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors({
        ...errors,
        cover: ['Invalid file type. Allowed: jpeg, png, jpg, webp'],
      });
      setProfileImg(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > 100 * 1024) {
      setErrors({ ...errors, cover: ['File size must be less than 100 KB'] });
      setProfileImg(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setProfileImg(file);
  };

  // ------------------------------

  const clearImg = () => {
    setProfileImg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ------------------------------

  const resetError = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ------------------------------

  const resetForm = () => {
    setForm({
      name: currentUser?.name || '',
      mobile: currentUser?.user_details.mobile || '',
      email: currentUser?.email || '',
    });
    setProfileImg(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    setDbProfileImg(currentUser?.user_details.profile_img || null);
    setErrors(null);
  };

  // ------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!form.name.trim()) {
      errorBag = { ...errorBag, name: ['Name is required'] };
      errorCount++;
    }
    if (!form.email.trim()) {
      errorBag = { ...errorBag, email: ['Email is required'] };
      errorCount++;
    }
    if (form.mobile && form.mobile.toString().length !== 10) {
      errorBag = { ...errorBag, mobile: ['Invalid mobile no.'] };
      errorCount++;
    }
    if (form.email && !regexEmail.test(form.email)) {
      errorBag = { ...errorBag, email: ['Invalid email'] };
      errorCount++;
    }

    if (errorCount) {
      setErrors(errorBag);
      return;
    }

    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    if (profileImg) data = { ...data, profileImg: profileImg };
    setIsLoading(true);
    try {
      const response = await customFetch.post(`/auth/update`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        showSuccess(`Profile updated successfully`);
        const user = await customFetch.get(`/auth/me`);
        dispatch(setCurrentUser(user.data.data));
        setProfileImg(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
        setDbProfileImg(user.data.data?.user_details.profile_img || null);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-span-3 p-2 border border-muted-foreground/10">
      <div className="w-full p-2 bg-sky/10 text-sm font-medium tracking-widest uppercase text-sky-500 mb-4">
        information
      </div>
      <div className="flex flex-col gap-4">
        <form className="w-full" onSubmit={handleSubmit} autoComplete="off">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="name"
                  className="capitalize text-muted-foreground"
                >
                  name <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter name"
                  value={form.name}
                  onChange={handleChange}
                  onKeyUp={resetError}
                />
                <span className="text-red-500 text-xs">
                  {errors?.name?.[0]}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="capitalize text-muted-foreground"
                >
                  email <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={form.email}
                  onChange={handleChange}
                  onKeyUp={resetError}
                />
                <span className="text-red-500 text-xs">
                  {errors?.email?.[0]}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="mobile"
                  className="capitalize text-muted-foreground"
                >
                  mobile
                </Label>
                <Input
                  type="text"
                  id="mobile"
                  name="mobile"
                  placeholder="Enter mobile"
                  value={form.mobile}
                  onChange={handleChange}
                  onKeyUp={resetError}
                />
                <span className="text-red-500 text-xs">
                  {errors?.mobile?.[0]}
                </span>
              </div>
            </div>
            <div className="">
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                  <Label className="text-muted-foreground">
                    Select a profile photo
                    <AppProfileImgPopover />
                  </Label>
                  <Input
                    type="file"
                    id="profileImg"
                    name="profileImg"
                    ref={fileInputRef}
                    onChange={handleImageChange}
                  />
                  <span className="text-red-500 text-xs">
                    {errors?.cover?.[0]}
                  </span>
                </div>
                <div className="flex flex-row justify-start items-start">
                  <div className="w-28 h-32 border border-dashed flex justify-center items-center">
                    {profileImg ? (
                      <img
                        src={URL.createObjectURL(profileImg)}
                        alt="cover"
                        className="w-full h-full object-cover"
                      />
                    ) : dbProfileImg ? (
                      <img
                        src={`${titles.baseUrl}${dbProfileImg}`}
                        alt={titles.baseUrl}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-muted-foreground font-extralight">
                        preview
                      </span>
                    )}
                  </div>
                  {profileImg && (
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

            <div className="col-span-3 mt-2 flex justify-start items-center gap-4">
              <WbcSubmitBtn
                isLoading={isLoading}
                text="Update"
                customClass="cs-btn-primary"
              />
              <Button type="button" variant={'outline'} onClick={resetForm}>
                Reset
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default AppProfile;
