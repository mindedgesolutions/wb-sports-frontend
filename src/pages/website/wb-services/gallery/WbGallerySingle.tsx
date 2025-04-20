import { WbGallerySingleBanner, WbPageWrapper } from '@/components';
import { Separator } from '@/components/ui/separator';
import { FairGalleryProps, GalleryImageProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { Link, LoaderFunction, useLoaderData } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { titles } from '@/constants';
import Lightbox, {
  CaptionsRef,
  ThumbnailsRef,
  ZoomRef,
} from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Fullscreen from 'yet-another-react-lightbox/plugins/fullscreen';
import Counter from 'yet-another-react-lightbox/plugins/counter';
import 'yet-another-react-lightbox/plugins/counter.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import Captions from 'yet-another-react-lightbox/plugins/captions';
import 'yet-another-react-lightbox/plugins/captions.css';
import { useRef, useState } from 'react';

const WbGallerySingle = () => {
  const { gallery } = useLoaderData() as { gallery: FairGalleryProps };
  document.title = `${gallery.title} | ${
    import.meta.env.VITE_SERVICE_APP_NAME
  }`;
  const [open, setOpen] = useState(false);
  const zoomRef = useRef<ZoomRef>(null);
  const captionsRef = useRef<CaptionsRef>(null);
  const thumbnailsRef = useRef<ThumbnailsRef>(null);
  const originals = [] as any[];
  gallery.images.map((img) => {
    const src = `${titles.baseUrl}${img.image_path}`;
    originals.push({ src: src });
  });

  return (
    <div>
      <WbGallerySingleBanner title={gallery.title} />
      <WbPageWrapper>
        <div className="col-span-1 w-full md:col-span-12 p-3">
          <div className="">
            <h1 className="text-sky-foreground tracking-wider text-lg font-medium">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="text-sky-foreground/70 tracking-wider text-base md:text-lg font-medium hover:text-sky-foreground/50">
                    <Link to={`/${titles.serviceUrlWeb}/photo-gallery`}>
                      Photo Gallery
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="text-sky-foreground tracking-wider text-base md:text-lg font-medium">
                    {gallery.title}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </h1>
            <Separator className="my-4 bg-sky/20" />
            <div className="flex flex-col gap-8 justify-center items-center">
              <div className="text-lg md:text-2xl text-sky-foreground font-medium tracking-wider">
                {gallery.title}
              </div>
              {gallery.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: gallery.description }}
                  className="text-sm md:text-base tracking-wider leading-relaxed text-justify [text-align-last:center] mb-4"
                />
              )}
              <Lightbox
                plugins={[Captions, Fullscreen, Counter, Zoom, Thumbnails]}
                captions={{ ref: captionsRef }}
                counter={{ container: { style: { top: 'unset', bottom: 0 } } }}
                zoom={{ ref: zoomRef }}
                thumbnails={{ ref: thumbnailsRef }}
                on={{
                  click: () => {
                    (captionsRef.current?.visible
                      ? captionsRef.current?.hide
                      : captionsRef.current?.show)?.();
                    (thumbnailsRef.current!.visible
                      ? thumbnailsRef.current!.hide
                      : thumbnailsRef.current?.show)?.();
                  },
                }}
                open={open}
                close={() => setOpen(false)}
                slides={originals}
              />
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4">
                {gallery?.images.map((image: GalleryImageProps) => (
                  <div key={image.id} className="cursor-pointer">
                    <img
                      src={`${titles.baseUrl}${image.image_path}`}
                      alt={gallery.title}
                      className="w-full h-36 md:h-52 rounded-xs overflow-hidden object-cover"
                      onClick={() => setOpen(true)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </WbPageWrapper>
    </div>
  );
};
export default WbGallerySingle;

// ----------------------------------

export const loader: LoaderFunction = async ({ params }) => {
  const { slug } = params;
  try {
    const response = await customFetch.get(`/services/photo-galleries/${slug}`);
    return { gallery: response.data.gallery };
  } catch (error) {
    console.error('Error fetching data:', error);
    return error;
  }
};
