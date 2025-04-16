import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { images, titles } from '@/constants';
import { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { useAppDispatch } from '@/hooks';
import { setCurrentUser } from '@/features/currentUserSlice';
import { WbcSubmitBtn } from '@/components';
import { generateCaptcha } from '@/utils/function';
import { RefreshCcw } from 'lucide-react';

const WbSignIn = () => {
  document.title = `Admin Sign In | ${titles.services}`;

  const captcha = generateCaptcha();
  const [captchaText, setCaptchaText] = useState(captcha);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    username: '',
    password: '',
    captchaEnter: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const captchaRef = useRef<HTMLInputElement>(null);

  const resetCaptcha = () => {
    const newCaptcha = generateCaptcha();
    setCaptchaText(newCaptcha);
  };

  // ------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ------------------------------

  const resetError = (e: React.KeyboardEvent<HTMLInputElement>) => {
    errors && setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;

    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, captchaText: captchaText };

    if (!data.username) {
      errorBag = { ...errorBag, username: ['Username is required'] };
      errorCount++;
    }
    if (!data.password) {
      errorBag = { ...errorBag, password: ['Password is required'] };
      errorCount++;
    }
    if (!data.captchaEnter) {
      errorBag = { ...errorBag, captchaEnter: ['Captcha is required'] };
      errorCount++;
    }
    if (data.captchaEnter !== captchaText) {
      errorBag = { ...errorBag, captchaEnter: ['Captcha is invalid'] };
      if (captchaRef.current) {
        captchaRef.current.value = '';
        captchaRef.current.focus();
      }
      resetCaptcha();
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    setIsLoading(true);
    try {
      const response = await customFetch.post(`/auth/login`, data);
      const name = response.data.data.name;
      const slug = response.data.data.user_details.slug;
      const token = response.data.token;

      localStorage.setItem(titles.serviceToken, token);
      dispatch(setCurrentUser(response.data.data));
      showSuccess(`Welcome back, ${name}`);
      setIsLoading(false);
      navigate(`/${titles.servicesUrl}/${slug}/dashboard`);
    } catch (error) {
      setIsLoading(false);
      if ((error as any).status === 422) {
        return setErrors((error as any)?.response?.data?.errors);
      }
      return showError((error as any)?.response?.data?.errors[0]);
    }
  };

  return (
    <div className="relative">
      <img
        src={images.wbSignInBg}
        alt={titles.services}
        className="w-screen h-screen object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-10"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white w-4xl min-h-[500px] grid grid-flow-row grid-cols-5 rounded-sm shadow-xl shadow-gray-600">
          <div className="col-span-2 overflow-hidden flex justify-center items-center">
            <img
              src={images.wbSignInFormBg}
              alt={titles.services}
              className="h-full w-auto object-cover rounded-l-sm"
            />
          </div>
          <div className="col-span-3 p-12 pt-8 flex flex-col justify-start items-start rounded-r-sm">
            <div className="flex flex-row justify-between items-center mb-10">
              <img
                src={images.sportsLogo}
                alt={titles.services}
                className="h-14"
              />
            </div>
            <h1 className="text-3xl font-bold text-sky tracking-wider">
              Welcome back
            </h1>
            <p className="text-sm mt-1 mb-10 text-muted-foreground">
              Welcome back! Please enter your credentials
            </p>
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2">
                  <Label className="text-muted-foreground">
                    Username <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={form.username}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs">
                    {errors?.username?.[0]}
                  </span>
                </div>
                <div className="flex flex-col space-y-2 mt-3">
                  <span className="flex justify-between items-center">
                    <Label className="text-muted-foreground">
                      Password <span className="text-red-500">*</span>
                    </Label>
                    <Link
                      to={`/${titles.servicesUrl}/forgot-password`}
                      className="text-sm font-medium text-muted-foreground hover:text-sky"
                    >
                      Forgot password?
                    </Link>
                  </span>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <span className="text-red-500 text-xs">
                    {errors?.password?.[0]}
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
                    >
                      <RefreshCcw />
                    </Button>
                  </div>
                  <div className="w-full flex flex-col justify-start items-start space-y-2">
                    <Input
                      type="text"
                      ref={captchaRef}
                      name="captchaEnter"
                      placeholder="Enter captcha"
                      value={form.captchaEnter}
                      onChange={handleChange}
                      onKeyUp={resetError}
                    />
                    <span className="text-red-500 text-xs">
                      {errors?.captchaEnter?.[0]}
                    </span>
                  </div>
                </div>
                <div className="mt-4">
                  <WbcSubmitBtn
                    customClass="w-full cs-btn"
                    isLoading={isLoading}
                    text="Sign In"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default WbSignIn;
