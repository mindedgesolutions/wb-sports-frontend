import { WbHomepageCard, WbHomeTopBanner, WbNewsScroller } from '@/components';
import { images, titles } from '@/constants';
import customFetch from '@/utils/customFetch';
import { LoaderFunction } from 'react-router-dom';

const training = `Computer Training Centres run by the Department of Youth Services &
        Sports (Youth Services wing) in collaboration with different private
        organizations play an important role in providing low cost computer
        training to the student-youth across the state enabling them to prepare
        themselves fit for employment`;
const trainingReadMore = `/${titles.serviceUrlWeb}/computer-training`;

const hostel = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, voluptas. Ducimus quas numquam dolor explicabo quia sed vel, deserunt mollitia architecto aliquid quis corrupti neque, blanditiis et a obcaecati molestias recusandae cumque magnam officia placeat, ad minus repellendus? Iusto eum voluptas corrupti nam quos. Sequi, in dolorem quibusdam aliquam et corrupti rem voluptatibus nesciunt, esse perferendis`;

const hostelReadMore = `/${titles.serviceUrlWeb}/hostel-list`;

const WbHomePage = () => {
  document.title = `${import.meta.env.VITE_SERVICE_APP_NAME}`;

  return (
    <div>
      <WbHomeTopBanner />
      <div className="md:max-w-screen-xl md:mx-auto p-4">
        <div className="flex-1 mt-8">
          <p className="text-sm md:text-base tracking-wider leading-relaxed text-justify [text-align-last:center]">
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
        <div className="mt-8 md:mt-16 w-full md:max-w-screen-xl md:mx-auto grid grid-cols-1 md:grid-cols-7 sm:grid-flow-col lg:grid-flow-row gap-6">
          <div className="col-span-1 md:col-span-2">
            <WbHomepageCard
              title="Computer training"
              content={training}
              img={images.computerTraining}
              readmore={trainingReadMore}
              btn={false}
            />
          </div>
          <div className="col-span-1 md:col-span-2">
            <WbHomepageCard
              content={hostel}
              img={images.hostel}
              readmore={hostelReadMore}
              title="Youth hostels"
              btn={true}
              href={`https://youthhostelbooking.wb.gov.in/pages/Home.aspx`}
            />
          </div>
          <div className="col-span-1 md:col-span-3 p-2 max-h-[400px] overflow-hidden">
            <WbNewsScroller />
          </div>
        </div>
      </div>
    </div>
  );
};
export default WbHomePage;

// --------------------------------------

export const loader: LoaderFunction = async () => {
  try {
    const response = await customFetch.get(`/services/news-events/scroll`);
    const data = response.data.news;
    return { data };
  } catch (error) {
    console.log(error);
    return;
  }
};
