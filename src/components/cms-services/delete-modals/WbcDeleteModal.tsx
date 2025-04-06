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
import { DeleteProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { Trash2 } from 'lucide-react';

const WbcDeleteModal = ({
  setIsLoading,
  apiUrl,
  title = 'Are you absolutely sure?',
  description,
  successMsg,
}: DeleteProps) => {
  const dispatch = useAppDispatch();

  const deletedata = async () => {
    setIsLoading(true);
    try {
      await customFetch.delete(apiUrl);
      dispatch(updateSrCounter());
      showSuccess(successMsg);
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
          <Trash2 className="h-4 text-red-500 duration-200 cursor-pointer" />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description} You can always come back and add the details again.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/90"
            onClick={deletedata}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default WbcDeleteModal;
