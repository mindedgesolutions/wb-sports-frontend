import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { DialogDescription } from '@radix-ui/react-dialog';
import { Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import WbcSubmitBtn from '../WbcSubmitBtn';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { compCentreCategory } from '@/constants';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import { updateSrCounter } from '@/features/commonSlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import showSuccess from '@/utils/showSuccess';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  computerCentreSchema,
  ComputerCentreSchema,
} from '@/types/servicesSchema';

const WbcAddEditCompCentre = ({ editId }: { editId?: number }) => {
  const [open, setOpen] = useState(false);
  const { districts } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const { compCentres } = useAppSelector((state) => state.compCourses);
  const editData = editId && compCentres?.find((item) => item.id === editId);

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    setError,
    handleSubmit,
  } = useForm<ComputerCentreSchema>({
    mode: 'all',
    resolver: zodResolver(computerCentreSchema),
  });

  // ------------------------------------

  useEffect(() => {
    editData &&
      reset({
        ...editData,
        district: editData.district_id.toString(),
        yctcName: editData.yctc_name,
        yctcCode: editData.yctc_code,
        centreCategory: editData.center_category,
        address1: editData.address_line_1!,
        address2: editData.address_line_2,
        address3: editData.address_line_3,
        inchargeName: editData.center_incharge_name,
        inchargeMobile: editData.center_incharge_mobile,
        inchargeEmail: editData.center_incharge_email ?? '',
        ownerName: editData.center_owner_name,
        ownerMobile: editData.center_owner_mobile,
      });
  }, [editId, open]);

  // ------------------------------------

  const openModal = () => {
    setOpen(!open);
  };

  // ------------------------------------

  const onSubmit: SubmitHandler<ComputerCentreSchema> = async (data) => {
    const apiUrl = editId ? `/comp-centres/${editId}` : `/comp-centres`;
    const method = editId ? customFetch.put : customFetch.post;
    const msg = editId ? `Updated` : `Added`;
    const successMsg = `Centre ${msg} successfully!`;

    try {
      const response = await method(apiUrl, data);

      if (response.status === 201 || response.status === 200) {
        reset();
        openModal();
        dispatch(updateSrCounter());
        showSuccess(successMsg);
      }
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        Object.entries((error as any)?.response?.data?.errors).forEach(
          ([field, message]) => {
            setError(field as keyof ComputerCentreSchema, {
              message: message as string,
            });
          }
        );
      }
      return showError(`Something went wrong!`);
    }
  };

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        {editId ? (
          <Pencil className="h-4 text-yellow-500 duration-200 cursor-pointer" />
        ) : (
          <Button
            size={'sm'}
            className={cn('cs-btn-primary')}
            onClick={() => openModal}
          >
            Add centre
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:min-w-xl">
        <ScrollArea className="sm:max-w-xl max-h-[600px] pr-4 m-0">
          <DialogHeader>
            <DialogTitle>
              {editId ? `Edit details` : `Add new centre`}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-full md:col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="district" className="text-muted-foreground">
                    District <span className="text-red-500">*</span>
                  </Label>
                  <select className="cs-select" {...register('district')}>
                    <option value="">- Select -</option>
                    {districts?.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.district?.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="yctcName" className="text-muted-foreground">
                YCTC name <span className="text-red-500">*</span>
              </Label>
              <Input {...register('yctcName')} placeholder="Enter YCTC name" />
              <span className="text-red-500 text-xs -mt-1">
                {errors.yctcName?.message}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-full md:col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="yctcCode" className="text-muted-foreground">
                    YCTC code
                  </Label>
                  <Input
                    {...register('yctcCode')}
                    placeholder="Enter YCTC code"
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.yctcCode?.message}
                  </span>
                </div>
                <div className="col-span-full md:col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="centreCategory"
                    className="text-muted-foreground"
                  >
                    Centre category
                  </Label>
                  <select className="cs-select" {...register('centreCategory')}>
                    <option value="">- Select -</option>
                    {compCentreCategory.map((category) => (
                      <option key={category.value} value={category.value}>
                        {category.label}
                      </option>
                    ))}
                  </select>
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.centreCategory?.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="address1" className="text-muted-foreground">
                Address line 1 <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register('address1')}
                placeholder="Enter address line 1 (mandatory)"
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors.address1?.message}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="address2" className="text-muted-foreground">
                Address line 2
              </Label>
              <Input
                {...register('address2')}
                placeholder="Enter address line 2 (if any)"
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors.address2?.message}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="address3" className="text-muted-foreground">
                Address line 3
              </Label>
              <Input
                {...register('address3')}
                placeholder="Enter address line 3 (if any)"
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors.address3?.message}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-full md:col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="city" className="text-muted-foreground">
                    City
                  </Label>
                  <Input {...register('city')} placeholder="Enter city" />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.city?.message}
                  </span>
                </div>
                <div className="col-span-full md:col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="pincode" className="text-muted-foreground">
                    PIN code
                  </Label>
                  <Input
                    {...register('pincode')}
                    placeholder="Enter PIN code"
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.pincode?.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-full md:col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="inchargeName"
                    className="text-muted-foreground"
                  >
                    Centre inchage name
                  </Label>
                  <Input
                    {...register('inchargeName')}
                    placeholder="Enter centre incharge name"
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.inchargeName?.message}
                  </span>
                </div>
                <div className="col-span-full md:col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="inchargeMobile"
                    className="text-muted-foreground"
                  >
                    Centre incharge contact no.
                  </Label>
                  <Input
                    {...register('inchargeMobile')}
                    placeholder="Enter centre incharge mobile no."
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.inchargeMobile?.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-full md:col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="inchargeEmail"
                    className="text-muted-foreground"
                  >
                    Centre inchage email ID
                  </Label>
                  <Input
                    {...register('inchargeEmail')}
                    placeholder="Enter centre incharge email ID"
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.inchargeEmail?.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-full md:col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="ownerName" className="text-muted-foreground">
                    Centre owner name
                  </Label>
                  <Input
                    {...register('ownerName')}
                    placeholder="Enter centre owner name"
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.ownerName?.message}
                  </span>
                </div>
                <div className="col-span-full md:col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="ownerMobile"
                    className="text-muted-foreground"
                  >
                    Centre owner contact no.
                  </Label>
                  <Input
                    {...register('ownerMobile')}
                    placeholder="Enter centre owner mobile no."
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.ownerMobile?.message}
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-row justify-between items-center">
              <Button
                variant={'outline'}
                type="button"
                className="cs-btn-reset"
                onClick={() => reset()}
              >
                Reset
              </Button>
              <WbcSubmitBtn
                isLoading={isSubmitting}
                text={editId ? `Update` : `Add Details`}
                customClass="cs-btn-primary"
              />
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default WbcAddEditCompCentre;
