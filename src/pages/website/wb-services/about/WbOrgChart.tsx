import {
  WbPageWrapper,
  WbPageSidebar,
  WbPageTopBanner,
  WbContentWrapper,
} from '@/components';
import { images, titles } from '@/constants';

const WbOrgChart = () => {
  document.title = `Organisation Chart | ${titles.services}`;
  return (
    <>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="About Us" />
        <WbContentWrapper title="Organisation Chart">
          <img src={images.srOrganisationChart} alt={titles.services} />
        </WbContentWrapper>
      </WbPageWrapper>
    </>
  );
};
export default WbOrgChart;
