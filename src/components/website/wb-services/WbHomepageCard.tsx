import { Button } from '@/components/ui/button';
import { images, titles } from '@/constants';
import { NavLink } from 'react-router-dom';

type WbHomepageCardProps = {
  title: string;
  img: string;
  content: string;
  readmore: string;
  btn: boolean;
  href?: string;
};

const WbHomepageCard = ({
  title,
  img,
  content,
  readmore,
  btn,
  href,
}: WbHomepageCardProps) => {
  const titleShort = title.length > 20 ? title.slice(0, 20) + `...` : title;
  const contentShort =
    content.length > 80 ? content.slice(0, 80) + `...` : content;

  return (
    <div className="max-w-sm p-4 rounded-sm border border-muted-foreground/10 hover:shadow-xl hover:shadow-zinc-300 duration-300 flex flex-col justify-center items-center gap-2">
      <h1 className="text-2xl tracking-wider font-semibold text-sky capitalize">
        {titleShort}
      </h1>
      <div className="w-full h-64 overflow-hidden">
        <img src={img} alt={titles.services} className="w-full object-cover" />
      </div>
      <div className="mt-4 relative w-full">
        <p className="line-clamp-2 text-sm tracking-wide leading-relaxed">
          {contentShort}
          <NavLink
            to={readmore}
            className="absolute bottom-0 right-0 text-sky hover:text-sky/60 duration-200"
          >
            Read more ...
          </NavLink>
        </p>
      </div>
      <div className="w-full min-h-9 mt-4">
        {btn && (
          <a href={href} target="_blank" rel="noreferrer">
            <Button className="w-full rounded-sm bg-sky hover:bg-sky/90 uppercase tracking-widest">
              Online Booking
            </Button>
          </a>
        )}
      </div>
    </div>
  );
};
export default WbHomepageCard;
