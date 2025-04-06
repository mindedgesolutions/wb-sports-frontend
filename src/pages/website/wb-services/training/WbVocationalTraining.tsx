import {
  WbContentWrapper,
  WbPageSidebar,
  WbPageTopBanner,
  WbPageWrapper,
} from '@/components';
import { titles } from '@/constants';

const WbVocationalTraining = () => {
  document.title = `Vocational Training and Self-Employment Scheme | ${titles.services}`;

  return (
    <div>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="Youth Training Program" />
        <WbContentWrapper title="Vocational Training and Self-Employment Scheme">
          <div className="flex flex-col gap-8 text-sm md:text-base tracking-wider leading-relaxed text-justify">
            <p>
              The following 22 disciplines of Vocational Training are approved
              by the Department of Youth Services & Sports. Training in a few
              selective disciplines out of these 22 approved disciplines are
              provided by the different Youth Vocational Training Centres of our
              state:
            </p>
            <ol content="1" className="list-decimal ml-8">
              <li className="mb-4">
                Diploma/Advanced Diploma in Interior Decoration & Designing.
              </li>
              <li className="mb-4">
                Diploma/Advance Diploma in Interior Decoration & Designing.
              </li>
              <li className="mb-4">
                Diploma in Mobile Phone and Telephone Repairing & Servicing.
              </li>
              <li className="mb-4">
                Certification in Computer Hardware Repairing & Maintenance.
              </li>
              <li className="mb-4">
                Advance Course in Computer Hardware Repairing & Networking.
              </li>
              <li className="mb-4">
                Certificate in Air-Conditioning & Refrigeration Engineering.
              </li>
              <li className="mb-4">Certificate in Beautician Course.</li>
            </ol>
            <p>
              Thousands of students & youth are being enabled to move forward
              towards the path of self-employment receiving training from these
              centres.
            </p>
            <p>
              Moreover, a Vocational Training & Self-Employment Scheme has been
              running in 66 (Sixty Six) sub-divisions of West Bengal jointly and
              in collaboration with the Technical Education & Training
              Department of our state. The various curriculums of this new
              scheme have been framed following the guidelines of the National
              Council of Vocational Training (N.C.V.T).
            </p>
          </div>
        </WbContentWrapper>
      </WbPageWrapper>
    </div>
  );
};
export default WbVocationalTraining;
