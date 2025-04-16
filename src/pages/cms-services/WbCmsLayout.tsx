import { WbcFooter, WbcTopnav } from '@/components';
import { AppSidebar } from '@/components/cms-services/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { titles } from '@/constants';
import { setDistricts } from '@/features/commonSlice';
import { setCurrentUser, unsetCurrentUser } from '@/features/currentUserSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import { Store } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

const WbCmsLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { currentUser } = useAppSelector((state) => state.currentUser);
  const { pathname } = useLocation();

  const unauthenticated = () => {
    showError(`You are not authenticated! Please sign in.`);
    dispatch(unsetCurrentUser());
    localStorage.removeItem(import.meta.env.VITE_SERVICE_TOKEN_NAME);
    navigate(`/${titles.servicesUrl}/sign-in`);
  };

  const unauthorized = () => {
    showError(`You are not authorized to access this page.`);
    navigate(`/forbidden`);
  };

  const invalidurl = () => {
    if (
      currentUser?.user_details.slug &&
      slug !== currentUser?.user_details.slug
    ) {
      showError(`Invalid URL! Please sign again.`);
      dispatch(unsetCurrentUser());
      localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
      navigate(`/${titles.servicesUrl}/sign-in`);
    }
    return true;
  };

  useEffect(() => {
    window.addEventListener('unauthenticated', unauthenticated);
    window.addEventListener('unauthorized', unauthorized);
    invalidurl();
  }, [pathname]);

  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <WbcTopnav />
          <Outlet />
          <WbcFooter />
        </main>
      </SidebarProvider>
    </>
  );
};
export default WbCmsLayout;

// --------------------------------------------
export const loader = (store: Store<RootState>) => async () => {
  const { currentUser } = store.getState().currentUser;
  const { districts } = store.getState().common;

  try {
    if (!currentUser) {
      const response = await customFetch.get(`/auth/me`);
      const user = response.data.data;
      store.dispatch(setCurrentUser(user));
    }
    if (!districts.length) {
      const response = await customFetch.get(`/services/districts`);
      const districts = response.data.data;
      store.dispatch(setDistricts(districts));
    }
    return null;
  } catch (error) {
    console.log(error);
    return error;
  }
};
