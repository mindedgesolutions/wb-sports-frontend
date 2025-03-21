import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { images, titles } from '@/constants';
import { FormEvent } from 'react';
import { Link } from 'react-router-dom';

const WbSignIn = () => {
  document.title = `Admin Sign In | ${titles.services}`;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
        <div className="bg-white w-4xl h-[600px] grid grid-flow-row grid-cols-5 rounded-sm shadow-xl shadow-gray-600">
          <div className="col-span-2 overflow-hidden flex justify-center items-center">
            <img
              src={images.wbSignInFormBg}
              alt={titles.services}
              className="h-full w-auto object-cover rounded-l-sm"
            />
          </div>
          <div className="col-span-3 p-12 flex flex-col justify-start items-start rounded-r-sm">
            <div className="flex flex-row justify-between items-center mb-10">
              <img
                src={images.sportsLogo}
                alt={titles.services}
                className="h-14"
              />
            </div>
            <h1 className="text-3xl font-bold text-sky tracking-wider font-roboto">
              Welcome back
            </h1>
            <p className="text-sm tracking-wide mt-1 mb-10 text-muted-foreground">
              Welcome back! Please enter your credentials
            </p>
            <div className="w-full">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-2">
                  <Label className="text-muted-foreground">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                  />
                  <span className="text-red-500 text-xs"></span>
                </div>
                <div className="flex flex-col space-y-2 mt-3">
                  <span className="flex justify-between items-center">
                    <Label className="text-muted-foreground">Password</Label>
                    <Link
                      to={`/${titles.servicesUrl}/forgot-password`}
                      className="text-xs font-medium tracking-wide text-muted-foreground hover:text-sky"
                    >
                      Forgot password?
                    </Link>
                  </span>
                  <Input
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                  />
                  <span className="text-red-500 text-xs"></span>
                </div>
                <div className="">
                  <Button
                    type="submit"
                    className="w-full mt-4 bg-sky hover:bg-sky/90 duration-200 tracking-widest"
                  >
                    Sign In
                  </Button>
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
