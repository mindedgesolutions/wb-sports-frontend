import { Gauge, Images, LaptopMinimal } from 'lucide-react';
import { titles } from '.';
import { CmsMenuProps } from '@/types/menu';

const slug = 'souvik-nag';

export const adminMenus: CmsMenuProps[] = [
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
];
