import { WbcSubmitBtn } from '@/components';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { images, titles } from '@/constants';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const SpForgotPassword = () => {
  document.title = `Forgot Password | ${titles.sports}`;

  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);

  const resetError = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!email.trim()) {
      return setErrors({ ...errors, email: ['Email is required'] });
    }
    if (email && !regexEmail.test(email)) {
      return setErrors({ ...errors, email: ['Invalid email'] });
    }

    const formData = new FormData(e.currentTarget);
    let data = Object.fromEntries(formData);
    data = { ...data, organisation: 'sports' };
    setIsLoading(true);
    try {
      const response = await customFetch.post(`/auth/forgot-password`, data);

      if (response.status === 200) {
        setErrors(null);
        showSuccess(`A password reset link has been sent to ${email}`);
        setEmail('');
      }
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        return setErrors((error as any).response.data.errors);
      }
      return showError(`Something went wrong. Please try again`);
    } finally {
      setIsLoading(false);
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
            <h1 className="text-3xl font-bold text-success-foreground tracking-wider">
              Forgot password?
            </h1>
            <p className="text-sm mt-1 mb-10 text-muted-foreground">
              Enter your email and we will send a password reset link to your
              email
            </p>
          </div>
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-2">
                <Label className="text-muted-foreground">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={resetError}
                />
                <span className="text-red-500 text-xs">
                  {errors?.email?.[0]}
                </span>
              </div>
              <div className="mt-4">
                <WbcSubmitBtn
                  customClass="w-full cs-btn-success"
                  isLoading={isLoading}
                  text="Send Link"
                />
              </div>
            </form>
            <div className="mt-4 text-center">
              <Link
                to={`/${titles.sportsUrl}/sign-in`}
                className="text-sm font-medium text-muted-foreground hover:text-sky"
              >
                Forget it. Take me back to login page
              </Link>
            </div>
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
export default SpForgotPassword;
