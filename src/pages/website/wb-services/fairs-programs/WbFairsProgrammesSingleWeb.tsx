import { AppTooltip, WbGallerySingleBanner, WbPageWrapper } from '@/components';
import { images, titles } from '@/constants';
import { FairGalleryProps, FairProgrammeProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { Link, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';

const WbFairsProgrammesSingleWeb = () => {
  const { data }: { data: FairProgrammeProps } = useLoaderData();
  document.title = `${data.title} | Fairs & Programmes | ${titles.services}`;

  return (
    <>
      <WbGallerySingleBanner
        title={`${data.title}`}
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
                  <BreadcrumbItem className="text-sky-foreground tracking-wider text-base md:text-lg font-medium">
                    {data.title}
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </h1>
            <Separator className="my-4 bg-sky/20" />
            <div className="flex flex-col gap-8 justify-center items-center">
              <div className="text-lg md:text-2xl text-sky-foreground font-medium tracking-wider">
                {data.title}
              </div>
              {data.description && (
                <div
                  dangerouslySetInnerHTML={{ __html: data.description }}
                  className="text-sm md:text-base tracking-wider leading-relaxed text-justify mb-4"
                />
              )}
            </div>
            <Separator className="mb-4 -mt-16 bg-sky/20" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-x-4">
              {data.gallery?.length === 0 ? (
                <div className="col-span-full text-center">No album found</div>
              ) : (
                data.gallery?.map((fair: FairGalleryProps) => (
                  <Link
                    key={fair.id}
                    to={`/${titles.serviceUrlWeb}/fairs-programmes/${data.slug}/${fair.slug}`}
                  >
                    <div className="col-span-1 border p-0 md:p-1 rounded-none flex flex-col gap-3 cursor-pointer hover:shadow-lg duration-300 group">
                      <div className="w-full h-32 md:h-52 bg-gray-200 rounded-none overflow-hidden mb-2">
                        <img
                          src={
                            fair.images
                              ? `${titles.baseUrl}${
                                  fair.images.at(0)?.image_path
                                }`
                              : images.fairDefault
                          }
                          alt={fair.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-xs uppercase text-center tracking-wider text-muted-foreground group-hover:text-primary pb-2">
                        <AppTooltip content={fair.title} />
                      </h3>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </div>
        </div>
      </WbPageWrapper>
    </>
  );
};
export default WbFairsProgrammesSingleWeb;

// ------------------------------------

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { slug } = params;

  try {
    const response = await customFetch.get(`/services/fair-programmes/${slug}`);
    const data = response.data.data;
    return { data };
  } catch (error) {
    console.log(error);
    return error;
  }
};
