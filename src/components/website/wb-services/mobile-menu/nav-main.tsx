import { ChevronRight } from 'lucide-react';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { NavLink, useLocation } from 'react-router-dom';
import { WebsiteMenuProps } from '@/types/menu';

export function NavMain({ items }: { items: WebsiteMenuProps[] }) {
  const { pathname } = useLocation();
  const { openMobile, setOpenMobile } = useSidebar();

  let show = false;

  Array.from(items).forEach((item) => {
    if (item.subMenus) {
      item.subMenus.forEach((subItem) => {
        if (pathname === subItem.link) {
          show = true;
        }
      });
    }
  });

  return (
    <SidebarGroup className="mt-8">
      <SidebarMenu>
        {Array.from(items).map((item) => (
          <Collapsible
            key={item.name}
            asChild
            defaultOpen={show}
            className="group/collapsible"
          >
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <NavLink to={item.link!}>
                  <SidebarMenuButton
                    tooltip={item.name}
                    isActive={pathname === item.link}
                    onClick={() => !item.subMenus && setOpenMobile(!openMobile)}
                  >
                    {item.icon && <item.icon />}
                    <span>{item.name}</span>
                    {item.subMenus && (
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    )}
                    {/* Show only when item has sub-items */}
                  </SidebarMenuButton>
                </NavLink>
              </CollapsibleTrigger>
              {/* Collapsible content when item has sub-items */}
              {item.subMenus && (
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {item.subMenus?.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.name}>
                        <SidebarMenuSubButton
                          asChild
                          isActive={pathname === subItem.link}
                          onClick={() => setOpenMobile(!openMobile)}
                        >
                          <NavLink to={subItem.link}>
                            <span>{subItem.name}</span>
                          </NavLink>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              )}
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
