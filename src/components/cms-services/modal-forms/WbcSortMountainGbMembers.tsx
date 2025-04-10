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
import { useEffect, useState } from 'react';

const WbcSortMountainGbMembers = () => {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState<srGbMembersProps[]>([]);

  const openModal = () => setOpen(!open);

  // -----------------------------------

  const fetchData = async () => {
    try {
      const response = await customFetch.get(`/mountain/general-body/all`);

      if (response.status === 200) {
        setData(response.data.members);
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(data);

  // -----------------------------------

  useEffect(() => {
    if (open) fetchData();
  }, [open]);

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
      <DialogContent>
        <ScrollArea className="sm:max-w-xl max-h-[600px] pr-4 m-0">
          <DialogHeader>
            <DialogTitle>Sort members</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          AAA
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
export default WbcSortMountainGbMembers;
