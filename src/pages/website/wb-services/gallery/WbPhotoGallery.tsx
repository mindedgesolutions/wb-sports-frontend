import {
  AppTooltip,
  WbGalleryContentWrapper,
  WbPageTopBanner,
  WbPageWrapper,
} from '@/components';
import { titles } from '@/constants';
import { FairGalleryProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';

const WbPhotoGallery = () => {
  document.title = `Photo Gallery | ${import.meta.env.VITE_SERVICE_APP_NAME}`;
  const { galleries } = useLoaderData() as { galleries: FairGalleryProps[] };

  return (
    <div>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbGalleryContentWrapper title="Photo Gallery">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-4">
            {galleries?.length === 0 ? (
              <div className="col-span-full text-center">No album found</div>
            ) : (
              galleries.map((gallery: FairGalleryProps) => (
                <Link
                  key={gallery.id}
                  to={`/${titles.serviceUrlWeb}/photo-gallery/${gallery.slug}`}
                >
                  <div className="col-span-1 border p-0 md:p-1 rounded-none flex flex-col gap-2 md:gap-3 cursor-pointer hover:shadow-lg duration-300 group">
                    <div className="w-full h-32 md:h-52 bg-gray-200 rounded-none overflow-hidden mb-2">
                      <img
                        src={`${titles.baseUrl}${gallery.cover?.image_path}`}
                        alt={gallery.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xs uppercase text-center tracking-wider text-muted-foreground group-hover:text-primary pb-2">
                      <AppTooltip content={gallery.title} />
                    </h3>
                  </div>
                </Link>
              ))
            )}
          </div>
        </WbGalleryContentWrapper>
      </WbPageWrapper>
    </div>
  );
};
export default WbPhotoGallery;

// ----------------------------------

export const loader: LoaderFunction = async () => {
  try {
    const response = await customFetch.get(`/services/photo-galleries`);
    return { galleries: response.data.galleries };
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};
