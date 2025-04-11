import {
  AppTooltip,
  WbGalleryContentWrapper,
  WbPageTopBanner,
  WbPageWrapper,
} from '@/components';
import { images, titles } from '@/constants';
import { setFairs } from '@/features/fairProgrammeSlice';
import { useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { FairGalleryOverviewProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import { Store } from '@reduxjs/toolkit';
import { Link } from 'react-router-dom';

const WbFairsProgrammesWeb = () => {
  document.title = `Fairs & Programmes | ${titles.services}`;
  const { fairs }: { fairs: FairGalleryOverviewProps[] } = useAppSelector(
    (state) => state.fairProgrammes
  );

  return (
    <>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbGalleryContentWrapper title="Fairs & Programmes">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-8">
            {fairs?.length === 0 ? (
              <div className="col-span-full text-center">No album found</div>
            ) : (
              fairs.map((fair: FairGalleryOverviewProps) => (
                <Link
                  key={fair.id}
                  to={`/${titles.serviceUrlWeb}/fairs-programmes/${fair.slug}`}
                >
                  <div className="col-span-1 border p-0 md:p-1 rounded-none flex flex-col gap-3 cursor-pointer hover:shadow-lg duration-300 group">
                    <div className="w-full h-52 bg-gray-200 rounded-none overflow-hidden mb-2">
                      <img
                        src={
                          fair.cover_image
                            ? `${titles.baseUrl}${fair.cover_image}`
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
        </WbGalleryContentWrapper>
      </WbPageWrapper>
    </>
  );
};
export default WbFairsProgrammesWeb;

// ---------------------------------------

export const loader = (store: Store<RootState>) => async () => {
  const { fairs } = store.getState().fairProgrammes;

  try {
    if (!fairs.length) {
      const response = await customFetch.get(`/services/fairs-programmes`);

      store.dispatch(setFairs(response.data.fairs));
    }
    return null;
  } catch (error) {
    console.log(error);
    showError(`Something went wrong`);
    return error;
  }
};
