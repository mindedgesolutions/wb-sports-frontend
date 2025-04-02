import { WebsiteMenuProps } from '@/types/menu';
import {
  Atom,
  BookOpenCheck,
  Building,
  CircleHelp,
  ContactRound,
  Headset,
  House,
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
    subMenus: [
      {
        name: 'West Bengal State Mission for Employment',
        desc: 'NA',
        icon: ListChecks,
        link: `/${titles.serviceUrlWeb}/wbsme`,
      },
      {
        name: 'West Bengal State Student-Youth Festival, 2017-2018',
        desc: 'NA',
        icon: Users,
        link: `/${titles.serviceUrlWeb}/wbssyf`,
      },
      {
        name: 'West Bengal State Student-Youth Science Fair, 2018-2019',
        desc: 'NA',
        icon: Atom,
        link: `/${titles.serviceUrlWeb}/wbsysf`,
      },
      {
        name: 'Bengal Yuva Kendra',
        desc: 'NA',
        icon: SmilePlus,
        link: `/${titles.serviceUrlWeb}/bangla-yuva-kendra`,
      },
      {
        name: 'Coaching for Job Oriented Examinations',
        desc: 'NA',
        icon: BookOpenCheck,
        link: `/${titles.serviceUrlWeb}/coaching-for-job`,
      },
      {
        name: 'Vivek Chetna Utsab',
        desc: 'NA',
        icon: Users,
        link: `/${titles.serviceUrlWeb}/vivek-chetna-utsab`,
      },
      {
        name: 'Rakhibandhan Utsab',
        desc: 'NA',
        icon: Users,
        link: `/${titles.serviceUrlWeb}/rakhibandhan-utsab`,
      },
      {
        name: 'Subhas Utsab',
        desc: 'NA',
        icon: Users,
        link: `/${titles.serviceUrlWeb}/subhas-utsab`,
      },
    ],
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
