import { Lock, LogOut, User } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import { images, titles } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { UserProps } from '@/types/user';
import customFetch from '@/utils/customFetch';
import showSuccess from '@/utils/showSuccess';
import { unsetCurrentUser } from '@/features/currentUserSlice';

const WbcProfileContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser } = useAppSelector((store) => store.currentUser);
  const user = currentUser! as UserProps;

  const logout = async () => {
    try {
      await customFetch.post(`/auth/logout`);

      showSuccess('Logged out successfully');
      localStorage.removeItem(titles.serviceToken);
      dispatch(unsetCurrentUser());
      navigate(`/${titles.servicesUrl}/sign-in`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="ml-0 -mt-3 hidden md:block">
        <Button type="button" variant="ghost" className="focus:outline-none">
          <img
            src={
              currentUser?.user_details.profile_img
                ? `${titles.baseUrl}${currentUser?.user_details.profile_img}`
                : images.profileImg
            }
            alt="user"
            className="w-8 h-8 rounded-full"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="mt-1 w-48">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link
            to={`/${titles.servicesUrl}/${user?.user_details?.slug}/settings`}
          >
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
          </Link>
          <Link
            to={`/${titles.servicesUrl}/${user?.user_details?.slug}/change-password`}
          >
            <DropdownMenuItem className="cursor-pointer">
              <Lock className="mr-2 h-4 w-4" />
              <span>Change password</span>
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default WbcProfileContainer;
