import { Label } from '@/components/ui/label';
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
import { BannerProps, NewsEventsProps } from '@/types/contents';
import { titles } from '@/constants';
import { Textarea } from '@/components/ui/textarea';
import { newsEvemtsSchema } from '@/types/servicesSchema';

const WbcAddEditNewsEvents = ({
  editId,
  setEditId,
}: {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    eventDate: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // ---------------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------------------------------------

  const resetError = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setErrors({ ...errors, [e.currentTarget.name]: '' });
  };

  // ---------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
    const validated = newsEvemtsSchema.safeParse(data);
    const fieldErrors: Record<string, string> = {};
    if (!validated.success) {
      validated.error.issues.map(
        (issue) => (fieldErrors[issue.path[0]] = issue.message)
      );
      setErrors(fieldErrors);
    }
  };

  return (
    <div className="border p-2">
      <div className="bg-muted-foreground/10 text-muted-foreground p-2 text-base font-medium tracking-wider">
        {editId ? 'Edit banner details' : 'Add new banner'}
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mt-6">
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="title" className="text-muted-foreground">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              name="title"
              id="title"
              placeholder="News / Event title"
              value={form.title}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">{errors?.title}</span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="description" className="text-muted-foreground">
              Description
            </Label>
            <Textarea
              name="description"
              id="description"
              placeholder="News / Event description"
              value={form.description}
              onChange={handleChange}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.description}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="eventDate" className="text-muted-foreground">
              Event date
            </Label>
            <Input
              type="date"
              name="eventDate"
              id="eventDate"
              value={form.eventDate}
              onChange={handleChange}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.eventDate}
            </span>
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
              // ref={fileInputRef}
              // onChange={handleImageChange}
            />
            <span className="text-red-500 text-xs -mt-1">
              {/* {!banner && errors?.banner?.[0]} */}
            </span>
            {/* <div className="w-full flex justify-start items-start gap-2">
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
            </div> */}
          </div>
          <Separator />
          <div className="my-4 flex flex-row justify-between items-center">
            <Button
              type="button"
              variant="outline"
              className="cs-btn-reset"
              // onClick={resetForm}
            >
              Reset
            </Button>
            <WbcSubmitBtn
              // isLoading={isLoading}
              text="Upload"
              customClass="cs-btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default WbcAddEditNewsEvents;
