import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as sy from '@/pages';
import { store } from './store';
import { titles } from './constants';

// --------------------------------------------
import { loader as wbLayoutLoader } from '@/pages/cms-services/WbCmsLayout';
import { loader as srWebsiteLayoutLoader } from '@/pages/website/wb-services/WbLayout';
import { loader as srWebDistrictOfficeLoader } from '@/pages/website/wb-services/about/WbDistrictOffice';
import { loader as srWebCompTrainingLoader } from '@/pages/website/wb-services/training/WbCompTraining';
import { loader as srWebPhotoGalleryLoader } from '@/pages/website/wb-services/gallery/WbPhotoGallery';
import { loader as srWebGallerySingleLoader } from '@/pages/website/wb-services/gallery/WbGallerySingle';
import { loader as srWebFpLoader } from '@/pages/website/wb-services/fairs-programs/WbFairsProgrammesWeb';
import { loader as srWebMountaineeringLoader } from '@/pages/website/wb-services/mountaineering/WbMountaineering';
import { loader as wbHostelLoader } from '@/pages/cms-services/youth-hostel/WbAppHostelInfo';
import { loader as srWebHostelListLoader } from '@/pages/website/wb-services/youth-hostel/WbHostelList';
// Sports loaders start ------------------------
import { loader as spLayoutLoader } from '@/pages/cms-sports/SpCmsLayout';

const router = createBrowserRouter([
  { path: '/', element: <sy.WbLanding /> },
  // Services Website routes start -----------------------------------
  {
    path: `/${titles.serviceUrlWeb}`,
    element: <sy.WbLayout />,
    loader: srWebsiteLayoutLoader(store),
    children: [
      { path: 'home', element: <sy.WbHomePage /> },
      {
        path: '',
        children: [
          { path: 'about-department', element: <sy.WbAboutDept /> },
          { path: 'organisation-chart', element: <sy.WbOrgChart /> },
          { path: 'address-of-dept-director', element: <sy.WbDeptAddress /> },
          {
            path: 'district-block-offices',
            element: <sy.WbDistrictOffice />,
            loader: srWebDistrictOfficeLoader,
          },
          { path: 'helpline', element: <sy.WbHelpline /> },
        ],
      },
      { path: 'hon-mic', element: <sy.WbMic /> },
      {
        path: '',
        children: [
          {
            path: 'computer-training',
            element: <sy.WbCompTraining />,
            loader: srWebCompTrainingLoader,
          },
          { path: 'vocational-training', element: <sy.WbVocationalTraining /> },
        ],
      },
      {
        path: 'mountaineering',
        children: [
          {
            index: true,
            element: <sy.WbMountaineering />,
            loader: srWebMountaineeringLoader(store),
          },
          { path: 'news-events', element: <sy.WbMountainNewsEvents /> },
        ],
      },
      {
        path: 'fairs-programmes',
        children: [
          {
            index: true,
            element: <sy.WbFairsProgrammesWeb />,
            loader: srWebFpLoader(store),
          },
          { path: ':slug', element: <sy.WbFairsProgrammesSingleWeb /> },
        ],
      },
      { path: 'news-events', element: <sy.WbNewsEvents /> },
      {
        path: '',
        children: [
          {
            path: 'hostel-list',
            element: <sy.WbHostelList />,
            loader: srWebHostelListLoader(store),
          },
          { path: 'how-to-book', element: <sy.WbHowBookHostel /> },
        ],
      },
      {
        path: 'photo-gallery',
        children: [
          {
            index: true,
            element: <sy.WbPhotoGallery />,
            loader: srWebPhotoGalleryLoader,
          },
          {
            path: ':slug',
            element: <sy.WbGallerySingle />,
            loader: srWebGallerySingleLoader,
          },
        ],
      },
    ],
  },
  // Services Website routes end -----------------------------------

  // Services Admin / CMS routes start -----------------------------------
  {
    path: `/${titles.servicesUrl}/sign-in`,
    element: <sy.WbSignIn />,
  },
  {
    path: `/${titles.servicesUrl}/forgot-password`,
    element: <sy.WbForgotPassword />,
  },
  {
    path: `/${titles.servicesUrl}/reset-password`,
    element: <sy.WbResetPassword />,
  },
  {
    path: `/${titles.servicesUrl}/:slug`,
    element: <sy.WbCmsLayout />,
    loader: wbLayoutLoader(store),
    children: [
      { path: 'settings', element: <sy.WbProfile /> },
      { path: 'change-password', element: <sy.WbChangePassword /> },
      { path: 'dashboard', element: <sy.WbCmsDashboard /> },
      { path: 'banners', element: <sy.WbCmsBanners /> },
      {
        path: 'district-block-offices',
        element: <sy.WbAppDistrictBlockOffice />,
      },
      {
        path: 'computer-training',
        children: [
          { path: 'course-details', element: <sy.WbCompCourseDetails /> },
          { path: 'course-syllabus', element: <sy.WbCompCourseSyllabus /> },
          { path: 'training-centres', element: <sy.WbCompCentres /> },
        ],
      },
      {
        path: 'vocational-training',
        children: [
          { path: 'schemes', element: <sy.WbAppVocationalSchemes /> },
          { path: 'training-centres', element: <sy.WbAppVocationalCentres /> },
        ],
      },
      {
        path: 'mountaineering',
        children: [
          {
            path: 'general-body-members',
            element: <sy.WbGeneralBodyMembers />,
          },
          { path: 'training-calendar', element: <sy.WbTrainingCalendar /> },
          { path: 'course-details', element: <sy.WbMountainCourseDetails /> },
        ],
      },
      { path: 'fairs-programmes', element: <sy.WbFairsProgrammes /> },
      {
        path: 'fairs-programmes/update/:uuid?',
        element: <sy.WbAddEditFairProgramme />,
      },
      { path: 'news-events', element: <sy.WbAppNewsEvents /> },
      {
        path: 'youth-hostels',
        children: [
          {
            index: true,
            element: <sy.WbAppHostelList />,
          },
          {
            path: 'update/:uuid?',
            element: <sy.WbAppHostelInfo />,
            loader: wbHostelLoader,
          },
        ],
      },
      { path: 'photo-gallery', element: <sy.WbAppPhotoGallery /> },
    ],
  },
  // Services Admin / CMS routes end -----------------------------------

  // Sports Website routes start -----------------------------------
  {
    path: `/${titles.sportsUrlWeb}`,
    element: <sy.SpLayout />,
    children: [{ path: 'home', element: <sy.SpHomePage /> }],
  },
  // Sports Website routes end -----------------------------------

  // Sports Admin / CMS routes start -----------------------------------

  { path: `/${titles.sportsUrl}/sign-in`, element: <sy.SpSignIn /> },
  {
    path: `/${titles.sportsUrl}/forgot-password`,
    element: <sy.SpForgotPassword />,
  },
  {
    path: `/${titles.sportsUrl}/reset-password`,
    element: <sy.SpResetPassword />,
  },
  {
    path: `/${titles.sportsUrl}/:slug`,
    element: <sy.SpCmsLayout />,
    loader: spLayoutLoader(store),
    children: [
      { path: 'settings', element: <sy.SpProfile /> },
      { path: 'change-password', element: <sy.SpChangePassword /> },
      { path: 'dashboard', element: <sy.SpCmsDashboard /> },
    ],
  },

  // Sports Admin / CMS routes end -----------------------------------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
