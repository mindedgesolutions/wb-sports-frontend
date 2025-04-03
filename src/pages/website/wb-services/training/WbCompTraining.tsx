import {
  WbContentWrapper,
  WbPageSidebar,
  WbPageTopBanner,
  WbPageWrapper,
} from '@/components';
import { titles } from '@/constants';

const WbCompTraining = () => {
  document.title = `Youth Computer Training Centre | ${titles.services}`;

  return (
    <div>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="Youth Training Program" />
        <WbContentWrapper title="Youth Computer Training Centre">
          <div className="flex flex-col gap-8 text-sm md:text-base tracking-wider leading-relaxed text-justify">
            <p>
              The Youth Computer Training Centres run by the Department of Youth
              Services & Sports (Youth Services wing) in collaboration with
              different private organizations play an important role in
              providing low cost computer training to the student-youth across
              the state enabling them to prepare themselves fit for employment.
              About 1,000 (One Thousand) Youth Computer Training centres are now
              running across the state. Every year thousands of student-youth
              are getting themselves eligible to survive in the competitive job
              market successfully being trained from these training centres in
              various courses.
            </p>
            <p>
              As advised by the Department of Information Technology of Govt. of
              West Bengal, efforts are being given to make the syllabus of these
              Youth Computer Training Centres as far as possible up to date and
              compatible with the present job market. Initiatives have also been
              taken for introducing Online Examination System in all Youth
              Computer Training Centres of our state. Consequently, all Youth
              Computer Training Centres have already come under the purview of
              Online Examination System. One world famous multinational
              organization has been entrusted upon to conduct the entire system
              of online examination and evaluation thereof. Introduction of this
              system has enabled us to maintain parity in case of evaluation of
              the syllabus of all Youth Computer Training Centres with minimum
              manual effort. The chances of error have also been reduced to a
              large extent. The students are getting their certificates
              downloaded online. This new initiative of the Department has
              brought revolutionary changes in the entire education system of
              these Youth Computer Training Centres.
            </p>
            <p>
              In order to spread the computer education to every nook and corner
              of the state, the department takes up measures for setting up more
              and more new Youth Computer Training Centres every year as well as
              introducing more new relevant courses. Proposals in this regard
              are being invited from interested individuals or organizations
              subject to fulfilling the following mandatory conditions :
            </p>
            <ol content="1" className="list-decimal space-y-4 ml-8 font-medium">
              <li>
                The distance from the already existing centre to the proposed
                new centre should be at least 3 kilometres in case of rural
                areas and at least 1 kilometre in case of municipal areas.
              </li>
              <li>
                There should be provision for a premise of at least 1500 sq. ft.
                of area, which will have separate toilets for boys and girls and
                a specific space for an office room.
              </li>
              <li>
                Supporting documents regarding the proprietorship of the room or
                rent paid has to be submitted.
              </li>
              <li>
                Still photo and sketch map of the room has to be submitted.
              </li>
              <li>
                The applicant should produce the documents regarding his
                computer knowledge.
              </li>
              <li>
                Photograph of atleast 2(two) nos. of Faculty Members and
                documents of their educational qualification along with complete
                bio-data has to be submitted.
              </li>
              <li>
                Copy of the trade license issued bythe local authority has to be
                produced.
              </li>
              <li>
                The applicant should submit the photocopy of his Bank Pass Book.
              </li>
              <li>
                There should be at least 15 Nos.of computers in the proposed new
                centre in rural area whereas the required nos. of computers in
                municipal area will be 20.
              </li>
              <li>
                In regards to course fee and other rules & regulations only the
                departmental orders are to be followed.
              </li>
            </ol>
          </div>
        </WbContentWrapper>
      </WbPageWrapper>
    </div>
  );
};
export default WbCompTraining;
