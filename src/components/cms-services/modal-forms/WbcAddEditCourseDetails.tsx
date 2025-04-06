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

type WbcAddEditCourseDetailsProps = {
  courseType: string;
  courseName: string;
  duration: string;
  courseFee: number;
  eligibility: string;
};

const WbcAddEditCourseDetails = ({ editId }: { editId?: number }) => {
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<WbcAddEditCourseDetailsProps>({
    courseType: '',
    courseName: '',
    duration: '',
    courseFee: 0,
    eligibility: '',
  });
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const { courses } = useAppSelector((state) => state.compCourses);
  const data: ComputerCourseProps | 0 | null | undefined =
    editId &&
    courses.find((course: ComputerCourseProps) => course.id === editId);

  // ----------------------------------------

  useEffect(() => {
    if (editId && data) {
      setForm({
        courseType: (data as ComputerCourseProps).course_type || '',
        courseName: (data as ComputerCourseProps).course_name || '',
        duration: (data as ComputerCourseProps).course_duration || '',
        courseFee: (data as ComputerCourseProps).course_fees || 0,
        eligibility: (data as ComputerCourseProps).course_eligibility || '',
      });
    }
  }, [editId, open]);

  // ----------------------------------------

  const openModal = () => {
    setErrors(null);
    setOpen(open === true ? false : true);
  };

  // ----------------------------------------

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });

    if (e.target.name === 'courseFee' && e.target.value) {
      const numberValue = e.target.value.replace(/[^0-9]/g, '');
      setForm({ ...form, courseFee: Number(numberValue) });
    }
  };

  // ----------------------------------------

  const resetError = (e: React.KeyboardEvent<HTMLInputElement>) => {
    setErrors({ ...errors, [e.currentTarget.name]: [] });
  };

  // ----------------------------------------

  const resetForm = () => {
    setErrors(null);
    setForm({
      ...form,
      courseType: '',
      courseName: '',
      duration: '',
      courseFee: 0,
      eligibility: '',
    });
  };

  // ----------------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let errorBag = {};
    let errorCount = 0;

    if (!form.courseType) {
      errorBag = { ...errorBag, courseType: ['Course type is required'] };
      errorCount++;
    }
    if (!form.courseName.trim()) {
      errorBag = { ...errorBag, courseName: ['Course name is required'] };
      errorCount++;
    }
    if (!form.duration) {
      errorBag = { ...errorBag, duration: ['Course duration is required'] };
      errorCount++;
    }
    if (!form.courseFee) {
      errorBag = { ...errorBag, courseFee: ['Course fee is required'] };
      errorCount++;
    }
    if (!form.eligibility.trim()) {
      errorBag = { ...errorBag, eligibility: ['Eligibility is required'] };
      errorCount;
    }
    if (errorCount > 0) {
      setErrors(errorBag);
      return;
    }

    setIsLoading(true);
    setOpen(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);
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
        resetForm();
        showSuccess(msg);
        setOpen(false);
        dispatch(updateSrCounter());
      }
    } catch (error) {
      if ((error as any).status === 400) {
        return setErrors((error as any)?.response?.data?.errors);
      }
      showError((error as any)?.response?.data?.errors?.[0]);
      setOpen(true);
    } finally {
      setIsLoading(false);
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
        <form onSubmit={handleSubmit}>
          <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
            <Label htmlFor="courseType" className="text-muted-foreground">
              Course type <span className="text-red-500">*</span>
            </Label>
            <select
              className="flex h-10 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              name="courseType"
              id="courseType"
              value={form.courseType}
              onChange={handleChange}
            >
              <option value="">- Select -</option>
              {compCourseTypes.map((courseType) => (
                <option key={courseType.value} value={courseType.value}>
                  {courseType.label}
                </option>
              ))}
            </select>
            <span className="text-red-500 text-xs -mt-1">
              {!form.courseType && errors?.courseType?.[0]}
            </span>
          </div>
          <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
            <Label htmlFor="courseName" className="text-muted-foreground">
              Name <span className="text-red-500">*</span>
            </Label>
            <Input
              name="courseName"
              id="courseName"
              placeholder="Enter course name"
              value={form.courseName}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.courseName?.[0]}
            </span>
          </div>
          <div className="mt-2.5 flex flex-col justify-start items-start">
            <div className="w-full grid grid-cols-2 gap-4">
              <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                <Label htmlFor="duration" className="text-muted-foreground">
                  Course duration <span className="text-red-500">*</span>
                </Label>
                <select
                  className="flex h-9 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                  name="duration"
                  id="duration"
                  value={form.duration}
                  onChange={handleChange}
                >
                  <option value="">- Select -</option>
                  {compCourseDuration.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
                <span className="text-red-500 text-xs -mt-1">
                  {!form.duration && errors?.duration?.[0]}
                </span>
              </div>
              <div className="col-span-1 flex flex-col justify-start items-start gap-2">
                <Label htmlFor="courseFee" className="text-muted-foreground">
                  Fees <span className="text-red-500">*</span>
                </Label>
                <Input
                  name="courseFee"
                  id="courseFee"
                  placeholder="Enter course fee (number only)"
                  value={form.courseFee}
                  onChange={handleChange}
                  onKeyUp={resetError}
                />
                <span className="text-red-500 text-xs -mt-1">
                  {errors?.courseFee?.[0]}
                </span>
              </div>
            </div>
          </div>
          <div className="mt-2.5 flex flex-col justify-start items-start gap-2">
            <Label htmlFor="eligibility" className="text-muted-foreground">
              Eligibility <span className="text-red-500">*</span>
            </Label>
            <Input
              name="eligibility"
              id="eligibility"
              placeholder="Enter course eligibility"
              value={form.eligibility}
              onChange={handleChange}
              onKeyUp={resetError}
            />
            <span className="text-red-500 text-xs -mt-1">
              {errors?.eligibility?.[0]}
            </span>
          </div>
          <Separator className="my-4" />
          <div className="flex flex-row justify-between items-center">
            <Button
              variant={'outline'}
              type="button"
              className="cs-btn-reset"
              onClick={resetForm}
            >
              Reset
            </Button>
            <WbcSubmitBtn
              isLoading={isLoading}
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
