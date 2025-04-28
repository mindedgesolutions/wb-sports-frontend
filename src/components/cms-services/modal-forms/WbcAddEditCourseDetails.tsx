import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { compCourseTypes, compCourseDuration } from '@/constants';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import WbcSubmitBtn from '../WbcSubmitBtn';
import showError from '@/utils/showError';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { Pencil } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ComputerCourseProps } from '@/types/contents';
import { updateSrCounter } from '@/features/commonSlice';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  CourseDetailsSchema,
  courseDetailsSchema,
} from '@/types/servicesSchema';

const WbcAddEditCourseDetails = ({ editId }: { editId?: number }) => {
  const {
    register,
    setError,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm({
    mode: 'all',
    resolver: zodResolver(courseDetailsSchema),
  });

  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { courses } = useAppSelector((state) => state.compCourses);
  const editData: ComputerCourseProps | 0 | null | undefined =
    editId &&
    courses.find((course: ComputerCourseProps) => course.id === editId);

  // ----------------------------------------

  const openModal = () => {
    reset();
    setOpen(open === true ? false : true);
  };

  // ----------------------------------------

  useEffect(() => {
    if (editId && editData) {
      reset({
        ...editData,
        courseType: editData.course_type || '',
        courseName: editData.course_name || '',
        duration: editData.course_duration || '',
        courseFee: editData.course_fees || 0,
        eligibility: editData.course_eligibility || '',
      });
    }
  }, [editId, open]);

  // ----------------------------------------

  const resetForm = () => {
    reset({
      courseType: editData ? editData.course_type : '',
      courseName: editData ? editData.course_name : '',
      duration: editData ? editData.course_duration : '',
      courseFee: editData ? editData.course_fees : 0,
      eligibility: editData ? editData.course_eligibility : '',
    });
  };

  // ----------------------------------------

  const onSubmit: SubmitHandler<CourseDetailsSchema> = async (data) => {
    const apiUrl = editId
      ? `/com-training-courses/${editId}`
      : `/com-training-courses`;
    const process = editId ? customFetch.put : customFetch.post;
    const msg = editId
      ? 'Course details updated successfully!'
      : 'Course details added successfully!';
    try {
      const response = await process(apiUrl, data);

      if (response.status === 201) {
        showSuccess(msg);
        setOpen(false);
        dispatch(updateSrCounter());
      }
    } catch (error) {
      if ((error as any)?.response?.status === 422) {
        Object.entries((error as any)?.response?.data?.errors).forEach(
          ([field, message]) => {
            setError(field as keyof CourseDetailsSchema, {
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
          <Pencil className="h-3 md:h-4 text-yellow-500 duration-200 cursor-pointer" />
        ) : (
          <Button
            size={'sm'}
            className={cn('cs-btn-primary')}
            onClick={() => openModal}
          >
            Add course
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>
            {editId ? `Edit details` : `Add new course`}
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
            <Label htmlFor="courseType" className="text-muted-foreground">
              Course type <span className="text-red-500">*</span>
            </Label>
            <select {...register('courseType')} className="cs-select">
              <option value="">- Select -</option>
              {compCourseTypes.map((courseType) => (
                <option key={courseType.value} value={courseType.value}>
                  {courseType.label}
                </option>
              ))}
            </select>
            <span className="text-red-500 text-xs -mt-1">
              {errors.courseType?.message}
            </span>
          </div>
          <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
            <Label htmlFor="courseName" className="text-muted-foreground">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register('courseName')}
              placeholder="Enter course name"
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors.courseName?.message}
            </span>
          </div>
          <div className="mt-2.5 flex flex-col justify-start items-start">
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                <Label htmlFor="duration" className="text-muted-foreground">
                  Course duration <span className="text-red-500">*</span>
                </Label>
                <select className="cs-select" {...register('duration')}>
                  <option value="">- Select -</option>
                  {compCourseDuration.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
                <span className="text-red-500 text-xs -mt-1">
                  {errors.duration?.message}
                </span>
              </div>
              <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                <Label htmlFor="courseFee" className="text-muted-foreground">
                  Fees <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register('courseFee')}
                  placeholder="Enter course fee (number only)"
                />
                <span className="text-red-500 text-xs -mt-1">
                  {errors.courseFee?.message}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
            <Label htmlFor="eligibility" className="text-muted-foreground">
              Eligibility <span className="text-red-500">*</span>
            </Label>
            <Input
              {...register('eligibility')}
              placeholder="Enter course eligibility"
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors.eligibility?.message}
            </span>
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
      </DialogContent>
    </Dialog>
  );
};
export default WbcAddEditCourseDetails;
