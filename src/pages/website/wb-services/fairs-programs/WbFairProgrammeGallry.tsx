import {
  Link,
  LoaderFunctionArgs,
  useLoaderData,
  useParams,
} from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { WbGallerySingleBanner, WbPageWrapper } from '@/components';
import customFetch from '@/utils/customFetch';
import { GalleryImageProps } from '@/types/contents';
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
import { Separator } from '@/components/ui/separator';

const WbFairProgrammeGallry = () => {
  const {
    images,
    fairTitle,
    galleryTitle,
    galleryDesc,
  }: {
    images: GalleryImageProps[];
    fairTitle: string;
    galleryTitle: string;
    galleryDesc: string;
  } = useLoaderData();
  const { slug } = useParams();
  const [open, setOpen] = useState(false);
  const zoomRef = useRef<ZoomRef>(null);
  const captionsRef = useRef<CaptionsRef>(null);
  const thumbnailsRef = useRef<ThumbnailsRef>(null);
  const originals = [] as any[];

  images.map((img) => {
    const src = `${titles.baseUrl}${img.image_path}`;
    originals.push({ src: src });
  });

  return (
    <>
      <WbGallerySingleBanner
        title={`${galleryTitle}`}
        subTitle="Fairs & Programmes"
      />
      <WbPageWrapper>
        <div className="col-span-1 w-full md:col-span-12 p-3">
          <div className="">
            <h1 className="text-sky-foreground tracking-wider text-lg font-medium">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="text-sky-foreground/70 tracking-wider text-base md:text-lg font-medium hover:text-sky-foreground/50">
                    <Link to={`/${titles.serviceUrlWeb}/fairs-programmes`}>
                      Fairs & Programmes
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="text-sky-foreground/70 tracking-wider text-base md:text-lg font-medium hover:text-sky-foreground/50">
                    <Link
                      to={`/${titles.serviceUrlWeb}/fairs-programmes/${slug}`}
                    >
                      {fairTitle}
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="text-sky-foreground tracking-wider text-base md:text-lg font-medium">
                    {galleryTitle}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </h1>
          </div>
          <Separator className="my-4 bg-sky/20" />
          <div className="flex flex-col gap-8 justify-center items-center">
            <div className="text-lg md:text-2xl text-sky-foreground font-medium tracking-wider">
              {galleryTitle}
            </div>
            {galleryDesc && (
              <div
                dangerouslySetInnerHTML={{ __html: galleryDesc }}
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
              {images.map((image: GalleryImageProps) => (
                <div key={image.id} className="cursor-pointer">
                  <img
                    src={`${titles.baseUrl}${image.image_path}`}
                    alt={galleryTitle}
                    className="w-full h-36 md:h-52 rounded-xs overflow-hidden object-cover"
                    onClick={() => setOpen(true)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </WbPageWrapper>
    </>
  );
};
export default WbFairProgrammeGallry;

// ---------------------------------------

export const loader = async (params: LoaderFunctionArgs) => {
  const { slug, gallerySlug } = params.params;

  try {
    const response = await customFetch.get(
      `/services/fair-programmes/${slug}/${gallerySlug}`
    );
    const images = response.data.images;
    const fairTitle = response.data.fairTitle;
    const galleryTitle = response.data.galleryTitle;
    const galleryDesc = response.data.galleryDesc;

    return { images, fairTitle, galleryTitle, galleryDesc };
  } catch (error) {
    console.log(error);
    return error;
  }
};
