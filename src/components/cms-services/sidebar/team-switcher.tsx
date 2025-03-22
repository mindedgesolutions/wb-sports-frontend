import {
  DropdownMenu,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { images, titles } from '@/constants';
import { NavLink } from 'react-router-dom';

export function TeamSwitcher({ slug = 'souvik-nag' }) {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <NavLink to={`/${titles.servicesUrl}/${slug}/dashboard`}>
              <SidebarMenuButton
                size="lg"
                className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              >
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground">
                  <img src={images.biswaBangla} alt="logo" className="h-8" />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-bold text-xl mb-1">
                    {titles.servicesShort}
                  </span>
                  <span className="truncate text-xs">
                    {titles.servicesShort}
                  </span>
                </div>
              </SidebarMenuButton>
            </NavLink>
          </DropdownMenuTrigger>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
