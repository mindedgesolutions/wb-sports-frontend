import {
  Building,
  Fan,
  Gauge,
  Images,
  LaptopMinimal,
  MapPin,
  Mountain,
  Rss,
} from 'lucide-react';
import { titles } from '.';
import { CmsMenuProps } from '@/types/menu';
import { useAppSelector } from '@/hooks';

function adminMenus() {
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const slug = currentUser?.user_details.slug;

  const menus: CmsMenuProps[] = [
    {
      title: 'Dashboard',
      url: `/${titles.servicesUrl}/${slug}/dashboard`,
      icon: Gauge,
    },
    {
      title: 'Banners',
      url: `/${titles.servicesUrl}/${slug}/banners`,
      icon: Images,
    },
    {
      title: 'District / Block Offices',
      url: `/${titles.servicesUrl}/${slug}/district-block-offices`,
      icon: Building,
    },
    {
      title: 'Computer Training',
      url: '#',
      icon: LaptopMinimal,
      children: [
        {
          title: 'Course Details',
          url: `/${titles.servicesUrl}/${slug}/computer-training/course-details`,
        },
        {
          title: 'Course Syllabus (PDF)',
          url: `/${titles.servicesUrl}/${slug}/computer-training/course-syllabus`,
        },
        {
          title: 'Training Centers',
          url: `/${titles.servicesUrl}/${slug}/computer-training/training-centres`,
        },
      ],
    },
    {
      title: 'Vocational Training',
      url: '#',
      icon: MapPin,
      children: [
        {
          title: 'Schemes',
          url: `/${titles.servicesUrl}/${slug}/vocational-training/schemes`,
        },
        {
          title: 'Training Centres',
          url: `/${titles.servicesUrl}/${slug}/vocational-training/training-centres`,
        },
      ],
    },
    {
      title: 'Mountaineering',
      url: '#',
      icon: Mountain,
      children: [
        {
          title: 'General Body Members',
          url: `/${titles.servicesUrl}/${slug}/mountaineering/general-body-members`,
        },
        {
          title: 'Training Calendar',
          url: `/${titles.servicesUrl}/${slug}/mountaineering/training-calendar`,
        },
        {
          title: 'Course Details',
          url: `/${titles.servicesUrl}/${slug}/mountaineering/course-details`,
        },
      ],
    },
    {
      title: 'Fairs & Programmes',
      url: `/${titles.servicesUrl}/${slug}/fairs-programmes`,
      icon: Fan,
    },
    {
      title: 'News & Events',
      url: `/${titles.servicesUrl}/${slug}/news-events`,
      icon: Rss,
    },
    {
      title: 'Youth Hostels',
      url: `/${titles.servicesUrl}/${slug}/youth-hostels`,
      icon: Building,
    },
    {
      title: 'Photo Gallery',
      url: `/${titles.servicesUrl}/${slug}/photo-gallery`,
      icon: Images,
    },
  ];

  return menus;
}
export default adminMenus;
