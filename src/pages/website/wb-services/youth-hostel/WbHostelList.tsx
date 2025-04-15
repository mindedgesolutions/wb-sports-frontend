import {
  WbContentWrapper,
  WbPageSidebar,
  WbPageTopBanner,
  WbPageWrapper,
  WbYouthHostelCard,
} from '@/components';
import { titles } from '@/constants';
import { setHostels } from '@/features/hostelSlice';
import { useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import customFetch from '@/utils/customFetch';
import { Store } from '@reduxjs/toolkit';

const WbHostelList = () => {
  document.title = `List of Youth Hostels | ${titles.services}`;
  const { hostels } = useAppSelector((state) => state.hostels);

  return (
    <div>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="Youth Hostel" />
        <WbContentWrapper title="List of Youth Hostels">
          {hostels.length === 0 ? (
            <div className="flex items-start justify-start text-base text-sky">
              No Data Found
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {hostels.map((hostel) => (
                <WbYouthHostelCard key={hostel.id} hostel={hostel} />
              ))}
            </div>
          )}
        </WbContentWrapper>
      </WbPageWrapper>
    </div>
  );
};
export default WbHostelList;

// ----------------------------------

export const loader = (store: Store<RootState>) => async () => {
  const { hostels } = store.getState().hostels;

  try {
    if (!hostels.length) {
      const response = await customFetch.get('/services/youth-hostels');

      if (response.status === 200) {
        store.dispatch(setHostels(response.data.hostels));
      }
    }
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
