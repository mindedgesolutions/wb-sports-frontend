import { images, titles } from '@/constants';

const SpFooter = () => {
  return (
    <>
      <div className="bg-success-foreground p-2 md:p-2.5 flex flex-col md:flex-row gap-4 md:gap-0 justify-between items-center">
        <span className="flex flex-row justify-start md:justify-center items-center px-2 gap-2 text-card text-sm">
          <img
            src={images.biswaBangla}
            alt={titles.sportsShort}
            className="h-6"
          />
          &copy; {new Date().getFullYear()} {titles.sports}
        </span>
        <span className="flex flex-row justify-start md:justify-center items-center gap-2 text-card text-sm">
          <p>Designed, developed and powered by </p>
          <img
            src={images.nicLogo}
            alt="National Informatics Centre"
            className="h-4"
          />
        </span>
      </div>
    </>
  );
};
export default SpFooter;
