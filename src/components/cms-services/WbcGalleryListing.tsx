import { FairGalleryProps } from '@/types/contents';

const WbcGalleryListing = ({
  galleries,
}: {
  galleries: FairGalleryProps[] | null;
}) => {
  return (
    <div>
      {galleries?.length === 0 && (
        <div className="text-center text-2xl font-bold text-gray-500">
          No Gallery Found
        </div>
      )}
      {galleries?.map((gallery) => (
        <div className="">{gallery.title}</div>
      ))}
    </div>
  );
};
export default WbcGalleryListing;
