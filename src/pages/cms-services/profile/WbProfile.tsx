import {
  AppChangePassword,
  AppContentWrapper,
  AppMainWrapper,
  AppProfile,
  AppTitleWrapper,
} from '@/components';
import { titles } from '@/constants';
import { useAppSelector } from '@/hooks';
import { UserProps } from '@/types/user';

const WbProfile = () => {
  const { currentUser }: { currentUser: UserProps | null } = useAppSelector(
    (state) => state.currentUser
  );
  document.title = `${currentUser?.name}'s Profile | ${titles.services}`;

  return (
    <AppMainWrapper>
      <AppTitleWrapper>{currentUser?.name}'s Profile</AppTitleWrapper>
      <AppContentWrapper>
        <div className="flex flex-col justify-start items-start">
          <div className="w-full grid grid-cols-5 grid-flow-row gap-4">
            <AppProfile />
            <AppChangePassword />
          </div>
        </div>
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbProfile;
