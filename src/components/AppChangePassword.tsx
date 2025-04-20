import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import WbcSubmitBtn from './cms-services/WbcSubmitBtn';
import { Button } from './ui/button';
import customFetch from '@/utils/customFetch';
import { Eye } from 'lucide-react';
import showSuccess from '@/utils/showSuccess';
import showError from '@/utils/showError';

const AppChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [form, setForm] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [oldPasswordType, setOldPasswordType] = useState('password');
  const [newPasswordType, setNewPasswordType] = useState('password');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ------------------------------

  const resetError = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ------------------------------

  const resetForm = () => {
    setErrors(null);
    setForm({
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    });
  };

  // ------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;

    if (!form.oldPassword.trim()) {
      errorCount++;
      errorBag = { ...errorBag, oldPassword: ['Old password is required'] };
    }
    if (!form.newPassword.trim()) {
      errorBag = { ...errorBag, newPassword: ['New password is required'] };
      errorCount++;
    }
    if (!form.confirmPassword.trim()) {
      errorBag = { ...errorBag, confirmPassword: ['Confirm new password'] };
      errorCount++;
    }

    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    setIsLoading(true);
    try {
      const response = await customFetch.post(`/auth/change-password`, data);

      if (response.status === 200) {
        resetForm();
        showSuccess('Password changed successfully');
      }
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        return setErrors((error as any)?.response?.data?.errors);
      }
      return showError(`Something went wrong! Please try again.`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-span-3 p-2 border border-muted-foreground/10">
      <div className="w-full p-2 bg-sky/10 text-sm font-medium tracking-widest uppercase text-sky-500 mb-4">
        change password
      </div>
      <div className="flex flex-col gap-4">
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-2 flex flex-col gap-3">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="oldPassword"
                  className="capitalize text-muted-foreground"
                >
                  old password <span className="text-red-500">*</span>
                </Label>
                <div className="flex relative">
                  <Input
                    type={oldPasswordType}
                    id="oldPassword"
                    name="oldPassword"
                    placeholder="Enter old password"
                    value={form.oldPassword}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <Button
                    variant={'link'}
                    type="button"
                    className="absolute right-0 top-0"
                    onClick={() =>
                      setOldPasswordType(
                        oldPasswordType === 'password' ? 'text' : 'password'
                      )
                    }
                  >
                    <Eye className="size-4 text-muted-foreground" />
                  </Button>
                </div>
                <span className="text-red-500 text-xs">
                  {errors?.oldPassword?.[0]}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="newPassword"
                  className="capitalize text-muted-foreground"
                >
                  new password <span className="text-red-500">*</span>
                </Label>
                <div className="flex relative">
                  <Input
                    type={newPasswordType}
                    id="newPassword"
                    name="newPassword"
                    placeholder="Enter new password"
                    value={form.newPassword}
                    onChange={handleChange}
                    onKeyUp={resetError}
                  />
                  <Button
                    variant={'link'}
                    type="button"
                    className="absolute right-0 top-0"
                    onClick={() =>
                      setNewPasswordType(
                        newPasswordType === 'password' ? 'text' : 'password'
                      )
                    }
                  >
                    <Eye className="size-4 text-muted-foreground" />
                  </Button>
                </div>
                <span className="text-red-500 text-xs">
                  {errors?.newPassword?.[0]}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="confirmPassword"
                  className="capitalize text-muted-foreground"
                >
                  confirm password <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm new password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                  onKeyUp={resetError}
                />
                <span className="text-red-500 text-xs">
                  {errors?.confirmPassword?.[0]}
                </span>
              </div>
            </div>
            <div className="col-span-3 mt-2 flex justify-start items-center gap-4">
              <WbcSubmitBtn
                isLoading={isLoading}
                text="Change Password"
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
export default AppChangePassword;
