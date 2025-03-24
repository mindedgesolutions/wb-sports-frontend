import { WbHomepageCard, WbHomeTopBanner } from '@/components';
import { images, titles } from '@/constants';

const training = `Computer Training Centres run by the Department of Youth Services &
        Sports (Youth Services wing) in collaboration with different private
        organizations play an important role in providing low cost computer
        training to the student-youth across the state enabling them to prepare
        themselves fit for employment`;
const trainingReadMore = `/${titles.serviceUrlWeb}/computer-training`;

const hostel = `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni recusandae fugit similique consequatur hic assumenda! Temporibus eligendi quia dolorem quam?`;
const hostelReadMore = `/${titles.serviceUrlWeb}/hostel-list`;

const WbHomePage = () => {
  document.title = `Welcome! ${import.meta.env.VITE_SERVICE_APP_NAME}`;

  return (
    <div>
      <WbHomeTopBanner />
      <div className="max-w-screen-xl mx-auto p-4">
        <div className="flex-1 mt-8">
          <p className="text-base tracking-wider leading-relaxed text-justify [text-align-last:center]">
            The major area of activities of Department of Youth Services &
            Sports (Youth Services Wing) are essentially focussed at the Student
            - Youth section of the society. It is the Student - Youth, which
            represent the most vibrant, capable section of the society, who are
            especially enthusiastic in moving forward for the sake of human
            welfare even sacrificing their personal interests. The Department of
            Youth Services & Sports has given special emphasis on providing
            training to the Student-Youth of our state to make them prepared for
            meeting up the demand of the day.
          </p>
        </div>
        <div className="mt-16 flex-1 flex justify-center items-center gap-8">
          <WbHomepageCard
            title="Computer training"
            content={training}
            img={images.computerTraining}
            readmore={trainingReadMore}
            btn={false}
          />
          <WbHomepageCard
            content={hostel}
            img={images.hostel}
            readmore={hostelReadMore}
            title="Youth hostels"
            btn={true}
            href={`https://youthhostelbooking.wb.gov.in/pages/Home.aspx`}
          />
        </div>
      </div>
    </div>
  );
};
export default WbHomePage;
