import { CmsMenuProps } from '@/types/menu';
import { titles } from '.';
import { Gauge, Images, Users } from 'lucide-react';
import { useAppSelector } from '@/hooks';

function adminMenus() {
  const { currentUserSp } = useAppSelector((state) => state.currentUser);
  const slug = currentUserSp?.user_details.slug;

  const menus: CmsMenuProps[] = [
    {
      title: 'Dashboard',
      url: `/${titles.sportsUrl}/${slug}/dashboard`,
      icon: Gauge,
    },
    {
      title: 'Homepage Slider',
      url: `/${titles.sportsUrl}/${slug}/key-personnel`,
      icon: Images,
    },
    {
      title: 'Key Personnel',
      url: `/${titles.sportsUrl}/${slug}/key-personnel`,
      icon: Users,
    },
  ];

  return menus;
}
export default adminMenus;
