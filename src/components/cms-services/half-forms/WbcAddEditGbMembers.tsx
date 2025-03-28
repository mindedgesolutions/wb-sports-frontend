import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import WbcSubmitBtn from '../WbcSubmitBtn';
import { useState } from 'react';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';

const WbcAddEditGbMembers = ({
  editId,
  setEditId,
}: {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    designation: '',
    name: '',
    desc: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );

  // ---------------------------------------

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------------

  const resetError = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ---------------------------------------

  const resetForm = () => {
    setForm({ ...form, designation: '', name: '', desc: '' });
    setErrors(null);
    setEditId(null);
  };

  // ---------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;

    if (!form.name) {
      errorBag = { ...errorBag, name: ['Name is required'] };
      errorCount++;
    }
    if (!form.desc) {
      errorBag = { ...errorBag, desc: ['Description is required'] };
      errorCount++;
    }
    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post(
        `/mountain/general-body/store`,
        data
      );

      if (response.status === 201) {
        showSuccess(`Member details added`);
        resetForm();
      }
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        return setErrors((error as any)?.response?.data?.errors);
      }
      return showError(`Something went wrong!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="border p-2">
      <div className="bg-muted-foreground/10 text-muted-foreground p-2 text-base font-medium tracking-wider">
        Add member details
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mt-6">
          <div className="flex flex-col justify-start items-start gap-2">
            <Label htmlFor="designation" className="text-muted-foreground">
              Designation
            </Label>
            <Input
              type="text"
              name="designation"
              id="designation"
              placeholder="Enter designation"
              value={form.designation}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.designation?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="name" className="text-muted-foreground">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name"
              value={form.name}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.name?.[0]}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="desc" className="text-muted-foreground">
              Description <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="desc"
              id="desc"
              placeholder="Enter description"
              value={form.desc}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.desc?.[0]}
            </span>
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
export default WbcAddEditGbMembers;
