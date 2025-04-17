import { WbcBannerPopover, WbcSubmitBtn } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { updateSpCounter } from '@/features/commonSlice';
import { useAppDispatch } from '@/hooks';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { X } from 'lucide-react';
import { useRef, useState } from 'react';

const SpAddEditSlider = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [slider, setSlider] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useAppDispatch();

  // ------------------------------

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrors({
        ...errors,
        slider: ['Invalid file type. Allowed: jpeg, png, jpg, webp'],
      });
      setSlider(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    if (file.size > 200 * 1024) {
      setErrors({ ...errors, slider: ['File size must be less than 200 KB'] });
      setSlider(null);
      if (fileInputRef.current) fileInputRef.current.value = '';
      return;
    }
    setSlider(file);
  };

  // ------------------------------

  const clearImage = () => {
    setSlider(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ------------------------------

  const resetForm = () => {
    setSlider(null);
    setErrors(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!slider)
      return setErrors({ ...errors, slider: ['Slider image is required'] });

    const data = new FormData();
    data.append('slider', slider);
    setIsLoading(true);
    try {
      const response = await customFetch.post(
        `/sports/homepage-sliders`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        showSuccess(`Slider image uploaded`);
        resetForm();
        dispatch(updateSpCounter());
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
        Upload homepage slider image
      </div>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="mt-6">
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <div className="flex flex-row gap-2">
              <Label className="text-muted-foreground">
                Select an image <span className="text-red-500">*</span>
              </Label>
              <WbcBannerPopover />
            </div>
            <Input
              type="file"
              name="slider"
              id="slider"
              ref={fileInputRef}
              onChange={handleImageChange}
            />
            <span className="text-red-500 text-xs -mt-1">
              {!slider && errors?.slider?.[0]}
            </span>
            <div className="w-full flex justify-start items-start gap-2">
              <div className="w-full h-28 border border-dashed flex justify-center items-center">
                {slider ? (
                  <img
                    src={URL.createObjectURL(slider)}
                    alt="slider"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <p className="text-sm font-extralight tracking-widest">
                    preview slider
                  </p>
                )}
              </div>
              {slider && (
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
              customClass="cs-btn-success"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default SpAddEditSlider;
