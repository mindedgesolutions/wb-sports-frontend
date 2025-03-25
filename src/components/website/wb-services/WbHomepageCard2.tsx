import { Link } from 'react-router-dom';

type WbHomepageCard2Props = {
  title: string;
  content: string;
  href: string;
  abbrev?: string;
};

const WbHomepageCard2 = ({
  title,
  content,
  href,
  abbrev,
}: WbHomepageCard2Props) => {
  const fontsize = title.length > 20 ? 'text-lg' : 'text-2xl';
  return (
    <div className="w-full flex flex-row justify-start items-stretch h-full">
      <div className="w-28 bg-sky-muted rounded-tl-lg rounded-bl-lg overflow-hidden flex justify-center items-center">
        <span className="font-oswald text-4xl text-sky-foreground">
          {abbrev}
        </span>
      </div>
      <div className="flex flex-col w-full">
        <div className="bg-sky rounded-lg rounded-l-none rounded-br-none p-2 px-4">
          <span className={`text-white font-oswald tracking-wider ${fontsize}`}>
            {title}
          </span>
        </div>
        <div className="bg-sky-foreground rounded-lg rounded-l-none rounded-tr-none p-2 px-4">
          <Link to={href} className="text-white hover:text-sky-muted">
            {content}
          </Link>
        </div>
      </div>
    </div>
  );
};
export default WbHomepageCard2;
