import { NavMain } from '@/components/cms-services/sidebar/nav-main';
import { NavUser } from '@/components/cms-services/sidebar/nav-user';
import { TeamSwitcher } from '@/components/cms-services/sidebar/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { adminMenus } from '@/constants/srMenu';
import { CmsMenuProps } from '@/types/menu';

export function AppSidebar({ ...props }) {
  const slug = 'souvik-nag';
  const menus = adminMenus as CmsMenuProps[];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher slug={slug} />
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
