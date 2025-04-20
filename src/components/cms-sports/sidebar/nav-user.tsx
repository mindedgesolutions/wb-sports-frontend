import { ChevronsUpDown, Lock, LogOut, User } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { images, titles } from '@/constants';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { unsetCurrentUserSp } from '@/features/currentUserSlice';

export function NavUser() {
  const { currentUserSp } = useAppSelector((state) => state.currentUser);
  const { isMobile } = useSidebar();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const logout = async () => {
    try {
      await customFetch.post(`/auth/logout`);

      showSuccess('Logged out successfully');
      localStorage.removeItem(titles.sportsToken);
      dispatch(unsetCurrentUserSp());
      navigate(`/${titles.sportsUrl}/sign-in`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage
                  src={
                    currentUserSp?.user_details.profile_img
                      ? `${titles.baseUrl}${currentUserSp?.user_details.profile_img}`
                      : images.profileImg
                  }
                  alt={currentUserSp?.name}
                />
                <AvatarFallback className="rounded-lg">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentUserSp?.name}
                </span>
                <span className="truncate text-xs">{currentUserSp?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={
                      currentUserSp?.user_details.profile_img
                        ? `${titles.baseUrl}${currentUserSp?.user_details.profile_img}`
                        : images.profileImg
                    }
                    alt={currentUserSp?.name}
                  />
                  <AvatarFallback className="rounded-lg">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">
                    {currentUserSp?.name}
                  </span>
                  <span className="truncate text-xs">
                    {currentUserSp?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link
                to={`/${titles.sportsUrl}/${currentUserSp?.user_details?.slug}/settings`}
              >
                <DropdownMenuItem>
                  <User />
                  Profile
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link
                to={`/${titles.sportsUrl}/${currentUserSp?.user_details?.slug}/change-password`}
              >
                <DropdownMenuItem>
                  <Lock />
                  Change Password
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={logout}>
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
