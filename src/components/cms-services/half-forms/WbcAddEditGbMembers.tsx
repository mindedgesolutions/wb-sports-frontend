import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import WbcSubmitBtn from '../WbcSubmitBtn';
import { useEffect } from 'react';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateSrCounter } from '@/features/commonSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { gbMembersSchema, GbMembersSchema } from '@/types/servicesSchema';
import { zodResolver } from '@hookform/resolvers/zod';

const WbcAddEditGbMembers = ({
  editId,
  setEditId,
}: {
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
    setError,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(gbMembersSchema),
  });
  const dispatch = useAppDispatch();
  const { gbMembers } = useAppSelector((state) => state.mountains);
  const editData = editId && gbMembers.find((item) => item.id === editId);

  // ---------------------------------------

  useEffect(() => {
    if (editData) {
      reset({
        ...editData,
        designation: editData.designation || '',
        name: editData.name,
        desc: editData.description,
      });
    }
  }, [editData]);

  // ---------------------------------------

  const resetForm = () => {
    reset({
      designation: editData ? editData.designation : '',
      name: editData ? editData.name : '',
      desc: editData ? editData.description : '',
    });
    setEditId(null);
  };

  // ---------------------------------------

  const onSubmit: SubmitHandler<GbMembersSchema> = async (data) => {
    const apiUrl = editId
      ? `/mountain/general-body/update/${editId}`
      : `/mountain/general-body/store`;
    const process = editId ? customFetch.put : customFetch.post;
    const msg = editId ? `Member details updated` : `Member details added`;
    try {
      const response = await process(apiUrl, data);
      if (response.status === 201 || response.status === 200) {
        showSuccess(msg);
        resetForm();
        dispatch(updateSrCounter());
      }
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        Object.entries((error as any)?.response?.data?.errors).forEach(
          ([field, message]) => {
            setError(field as keyof GbMembersSchema, {
              message: message as string,
            });
          }
        );
      }
      return showError(`Something went wrong!`);
    }
  };

  return (
    <div className="border p-2">
      <div className="bg-muted-foreground/10 text-muted-foreground p-2 text-base font-medium tracking-wider">
        {editId ? `Update details` : `Add member details`}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <div className="mt-6">
          <div className="flex flex-col justify-start items-start gap-2">
            <Label htmlFor="designation" className="text-muted-foreground">
              Designation
            </Label>
            <Input
              {...register('designation')}
              placeholder="Enter designation"
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors.designation?.message}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="name" className="text-muted-foreground">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input {...register('name')} placeholder="Enter name" />
            <span className="text-red-500 text-xs -mt-1">
              {errors.name?.message}
            </span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <Label htmlFor="desc" className="text-muted-foreground">
              Description <span className="text-red-500">*</span>
            </Label>
            <Input {...register('desc')} placeholder="Enter description" />
            <span className="text-red-500 text-xs -mt-1">
              {errors.desc?.message}
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
              isLoading={isSubmitting}
              text={editId ? `Update Details` : `Add Member`}
              customClass="cs-btn-primary"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
export default WbcAddEditGbMembers;
