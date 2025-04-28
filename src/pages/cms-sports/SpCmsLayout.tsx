import { SpFooter, SpTopnav } from '@/components';
import { AppSidebar } from '@/components/cms-sports/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { titles } from '@/constants';
import { setDistricts } from '@/features/commonSlice';
import {
  setCurrentUserSp,
  unsetCurrentUserSp,
} from '@/features/currentUserSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import customFetch from '@/utils/customFetch';
import showError from '@/utils/showError';
import { Store } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';

const SpCmsLayout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const { currentUserSp } = useAppSelector((state) => state.currentUser);
  const { pathname } = useLocation();

  const unauthenticated = () => {
    showError(`You are not authenticated! Please sign in.`);
    dispatch(unsetCurrentUserSp());
    localStorage.removeItem(import.meta.env.VITE_SERVICE_TOKEN_NAME);
    navigate(`/${titles.sportsUrl}/sign-in`);
  };

  const unauthorized = () => {
    showError(`You are not authorized to access this page.`);
    navigate(`/forbidden`);
  };

  const invalidurl = () => {
    if (
      currentUserSp?.user_details.slug &&
      slug !== currentUserSp?.user_details.slug
    ) {
      showError(`Invalid URL! Please sign again.`);
      dispatch(unsetCurrentUserSp());
      localStorage.removeItem(import.meta.env.VITE_TOKEN_NAME);
      navigate(`/${titles.sportsUrl}/sign-in`);
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
          <SpTopnav />
          <Outlet />
          <SpFooter />
        </main>
      </SidebarProvider>
    </>
  );
};
export default SpCmsLayout;

// --------------------------------------------
export const loader = (store: Store<RootState>) => async () => {
  const { currentUserSp } = store.getState().currentUser;
  const { districts } = store.getState().common;

  try {
    if (!currentUserSp) {
      const response = await customFetch.get(`/auth/me`);
      const user = response.data.data;
      store.dispatch(setCurrentUserSp(user));
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
