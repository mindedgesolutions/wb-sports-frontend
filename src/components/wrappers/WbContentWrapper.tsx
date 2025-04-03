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
        {children}
      </div>
    </div>
  );
};
export default WbContentWrapper;
