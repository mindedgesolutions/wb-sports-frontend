import { Separator } from '../ui/separator';

const WbContentWrapper = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="col-span-9 p-3">
      <div className="">
        <h1 className="text-sky-foreground tracking-wider text-lg font-medium">
          {title}
        </h1>
        <Separator className="my-4 bg-sky/20" />
        <div className="flex flex-col gap-4 text-sm md:text-sm tracking-wider leading-relaxed text-justify">
          {children}
        </div>
      </div>
    </div>
  );
};
export default WbContentWrapper;
