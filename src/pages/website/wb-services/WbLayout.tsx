import {
  WbFooter,
  WbHeaderBottom,
  WbHeaderTop,
  WbMenu,
  WbPageLoader,
} from '@/components';
import { LoaderFunction, Outlet, useLocation } from 'react-router-dom';
import { PageBannerProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { createContext, useContext, useEffect, useState } from 'react';
import { Store } from '@reduxjs/toolkit';
import { RootState } from '@/store';
import { setDistricts } from '@/features/commonSlice';
import { smoothScrollTo } from '@/utils/function';

const WebsiteContext = createContext<PageBannerProps>({});

const WbLayout = () => {
  const { pathname } = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [pageBanner, setPageBanner] = useState<PageBannerProps>({});

  const fetchBanner = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/banner/get`, {
        params: { url: pathname },
      });

      if (response.status === 200) {
        setPageBanner(response.data.data);
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBanner();
    setTimeout(() => {
      smoothScrollTo(0, 0, 500);
    }, 0);
  }, [pathname]);

  return (
    <>
      {isLoading && <WbPageLoader />}
      <WebsiteContext.Provider value={{ ...pageBanner }}>
        <WbHeaderTop />
        <WbHeaderBottom />
        <div className="bg-sky-600 h-10">
          <div className="max-w-screen-xl mx-auto flex flex-row justify-center items-center">
            <WbMenu />
          </div>
        </div>
        <Outlet />
        <WbFooter />
      </WebsiteContext.Provider>
    </>
  );
};
export default WbLayout;

export const useWebsiteContext = () => {
  const context = useContext(WebsiteContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};

// ---------------------------------------------

export const loader =
  (store: Store<RootState>): LoaderFunction =>
  async () => {
    const { districts } = store.getState().common;

    try {
      if (!!districts) {
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
