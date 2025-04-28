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
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import { updateSrCounter } from '@/features/commonSlice';
import { ScrollArea } from '@/components/ui/scroll-area';
import showSuccess from '@/utils/showSuccess';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  DistrictBlockOfficeSchema,
  districtBlockOfficeSchema,
} from '@/types/servicesSchema';

const WbcAddEditDistrictBlockOffice = ({ editId }: { editId?: number }) => {
  const [open, setOpen] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    setError,
    handleSubmit,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(districtBlockOfficeSchema),
  });

  const { districts } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const { offices } = useAppSelector((state) => state.districtBlockOffices);
  const editData = editId && offices?.find((item) => item.id === editId);

  // ------------------------------------

  const openModal = () => {
    reset();
    setOpen(!open);
  };

  // ------------------------------------

  useEffect(() => {
    editData &&
      reset({
        ...editData,
        district: editData.district_id.toString(),
        name: editData.name,
        address: editData.address || '',
        landline: editData.landline_no || '',
        email: editData.email || '',
        mobile_1: editData.mobile_1 || '',
        mobile_2: editData.mobile_2 || '',
        officerName: editData.officer_name || '',
        officerDesignation: editData.officer_designation || '',
        officerMobile: editData.officer_mobile || '',
      });
  }, [editId, open]);

  // ------------------------------------

  const resetForm = () => {
    reset({
      district: editData ? editData.district_id.toString() : '',
      name: editData ? editData.name : '',
      address: editData ? editData.address! : '',
      landline: editData ? editData.landline_no : '',
      email: editData ? editData.email : '',
      mobile_1: editData ? editData.mobile_1 : '',
      mobile_2: editData ? editData.mobile_2 : '',
      officerName: editData ? editData.officer_name : '',
      officerDesignation: editData ? editData.officer_designation! : '',
      officerMobile: editData ? editData.officer_mobile : '',
    });
  };

  // ------------------------------------

  const onSubmit: SubmitHandler<DistrictBlockOfficeSchema> = async (data) => {
    const url = editId
      ? `/district-block-offices/${editId}`
      : `/district-block-offices`;
    const process = editId ? customFetch.put : customFetch.post;
    const msg = editId
      ? `District / Block office updated successfully`
      : `District / Block office added successfully`;
    try {
      const response = await process(url, data);
      if (response.status === 200 || response.status === 201) {
        reset();
        setOpen(false);
        dispatch(updateSrCounter());
        showSuccess(msg);
      }
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        Object.entries((error as any)?.response?.data?.errors).forEach(
          ([field, message]) => {
            setError(field as keyof DistrictBlockOfficeSchema, {
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
              {editId ? `Edit details` : `Add new district / block office`}
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
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
              <Label htmlFor="name" className="text-muted-foreground">
                Office name <span className="text-red-500">*</span>
              </Label>
              <Input {...register('name')} placeholder="Enter office name" />
              <span className="text-red-500 text-xs -mt-1">
                {errors.name?.message}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="address" className="text-muted-foreground">
                Address <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register('address')}
                placeholder="Enter office address"
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors.address?.message}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="landline" className="text-muted-foreground">
                    Landline no.
                  </Label>
                  <Input
                    {...register('landline')}
                    placeholder="Enter landline no."
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.landline?.message}
                  </span>
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="email" className="text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    {...register('email')}
                    placeholder="Enter office email"
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.email?.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="mobile_1" className="text-muted-foreground">
                    Office mobile no. 1
                  </Label>
                  <Input
                    {...register('mobile_1')}
                    placeholder="Enter office mobile no. 1 (if any)"
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.mobile_1?.message}
                  </span>
                </div>
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label htmlFor="mobile_2" className="text-muted-foreground">
                    Office mobile no. 2
                  </Label>
                  <Input
                    {...register('mobile_2')}
                    placeholder="Enter office mobile no. 2 (if any)"
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.mobile_2?.message}
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="officerName" className="text-muted-foreground">
                Officer's name
              </Label>
              <Input
                {...register('officerName')}
                placeholder="Enter officer's name"
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors.officerName?.message}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
              <Label
                htmlFor="officerDesignation"
                className="text-muted-foreground"
              >
                Officer's designation <span className="text-red-500">*</span>
              </Label>
              <Input
                {...register('officerDesignation')}
                placeholder="Enter office's designation"
              />
              <span className="text-red-500 text-xs -mt-1">
                {errors.officerDesignation?.message}
              </span>
            </div>
            <div className="mt-2.5 flex flex-col justify-start items-start">
              <div className="w-full grid grid-cols-2 gap-4">
                <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                  <Label
                    htmlFor="officerMobile"
                    className="text-muted-foreground"
                  >
                    Officer's mobile no.
                  </Label>
                  <Input
                    {...register('officerMobile')}
                    placeholder="Enter office's designation"
                  />
                  <span className="text-red-500 text-xs -mt-1">
                    {errors.officerMobile?.message}
                  </span>
                </div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="flex flex-row justify-between items-center pr-2">
              <Button
                type="button"
                variant="outline"
                className="cs-btn-reset"
                onClick={resetForm}
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
export default WbcAddEditDistrictBlockOffice;
