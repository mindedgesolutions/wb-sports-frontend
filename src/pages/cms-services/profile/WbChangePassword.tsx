import {
  AppChangePassword,
  AppContentWrapper,
  AppMainWrapper,
  AppTitleWrapper,
} from '@/components';
import { titles } from '@/constants';
import { useAppSelector } from '@/hooks';
import { UserProps } from '@/types/user';

const WbChangePassword = () => {
  const { currentUser }: { currentUser: UserProps | null } = useAppSelector(
    (state) => state.currentUser
  );
  document.title = `Change Password : ${currentUser?.name} | ${titles.services}`;

  return (
    <AppMainWrapper>
      <AppTitleWrapper>Change Password : {currentUser?.name}</AppTitleWrapper>
      <AppContentWrapper>
        <div className="flex flex-col justify-start items-start">
          <div className="w-full grid grid-cols-5 grid-flow-row gap-4">
            <AppChangePassword />
          </div>
        </div>
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbChangePassword;
