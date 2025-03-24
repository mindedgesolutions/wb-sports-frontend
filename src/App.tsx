import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import * as sy from '@/pages';
import { store } from './store';

// --------------------------------------------
import { loader as wbLayoutLoader } from '@/pages/cms-services/WbCmsLayout';

const router = createBrowserRouter([
  { path: '/', element: <sy.WbLanding /> },
  // Services Website routes start -----------------------------------
  {
    path: `/${import.meta.env.VITE_SERVICES}`,
    element: <sy.WbLayout />,
    children: [
      { path: 'home', element: <sy.WbHomePage /> },
      {
        path: '',
        children: [
          { path: 'about-department', element: <sy.WbAboutDept /> },
          { path: 'organisation-chart', element: <sy.WbOrgChart /> },
          { path: 'address-of-dept-director', element: <sy.WbDeptAddress /> },
          { path: 'district-block-offices', element: <sy.WbDistrictOffice /> },
          { path: 'helpline', element: <sy.WbHelpline /> },
        ],
      },
      { path: 'hon-mic', element: <sy.WbMic /> },
      {
        path: '',
        children: [
          { path: 'computer-training', element: <sy.WbCompTraining /> },
          { path: 'vocational-training', element: <sy.WbVocationalTraining /> },
        ],
      },
      {
        path: 'mountaineering',
        children: [
          { index: true, element: <sy.WbMountaineering /> },
          { path: 'news-events', element: <sy.WbMountainNewsEvents /> },
        ],
      },
      {
        path: '',
        children: [
          { path: 'wbsme', element: <sy.WbSme /> },
          { path: 'wbssyf', element: <sy.WbSyf /> },
          { path: 'wbsysf', element: <sy.WbSysf /> },
          { path: 'bangla-yuva-kendra', element: <sy.WbBanglaYuvaKendra /> },
          { path: 'coaching-for-job', element: <sy.WbCoachingForJob /> },
          { path: 'vivek-chetna-utsab', element: <sy.WbVivekChetna /> },
          { path: 'rakhibandhan-utsab', element: <sy.WbRakhiBandhan /> },
          { path: 'subhas-utsab', element: <sy.WbSubhas /> },
        ],
      },
      { path: 'news-events', element: <sy.WbNewsEvents /> },
      {
        path: '',
        children: [
          { path: 'hostel-list', element: <sy.WbHostelList /> },
          { path: 'how-to-book', element: <sy.WbHowBookHostel /> },
        ],
      },
      { path: 'photo-gallery', element: <sy.WbPhotoGallery /> },
    ],
  },
  // Services Website routes end -----------------------------------

  // Services Admin / CMS routes start -----------------------------------
  {
    path: `/${import.meta.env.VITE_SERVICES}/cms/sign-in`,
    element: <sy.WbSignIn />,
  },
  {
    path: `/${import.meta.env.VITE_SERVICES}/cms/forgot-password`,
    element: <sy.WbForgotPassword />,
  },
  {
    path: `/${import.meta.env.VITE_SERVICES}/cms/reset-password`,
    element: <sy.WbResetPassword />,
  },
  {
    path: `/${import.meta.env.VITE_SERVICES}/cms/:slug`,
    element: <sy.WbCmsLayout />,
    loader: wbLayoutLoader(store),
    children: [
      { path: 'dashboard', element: <sy.WbCmsDashboard /> },
      { path: 'banners', element: <sy.WbCmsBanners /> },
    ],
  },
  // Services Admin / CMS routes end -----------------------------------

  // Sports Website routes start -----------------------------------
  {
    path: `/${import.meta.env.VITE_SPORTS}`,
    element: <sy.SpLayout />,
    children: [{ path: 'home', element: <sy.SpHomePage /> }],
  },
  // Sports Website routes end -----------------------------------
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
