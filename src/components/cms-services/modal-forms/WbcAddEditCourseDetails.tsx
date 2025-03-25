import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DialogDescription } from '@radix-ui/react-dialog';
import { useState } from 'react';
import { compCourseTypes, compCourseDuration } from '@/constants';
import WbcBtn from '../WbcBtn';
import { cn } from '@/lib/utils';

const WbcAddEditCourseDetails = () => {
  const [errors, setErrors] = useState<{ [key: string]: string[] } | null>(
    null
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size={'sm'} className={cn('cs-btn-primary')}>
          Add course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add new course</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div className="mt-2 flex flex-col justify-start items-start gap-2">
          <Label htmlFor="courseType" className="text-muted-foreground">
            Course type <span className="text-red-500">*</span>
          </Label>
          <select
            className="flex h-10 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
            name="courseType"
            id="courseType"
          >
            <option value="">- Select -</option>
            {compCourseTypes.map((courseType) => (
              <option key={courseType.value} value={courseType.value}>
                {courseType.label}
              </option>
            ))}
          </select>
          <span className="text-red-500 text-xs">
            {errors?.courseType?.[0]}
          </span>
        </div>
        <div className="flex flex-col justify-start items-start gap-2">
          <Label htmlFor="courseName" className="text-muted-foreground">
            Name <span className="text-red-500">*</span>
          </Label>
          <Input
            name="courseName"
            id="courseName"
            placeholder="Enter course name"
          />
          <span className="text-red-500 text-xs">
            {errors?.courseName?.[0]}
          </span>
        </div>
        <div className="flex flex-col justify-start items-start">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="col-span-1 flex flex-col justify-start items-start gap-2">
              <Label htmlFor="duration" className="text-muted-foreground">
                Course duration <span className="text-red-500">*</span>
              </Label>
              <select
                className="flex h-9 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                name="duration"
                id="duration"
              >
                <option value="">- Select -</option>
                {compCourseDuration.map((duration) => (
                  <option key={duration.value} value={duration.value}>
                    {duration.label}
                  </option>
                ))}
              </select>
              <span className="text-red-500 text-xs">
                {errors?.duration?.[0]}
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
              />
              <span className="text-red-500 text-xs">
                {errors?.courseFee?.[0]}
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-start items-start gap-2">
          <Label htmlFor="eligibility" className="text-muted-foreground">
            Eligibility <span className="text-red-500">*</span>
          </Label>
          <Input
            name="eligibility"
            id="eligibility"
            placeholder="Enter course name"
          />
          <span className="text-red-500 text-xs">
            {errors?.eligibility?.[0]}
          </span>
        </div>

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
export default WbcAddEditCourseDetails;
