import { WbcFooter, WbcTopnav } from '@/components';
import { AppSidebar } from '@/components/cms-services/sidebar/app-sidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { setDistricts } from '@/features/commonSlice';
import { setCurrentUser } from '@/features/currentUserSlice';
import customFetch from '@/utils/customFetch';
import { Outlet } from 'react-router-dom';

const WbCmsLayout = () => {
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
export const loader = (store: any) => async () => {
  const { currentUser } = store.getState().currentUser;
  const { districts } = store.getState().common;

  try {
    if (!currentUser) {
      const response = await customFetch.get(`/auth/me`);
      const user = response.data.data;
      store.dispatch(setCurrentUser(user));
    }
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
