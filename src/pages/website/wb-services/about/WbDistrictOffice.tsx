import { WbPageWrapper, WbPageSidebar, WbPageTopBanner } from '@/components';
import { titles } from '@/constants';

const WbDistrictOffice = () => {
  document.title = `District / Block Offices | ${titles.services}`;

  return (
    <>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="About Us" />
      </WbPageWrapper>
    </>
  );
};
export default WbDistrictOffice;
