import { WebsiteMenuProps } from '@/types/menu';
import {
  Atom,
  BookOpenCheck,
  Building,
  CircleHelp,
  ContactRound,
  Headset,
  Images,
  LaptopMinimalCheck,
  ListChecks,
  MapPinned,
  MapPlus,
  MountainSnow,
  Navigation,
  PanelsTopLeft,
  Rss,
  Settings,
  SmilePlus,
  Users,
} from 'lucide-react';

export const menus: WebsiteMenuProps[] = [
  {
    name: 'About Us',
    subMenus: [
      {
        name: 'About the Department',
        desc: 'NA',
        icon: PanelsTopLeft,
        link: `/${import.meta.env.VITE_SERVICES}/about-department`,
      },
      {
        name: 'Organisation Chart',
        desc: 'NA',
        icon: Settings,
        link: `/${import.meta.env.VITE_SERVICES}/organisation-chart`,
      },
      {
        name: 'Address of Department / Director',
        desc: 'NA',
        icon: MapPinned,
        link: `/${import.meta.env.VITE_SERVICES}/address-of-dept-director`,
      },
      {
        name: 'District / Block Offices',
        desc: 'NA',
        icon: MapPlus,
        link: `/${import.meta.env.VITE_SERVICES}/district-block-offices`,
      },
      {
        name: 'Helpline',
        desc: 'NA',
        icon: Headset,
        link: `/${import.meta.env.VITE_SERVICES}/helpline`,
      },
    ],
    gridCols: 2,
  },
  {
    name: "Hon'ble MIC",
    link: `/${import.meta.env.VITE_SERVICES}/hon-mic`,
    icon: ContactRound,
  },
  {
    name: 'Youth Training Program',
    subMenus: [
      {
        name: 'Computer Training',
        desc: 'NA',
        icon: LaptopMinimalCheck,
        link: `/${import.meta.env.VITE_SERVICES}/computer-training`,
      },
      {
        name: 'Vocational Training',
        desc: 'NA',
        icon: Navigation,
        link: `/${import.meta.env.VITE_SERVICES}/vocational-training`,
      },
    ],
    gridCols: 2,
  },
  {
    name: 'Mountaineering',
    link: `/${import.meta.env.VITE_SERVICES}/mountaineering`,
    icon: MountainSnow,
  },
  {
    name: 'Fairs & Programmes',
    subMenus: [
      {
        name: 'West Bengal State Mission for Employment',
        desc: 'NA',
        icon: ListChecks,
        link: `/${import.meta.env.VITE_SERVICES}/wbsme`,
      },
      {
        name: 'West Bengal State Student-Youth Festival, 2017-2018',
        desc: 'NA',
        icon: Users,
        link: `/${import.meta.env.VITE_SERVICES}/wbssyf`,
      },
      {
        name: 'West Bengal State Student-Youth Science Fair, 2018-2019',
        desc: 'NA',
        icon: Atom,
        link: `/${import.meta.env.VITE_SERVICES}/wbsysf`,
      },
      {
        name: 'Bengal Yuva Kendra',
        desc: 'NA',
        icon: SmilePlus,
        link: `/${import.meta.env.VITE_SERVICES}/bangla-yuva-kendra`,
      },
      {
        name: 'Coaching for Job Oriented Examinations',
        desc: 'NA',
        icon: BookOpenCheck,
        link: `/${import.meta.env.VITE_SERVICES}/coaching-for-job`,
      },
      {
        name: 'Vivek Chetna Utsab',
        desc: 'NA',
        icon: Users,
        link: `/${import.meta.env.VITE_SERVICES}/vivek-chetna-utsab`,
      },
      {
        name: 'Rakhibandhan Utsab',
        desc: 'NA',
        icon: Users,
        link: `/${import.meta.env.VITE_SERVICES}/rakhibandhan-utsab`,
      },
      {
        name: 'Subhas Utsab',
        desc: 'NA',
        icon: Users,
        link: `/${import.meta.env.VITE_SERVICES}/subhas-utsab`,
      },
    ],
    gridCols: 2,
  },
  {
    name: 'News & Events',
    link: `/${import.meta.env.VITE_SERVICES}/news-events`,
    icon: Rss,
    gridCols: 2,
  },
  {
    name: 'Youth Hostel',
    subMenus: [
      {
        name: 'List of the Hostels',
        desc: 'NA',
        icon: Building,
        link: `/${import.meta.env.VITE_SERVICES}/hostel-list`,
      },
      {
        name: 'How to book Youth Hostel / Phone Number',
        desc: 'NA',
        icon: CircleHelp,
        link: `/${import.meta.env.VITE_SERVICES}/how-to-book`,
      },
    ],
    gridCols: 1,
  },
  {
    name: 'Photo Gallery',
    link: `/${import.meta.env.VITE_SERVICES}/photo-gallery`,
    icon: Images,
  },
];
