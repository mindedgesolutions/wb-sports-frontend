import {
  WbContentWrapper,
  WbPageSidebar,
  WbPageTopBanner,
  WbPageWrapper,
} from '@/components';
import { titles } from '@/constants';

const WbHowBookHostel = () => {
  document.title = `How to Book Youth Hostel / Phone Number | ${titles.services}`;

  return (
    <div>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="Youth Hostel" />
        <WbContentWrapper title="How to Book Youth Hostel / Phone Number">
          <p>
            Kindly visit our Website{' '}
            <a
              href="https://youthhostelbooking.wb.gov.in"
              target="_blank"
              className="hover:text-sky"
            >
              https://youthhostelbooking.wb.gov.in
            </a>{' '}
            for online booking purpose.Moreover physical booking of youth
            hostels are also done from the following adress
          </p>
          <div className="">
            <p>State Youth Centre</p>
            <p>
              142/3, A.J.C Bose Road, Moulali, Kolkata-700014,PH- 03322653231
            </p>
          </div>
          <p className="font-semibold">
            Facility of special concession in rate is given in case of booking
            made by a school, college and university.
          </p>
          <div className="">
            <p>Our office adress is:</p>
            <p>Directorate of Youth Services,</p>
            <p>32/1, B.B.D. Bag (South), Standard Building,</p>
            <p>2nd floor, Kolkata- 700001.</p>
            <p>Ph. No. - 91 - 33 - 2248 - 0626</p>
            <p className="ml-16">91 - 33 - 2265 - 3231</p>
          </div>
        </WbContentWrapper>
      </WbPageWrapper>
    </div>
  );
};
export default WbHowBookHostel;
