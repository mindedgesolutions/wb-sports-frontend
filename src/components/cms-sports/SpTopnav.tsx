import { useAppSelector } from '@/hooks';
import { ModeToggle } from '../mode-toggle';
import { SidebarTrigger } from '../ui/sidebar';
import SpProfileContainer from './SpProfileContainer';
import { UserProps } from '@/types/user';

const SpTopnav = () => {
  const { currentUserSp } = useAppSelector((state) => state.currentUser);
  const user = currentUserSp! as UserProps;

  return (
    <div className="shadow-lg bg-muted flex flex-row justify-between items-center relative">
      <SidebarTrigger />
      <section className="p-2 flex flex-row justify-end items-center gap-0 md:gap-2 pr-4 md:pr-8">
        <ModeToggle />
        <span className="hidden md:block text-sm text-muted-foreground font-medium">
          Welcome{' '}
          <span className="uppercase tracking-wider ml-1">
            {user?.name ?? `Guest`}
          </span>
        </span>
        <SpProfileContainer />
      </section>
    </div>
  );
};
export default SpTopnav;
