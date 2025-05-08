import {
  AppScrollToTop,
  WbContentWrapper,
  WbGbMembersTable,
  WbPageSidebar,
  WbPageTopBanner,
  WbPageWrapper,
} from '@/components';
import { Separator } from '@/components/ui/separator';
import { titles } from '@/constants';
import { setWebGbMembers } from '@/features/mountainSlice';
import { RootState } from '@/store';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import { Store } from '@reduxjs/toolkit';

const WbMountaineering = () => {
  document.title = `Mountaineering | ${titles.services}`;

  return (
    <div>
      <AppScrollToTop />
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="Mountaineering" />
        <WbContentWrapper title="WB Mountaineering & Adventure Sports Foundation">
          <p className="text-sky-foreground font-medium tracking-wider">
            Welcome To West Bengal Mountaineering & Adventure Sports Foundation
          </p>
          <p>
            West Bengal Mountaineering and Adventure Sports Foundation was set
            up dissolving
          </p>
          <ol content="1" className="list-decimal ml-8 space-y-4 font-medium">
            <li>West Bengal Mountaineering and Adventure Foundation and</li>
            <li>
              West Bengal State Academy of Adventure Sports functioning under
              the Youth Services Department, Government of West Bengal in the
              year 2006.
            </li>
          </ol>
          <p>It is registered under the Society Registration Act.</p>
          <p>
            The Registered Office of the society is Standard Buildings, 32/1,
            B.B.B. Bag (South), Kolkata-700001.
          </p>
          <p>
            Field Office : Radhanath Sikdar Tenzing Norgay Bhavan, Vivekananda
            Yuba Bharati Krirangan, Saltlake, Kolkata.
          </p>
          <p>For more details, visit the website</p>
          <Separator className="bg-sky/20" />
          <p className="text-sky-foreground font-medium tracking-wider">
            Main Objects
          </p>
          <p>
            The aims and objectives of this Foundation is to help and encourage
            the Youth of this State in 'Adventure Sports', Expedition and
            Exploration of diverse nature and in fostering among them a spirit
            of camaraderie, good neighbourly relations, sacrifice for a noble
            cause, self discipline, self respect and respect for freedom and
            integrity of the nation. Further, the Foundation will support,
            promote and execute schemes for mountaineering, skiing,
            rock-climbing, altitude trekking, hang gliding, jungle safari,
            coastal trekking, river rafting, sea surfing including exploration
            under the seas, cycling, motor cycling, touring, aero sports etc.
            for the youth and give financial assistance to individual family
            members of mountaineers or explorers etc. involved in an accident.
          </p>
          <p className="text-sky-foreground font-medium tracking-wider">
            Others
          </p>
          <ol
            content="a"
            className="list-[upper-roman] ml-8 space-y-4 font-medium"
          >
            <li>
              Under the auspices of the Foundation there will be a Library,
              Reading Room, Lecture theatres, Indoor auditorium and a museum
              which will be established in due course. The Foundation may also
              establish fair priced Youth Hostels and Guest Houses for
              facilitating the activities of the Organisation.
            </li>
            <li>
              Regular lectures, seminars, slide/film shows, group discussions,
              training and screening will be conducted by the Foundation.
            </li>
            <li>
              The Foundation will undertake and will do such other acts and
              things as it may deem necessary from time to time.
            </li>
            <li>
              The Foundation may raise funds by way of grants from the State
              Govt. or from other donors including National and Foreign
              agencies/bodies. It may also receive gifts and give gifts or
              sanction funds for any work related to its objectives.
            </li>
          </ol>
          <Separator className="bg-sky/20" />
          <p className="text-sky-foreground font-medium tracking-wider">
            Name, Address & Description of the Members of the General Body
          </p>
          <WbGbMembersTable />
        </WbContentWrapper>
      </WbPageWrapper>
    </div>
  );
};
export default WbMountaineering;

// ---------------------------

export const loader = (store: Store<RootState>) => async () => {
  const { webGbMembers } = store.getState().mountains;
  try {
    if (!webGbMembers.length) {
      const response = await customFetch.get(`/services/gb-members`);
      const gbMembers = response.data.members;
      store.dispatch(setWebGbMembers(gbMembers));
    }
    return null;
  } catch (error) {
    console.log(error);
    showError(`Something went wrong`);
    return error;
  }
};
