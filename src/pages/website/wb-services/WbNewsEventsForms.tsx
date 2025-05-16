import { WbPageSidebar, WbPageTopBanner, WbPageWrapper } from '@/components';
import { Separator } from '@/components/ui/separator';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from 'react-router-dom';
import { titles } from '@/constants';

const WbNewsEventsForms = () => {
  return (
    <>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="News & Events" />
        <div className="col-span-1 w-full md:col-span-9 p-3">
          <div className="">
            <h1 className="text-sky-foreground tracking-wider text-lg font-medium">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="text-sky-foreground/70 tracking-wider text-base md:text-lg font-medium hover:text-sky-foreground/50">
                    <Link to={`/${titles.serviceUrlWeb}/news-events`}>
                      News & Events
                    </Link>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem className="text-sky-foreground tracking-wider text-base md:text-lg font-medium">
                    Forms
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </h1>
            <Separator className="my-4 bg-sky/20" />
            <div className="flex flex-col gap-8 text-sm md:text-base tracking-wider leading-relaxed text-justify"></div>
          </div>
        </div>
      </WbPageWrapper>
    </>
  );
};
export default WbNewsEventsForms;
