import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { updateSrCounter } from '@/features/commonSlice';
import { useAppDispatch } from '@/hooks';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { Trash2 } from 'lucide-react';
import { SetStateAction } from 'react';

const WbcDeleteSyllabus = ({
  id,
  setIsLoading,
}: {
  id: number;
  setIsLoading: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const dispatch = useAppDispatch();

  const deleteCourse = async () => {
    setIsLoading(true);
    try {
      await customFetch.delete(`/comp-syllabus/${id}`);
      dispatch(updateSrCounter());
      showSuccess('Syllabus deleted successfully');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button type="button">
          <Trash2 className="h-4 group-hover:text-red-500 duration-200 cursor-pointer" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            The syllabus (with attachment) will be permanently deleted. You can
            always come back and add the details again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            onClick={deleteCourse}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default WbcDeleteSyllabus;
