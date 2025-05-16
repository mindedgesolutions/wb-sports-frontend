import { NavMain } from '@/components/website/wb-services/mobile-menu/nav-main';
import { TeamSwitcher } from '@/components/website/wb-services/mobile-menu/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';
import { useAppSelector } from '@/hooks';
import { WebsiteMenuProps } from '@/types/menu';
import serviceWebsiteMenus from '@/constants/wbMenu';

export function AppSidebar({ ...props }) {
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const slug = currentUser?.user_details.slug;
  const wbMenus = serviceWebsiteMenus() as WebsiteMenuProps[];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-sky-300">
        <TeamSwitcher slug={slug} />
      </SidebarHeader>
      <SidebarContent className="bg-sky-100">
        <NavMain items={wbMenus} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
