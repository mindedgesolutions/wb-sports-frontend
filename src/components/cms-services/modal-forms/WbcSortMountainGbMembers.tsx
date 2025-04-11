import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { srGbMembersProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { Move } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ReactSortable } from 'react-sortablejs';
import WbcSubmitBtn from '../WbcSubmitBtn';
import { useAppDispatch } from '@/hooks';
import { updateSrCounter } from '@/features/commonSlice';
import showSuccess from '@/utils/showSuccess';
import showError from '@/utils/showError';

const WbcSortMountainGbMembers = () => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<srGbMembersProps[]>([]);
  const dispatch = useAppDispatch();

  const openModal = () => setOpen(!open);

  // -----------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/mountain/general-body/all`);

      if (response.status === 200) {
        setData(response.data.members);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------------

  useEffect(() => {
    if (open) fetchData();
  }, [open]);

  // -----------------------------------

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await customFetch.put(
        `/mountain/general-body/set-order`,
        data
      );

      if (response.status === 200) {
        setOpen(false);
        dispatch(updateSrCounter());
        showSuccess(`Updated successfully`);
      }
    } catch (error) {
      console.log(error);
      showError(`Something went wrong`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={openModal}>
      <DialogTrigger asChild>
        <Button
          size={'sm'}
          className="cs-btn-primary"
          onClick={() => openModal}
        >
          Sort members
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-xl min-w-xl">
        <ScrollArea className="sm:max-w-xl max-h-[600px] pr-4 m-0">
          <DialogHeader>
            <DialogTitle>Sort members</DialogTitle>
            <DialogDescription>
              Click the Save button at the bottom
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-4">
              {data.length > 0 ? (
                <ReactSortable list={data} setList={setData}>
                  {data.map((member) => (
                    <div
                      key={member.id}
                      className="flex flex-row justify-between items-center p-2 border-b border-muted-foreground/20 active:bg-muted-foreground/10"
                    >
                      <div className="flex flex-col justify-start items-start gap-2">
                        <span className="text-sm text-muted-foreground font-medium tracking-wider">
                          {member.name}
                        </span>
                        <span className="text-xs text-muted-foreground font-light tracking-wider">
                          {member.description}
                        </span>
                      </div>
                      <Move className="cursor-grab active:cursor-grabbing font-normal text-muted-foreground size-4" />
                    </div>
                  ))}
                </ReactSortable>
              ) : (
                <div className="text-center text-muted-foreground">
                  No data available
                </div>
              )}
            </div>
            <div className="flex flex-row justify-end items-center mt-8">
              <WbcSubmitBtn
                isLoading={isLoading}
                text={`Save Changes`}
                customClass="cs-btn-primary"
              />
            </div>
          </form>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default WbcSortMountainGbMembers;
