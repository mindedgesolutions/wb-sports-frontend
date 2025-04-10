import { WebsiteMenuProps } from '@/types/menu';
import {
  Building,
  CircleHelp,
  ContactRound,
  Headset,
  House,
  Images,
  LaptopMinimalCheck,
  MapPinned,
  MapPlus,
  MountainSnow,
  Navigation,
  PanelsTopLeft,
  Rss,
  Settings,
} from 'lucide-react';
import { titles } from '.';

export const menus: WebsiteMenuProps[] = [
  {
    name: 'Home',
    link: `/${titles.serviceUrlWeb}/home`,
    icon: House,
  },
  {
    name: 'About Us',
    subMenus: [
      {
        name: 'About the Department',
        desc: 'NA',
        icon: PanelsTopLeft,
        link: `/${titles.serviceUrlWeb}/about-department`,
      },
      {
        name: 'Organisation Chart',
        desc: 'NA',
        icon: Settings,
        link: `/${titles.serviceUrlWeb}/organisation-chart`,
      },
      {
        name: 'Address of Department / Director',
        desc: 'NA',
        icon: MapPinned,
        link: `/${titles.serviceUrlWeb}/address-of-dept-director`,
      },
      {
        name: 'District / Block Offices',
        desc: 'NA',
        icon: MapPlus,
        link: `/${titles.serviceUrlWeb}/district-block-offices`,
      },
      {
        name: 'Helpline',
        desc: 'NA',
        icon: Headset,
        link: `/${titles.serviceUrlWeb}/helpline`,
      },
    ],
    gridCols: 2,
  },
  {
    name: "Hon'ble MIC",
    link: `/${titles.serviceUrlWeb}/hon-mic`,
    icon: ContactRound,
  },
  {
    name: 'Youth Training Program',
    subMenus: [
      {
        name: 'Computer Training',
        desc: 'NA',
        icon: LaptopMinimalCheck,
        link: `/${titles.serviceUrlWeb}/computer-training`,
      },
      {
        name: 'Vocational Training',
        desc: 'NA',
        icon: Navigation,
        link: `/${titles.serviceUrlWeb}/vocational-training`,
      },
    ],
    gridCols: 1,
  },
  {
    name: 'Mountaineering',
    link: `/${titles.serviceUrlWeb}/mountaineering`,
    icon: MountainSnow,
  },
  {
    name: 'Fairs & Programmes',
    link: `/${titles.serviceUrlWeb}/fairs-programmes`,
    icon: ContactRound,
    gridCols: 2,
  },
  {
    name: 'News & Events',
    link: `/${titles.serviceUrlWeb}/news-events`,
    icon: Rss,
    gridCols: 1,
  },
  {
    name: 'Youth Hostel',
    subMenus: [
      {
        name: 'List of the Hostels',
        desc: 'NA',
        icon: Building,
        link: `/${titles.serviceUrlWeb}/hostel-list`,
      },
      {
        name: 'How to book Youth Hostel / Phone Number',
        desc: 'NA',
        icon: CircleHelp,
        link: `/${titles.serviceUrlWeb}/how-to-book`,
      },
    ],
    gridCols: 1,
  },
  {
    name: 'Photo Gallery',
    link: `/${titles.serviceUrlWeb}/photo-gallery`,
    icon: Images,
  },
];
