import {
  WbContentWrapper,
  WbPageSidebar,
  WbPageTopBanner,
  WbPageWrapper,
} from '@/components';
import { images, titles } from '@/constants';

const WbMic = () => {
  document.title = `Hon'ble MIC | ${titles.services}`;

  return (
    <>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="Hon'ble MIC" />
        <WbContentWrapper title="Message from Minister">
          <img src={images.honbleMos} alt={titles.services} />
        </WbContentWrapper>
      </WbPageWrapper>
    </>
  );
};
export default WbMic;
