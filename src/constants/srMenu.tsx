import { Gauge, Images, Settings } from 'lucide-react';
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
    title: 'Product Settings',
    url: '#',
    icon: Settings,
    children: [
      {
        title: 'Brands',
        url: `/${titles.servicesUrl}/admin/${slug}/products/brands`,
      },
      {
        title: 'Categories',
        url: `/admin/${slug}/products/categories`,
      },
    ],
  },
];
