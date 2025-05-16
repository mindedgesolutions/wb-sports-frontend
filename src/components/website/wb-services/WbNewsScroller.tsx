import { NewsEventsProps } from '@/types/contents';
import { useLoaderData } from 'react-router-dom';
import { Marquee } from '@/components/magicui/marquee';
import { images } from '@/constants';

const WbNewsScroller = () => {
  const data = useLoaderData();

  const ReviewCard = ({ title }: { title: string }) => {
    return (
      <figure className="relative h-full w-full cursor-pointer overflow-hidden rounded-sm p-2">
        <div className="flex flex-row items-center gap-2">
          <img className="h-10 w-10" alt={title} src={images.attachBg} />
          <div className="flex flex-col">
            <figcaption className="text-sm text-muted-foreground hover:text-card-foreground dark:text-white">
              {title}
            </figcaption>
          </div>
        </div>
      </figure>
    );
  };

  return (
    <div className="relative flex h-full w-full flex-row items-center justify-center overflow-hidden">
      {data.data ? (
        <Marquee pauseOnHover vertical className="[--duration:20s] [--gap:4px]">
          {data.data.map((news: NewsEventsProps) => (
            <ReviewCard key={news.id} {...news} />
          ))}
        </Marquee>
      ) : null}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
};
export default WbNewsScroller;
