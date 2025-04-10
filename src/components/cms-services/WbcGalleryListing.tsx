import { FairGalleryProps } from '@/types/contents';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import AppTooltip from '../AppTooltip';
import { images, titles } from '@/constants';
import { Check, Image, Pencil, Trash2 } from 'lucide-react';
import { Separator } from '../ui/separator';
import customFetch from '@/utils/customFetch';
import { useAppDispatch } from '@/hooks';
import { updateSrCounter } from '@/features/commonSlice';
import showSuccess from '@/utils/showSuccess';
import showError from '@/utils/showError';
import { Toggle } from '../ui/toggle';

const WbcGalleryListing = ({
  galleries,
  setIsLoading,
  handleEditRef,
}: {
  galleries: FairGalleryProps[] | null;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  handleEditRef: (id: number) => void;
}) => {
  const dispatch = useAppDispatch();

  // -------------------------------

  const deleteGallery = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await customFetch.delete(
        `/fair-programme/gallery/delete/${id}`
      );

      if (response.status === 200) {
        dispatch(updateSrCounter());
        showSuccess('Gallery deleted successfully!');
      }
    } catch (error) {
      console.log(error);
      showError('Failed to delete gallery!');
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------

  const showInGallery = async (id: number) => {
    setIsLoading(true);
    try {
      const response = await customFetch.put(
        `/fair-programme/gallery/show/${id}`
      );
      if (response.status === 200) {
        showSuccess('Done');
        dispatch(updateSrCounter());
      }
    } catch (error) {
      console.log(error);
      showError('Failed to add in photo gallery');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-start items-start flex-wrap gap-4 my-4">
      {galleries?.length === 0 && (
        <div className="text-center text-2xl font-bold text-gray-500">
          No Gallery Found
        </div>
      )}
      {galleries?.map((gallery) => (
        <Card
          key={gallery.id}
          className="w-[200px] p-2.5 rounded-sm gap-2 shadow-none"
        >
          <CardHeader className="p-0 m-0 mb-2 gap-0">
            <CardTitle className="text-sm font-normal">
              <AppTooltip content={gallery.title} />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 m-0">
            {gallery.images.length > 0 ? (
              <img
                src={`${titles.baseUrl}${gallery.images[0].image_path}`}
                alt={`${gallery.title}`}
                className="w-full h-[100px] object-cover rounded-xs"
              />
            ) : (
              <img
                src={images.noImg}
                alt={`${gallery.title}`}
                className="w-full h-[100px] object-cover rounded-xs"
              />
            )}
          </CardContent>
          <Separator />
          <CardFooter className="flex justify-between gap-4 p-0 m-0">
            <Toggle
              aria-label="Show in Photo Gallery"
              onClick={() => showInGallery(gallery.id)}
              title={`${
                gallery.show_in_gallery ? 'Hide from' : 'Show in'
              } Photo Gallery`}
              className={`${
                gallery.show_in_gallery ? 'bg-sky/20 hover:bg-sky/20' : null
              } p-0 m-0`}
            >
              {gallery.show_in_gallery ? (
                <Check className="text-sky" />
              ) : (
                <Image className="text-sky" />
              )}
            </Toggle>
            <Button
              variant={'ghost'}
              className="p-0 m-0"
              onClick={() => handleEditRef(gallery.id)}
            >
              <Pencil className="text-warning" />
            </Button>
            <Button
              variant={'ghost'}
              className="p-0 m-0"
              title="Delete gallery"
              onClick={() => deleteGallery(gallery.id)}
            >
              <Trash2 className="text-red-500" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default WbcGalleryListing;
