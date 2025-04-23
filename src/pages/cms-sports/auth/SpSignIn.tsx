import { WbcSubmitBtn } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { images, titles } from '@/constants';
import { setCurrentUserSp } from '@/features/currentUserSlice';
import { useAppDispatch } from '@/hooks';
import customFetch from '@/utils/customFetch';
import { generateCaptcha } from '@/utils/function';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { RefreshCcw } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { authSchema, AuthSchema } from '@/types/schema';
import { zodResolver } from '@hookform/resolvers/zod';

type ExtendedFormProps = AuthSchema & {
  captchaText: string;
  organisation: string;
};

const SpSignIn = () => {
  document.title = `Admin Sign In | ${titles.sports}`;

  const captcha = generateCaptcha();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const resetCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptchaText(newCaptcha);
  };
  const [captchaText, setCaptchaText] = useState(captcha);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<AuthSchema>({
    mode: 'all',
    resolver: zodResolver(authSchema(captchaText)),
  });

  // ------------------------------

  const onSubmit: SubmitHandler<AuthSchema> = async (data) => {
    try {
      const finalData: ExtendedFormProps = {
        ...data,
        captchaText,
        organisation: 'sports',
      };
      const response = await customFetch.post(`/auth/login`, finalData);
      const name = response.data.data.name;
      const slug = response.data.data.user_details.slug;
      const token = response.data.token;

      localStorage.setItem(titles.sportsToken, token);
      dispatch(setCurrentUserSp(response.data.data));
      showSuccess(`Welcome back, ${name}`);
      navigate(`/${titles.sportsUrl}/${slug}/dashboard`);
    } catch (error) {
      if ((error as any).status === 422) {
        Object.entries((error as any)?.response?.data?.errors).forEach(
          ([field, message]) => {
            setError(field as keyof AuthSchema, {
              message: message as string,
            });
          }
        );
        return;
      }
      return showError((error as any)?.response?.data?.errors[0]);
    }
  };

  return (
    <div className="h-screen w-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white grid grid-cols-5 max-w-4xl min-h-[500px] mx-auto rounded-md shadow-2xl">
        <div className="col-span-3 p-8">
          <div className="flex flex-row justify-between items-center mb-10">
            <img src={images.sportsLogo} alt={titles.sports} className="h-14" />
          </div>
          <div className="">
            <h1 className="text-3xl font-bold text-success tracking-wider">
              Welcome back
            </h1>
            <p className="text-sm mt-1 mb-10 text-muted-foreground">
              Welcome back! Please enter your credentials
            </p>
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="flex flex-col space-y-2">
                <Label className="text-muted-foreground">
                  Username <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  {...register('username')}
                  placeholder="Enter your username"
                />
                <span className="text-red-500 text-xs">
                  {errors.username?.message}
                </span>
              </div>
              <div className="flex flex-col space-y-2 mt-3">
                <span className="flex justify-between items-center">
                  <Label className="text-muted-foreground">
                    Password <span className="text-red-500">*</span>
                  </Label>
                  <Link
                    to={`/${titles.sportsUrl}/forgot-password`}
                    className="text-sm font-medium text-muted-foreground hover:text-success"
                    tabIndex={-1}
                  >
                    Forgot password?
                  </Link>
                </span>
                <Input
                  type="password"
                  {...register('password')}
                  placeholder="Enter your password"
                />
                <span className="text-red-500 text-xs">
                  {errors.password?.message}
                </span>
              </div>
              <div className="mt-3 flex flex-row justify-start items-center">
                <div className="flex flex-row justify-center items-center mb-2 md:mb-0">
                  <div
                    className={`relative p-2 md:p-4 min-w-40 max-w-40 bg-muted-foreground/20 rounded-xs select-none flex items-center justify-center font-medium tracking-widest text-xl md:text-3xl italic text-primary/80`}
                    onDoubleClick={(e) => e.preventDefault()}
                    onMouseDown={(e) => e.preventDefault()}
                    onCopy={(e) => e.preventDefault()}
                  >
                    {captchaText}
                  </div>
                  <Button
                    type="button"
                    variant={'ghost'}
                    size={'sm'}
                    className="cursor-pointer font-bold hover:bg-transparent rounded-none"
                    onClick={resetCaptcha}
                    tabIndex={-1}
                  >
                    <RefreshCcw />
                  </Button>
                </div>
                <div className="w-full flex flex-col justify-start items-start space-y-2">
                  <Input
                    type="text"
                    {...register('captchaEnter')}
                    placeholder="Enter captcha"
                  />
                  <span className="text-red-500 text-xs">
                    {errors.captchaEnter?.message}
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <WbcSubmitBtn
                  customClass="w-full cs-btn-success"
                  text="Sign In"
                  isLoading={isSubmitting}
                />
              </div>
            </form>
          </div>
        </div>
        <div className="col-span-2">
          <img
            src={images.spSigninFormBg}
            alt={titles.sports}
            className="w-full h-full object-cover rounded-tr-md rounded-br-md"
          />
        </div>
      </div>
    </div>
  );
};
export default SpSignIn;
