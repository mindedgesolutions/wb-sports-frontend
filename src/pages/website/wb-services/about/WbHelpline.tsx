import {
  WbPageWrapper,
  WbPageSidebar,
  WbPageTopBanner,
  WbContentWrapper,
} from '@/components';
import { titles } from '@/constants';

const WbHelpline = () => {
  document.title = `Helpline | ${titles.services}`;

  return (
    <>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="About Us" />
        <WbContentWrapper title="Helpline">
          <div className="flex flex-col gap-8 text-sm md:text-base tracking-wider leading-relaxed">
            <div className="">
              <p>Department of Youth Services & Sports(Youth Services Wing)</p>
              <p>Standard Building(1st floor)</p>
              <p>32/1, B.B.D. Bag (South), Kolkata- 700001</p>
              <p>Ph. No. - 91 - 33 - 2248 - 3794</p>
            </div>

            <div className="">
              <p>Directorate of Youth Services</p>
              <p>Standard Building(2nd floor)</p>
              <p>32/1, B.B.D. Bag (South), Kolkata- 700001</p>
              <p>Ph. No. - 91 - 33 - 2248 - 0626</p>
            </div>
          </div>
        </WbContentWrapper>
      </WbPageWrapper>
    </>
  );
};
export default WbHelpline;
