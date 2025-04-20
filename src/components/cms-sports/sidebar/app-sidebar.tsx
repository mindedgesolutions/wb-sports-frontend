import { NavMain } from '@/components/cms-sports/sidebar/nav-main';
import { NavUser } from '@/components/cms-sports/sidebar/nav-user';
import { TeamSwitcher } from '@/components/cms-sports/sidebar/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import adminMenus from '@/constants/spMenu';
import { useAppSelector } from '@/hooks';
import { CmsMenuProps } from '@/types/menu';

export function AppSidebar({ ...props }) {
  const { currentUserSp } = useAppSelector((state) => state.currentUser);
  const slug = currentUserSp?.user_details.slug;
  const menus = adminMenus() as CmsMenuProps[];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher slug={slug!} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={menus} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
