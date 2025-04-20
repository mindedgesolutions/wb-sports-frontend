import { CmsMenuProps } from '@/types/menu';
import { titles } from '.';
import {
  Award,
  Download,
  Gauge,
  Images,
  ImagesIcon,
  NotebookPen,
  Users,
} from 'lucide-react';
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
      url: `/${titles.sportsUrl}/${slug}/homepage-slider`,
      icon: Images,
    },
    {
      title: 'Key Personnel',
      url: `/${titles.sportsUrl}/${slug}/key-personnel`,
      icon: Users,
    },
    {
      title: 'Sports Personnel',
      url: `/${titles.sportsUrl}/${slug}/sports-personnel`,
      icon: Award,
    },
    {
      title: 'Gallery',
      url: '#',
      icon: ImagesIcon,
      children: [
        {
          title: 'Photo Gallery',
          url: `/${titles.sportsUrl}/${slug}/gallery/photo-gallery`,
        },
        {
          title: 'Video Gallery',
          url: `/${titles.sportsUrl}/${slug}/gallery/video-gallery`,
        },
      ],
    },
    {
      title: 'Downloadable Content',
      url: `/${titles.sportsUrl}/${slug}/downloadables`,
      icon: Download,
    },
    {
      title: 'Organisation',
      url: `/${titles.sportsUrl}/${slug}/organisation`,
      icon: NotebookPen,
    },
  ];

  return menus;
}
export default adminMenus;
