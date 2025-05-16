import {
  WbContentWrapper,
  WbPageSidebar,
  WbPageTopBanner,
  WbPageWrapper,
} from '@/components';
import { Button } from '@/components/ui/button';
import { images, titles } from '@/constants';
import { setNewsEventsAll } from '@/features/newsEventsSlice';
import { useAppSelector } from '@/hooks';
import { RootState } from '@/store';
import { NewsEventsProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { Store } from '@reduxjs/toolkit';
import { X } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';

const WbNewsEvents = () => {
  document.title = `News & Events | ${titles.services}`;
  const { newsEventsAll }: { newsEventsAll: NewsEventsProps[] | null } =
    useAppSelector((store) => store.newsEvents);
  const [newsYear, setNewsYear] = useState<string | null>(null);
  const [yearData, setYearData] = useState<NewsEventsProps[] | null>(null);

  const years = Array.from(
    new Set(newsEventsAll?.map((item) => item.event_year))
  ).sort((a, b) => parseInt(b as string) - parseInt(a as string));

  useEffect(() => {
    const newSet = newsEventsAll?.filter(
      (item) => item.event_year.toString() === newsYear?.toString()
    );
    setYearData(newSet ?? null);
  }, []);

  useEffect(() => {
    const newSet = newsEventsAll?.filter(
      (item) => item.event_year.toString() === newsYear
    );
    setYearData(newSet ?? null);
  }, [newsYear]);
  console.log(yearData);

  return (
    <>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="News & Events" />
        <WbContentWrapper title="News & Events">
          {!newsYear ? (
            <div className="grid grid-cols-2 md:grid-cols-5 grid-flow-row gap-4">
              {years.map((year) => (
                <div
                  key={nanoid()}
                  className="col-span-1 flex justify-center items-center text-center text-sky-foreground font-medium text-xl tracking-wider uppercase bg-sky/10 p-6 hover:bg-sky/20 duration-200 cursor-pointer"
                  onClick={() => setNewsYear(year.toString())}
                >
                  {year}
                </div>
              ))}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-5 md:grid-cols-3 grid-flow-row gap-0 md:gap-4">
                <div className="col-span-3">
                  <select
                    className="cs-select"
                    value={newsYear}
                    onChange={(e) => setNewsYear(e.target.value)}
                  >
                    <option value={''}>All</option>
                    {years.map((year) => (
                      <option key={nanoid()} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-span-2">
                  <Button
                    variant={'ghost'}
                    size="icon"
                    title="Clear filter"
                    aria-label="Clear filter"
                    onClick={() => setNewsYear(null)}
                  >
                    <X className="text-red-500" />
                  </Button>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
                {(yearData as NewsEventsProps[]).map((item) => (
                  <a
                    href={titles.baseUrl + item.file_path}
                    target="_blank"
                    download={item.title}
                    key={nanoid()}
                  >
                    <div className="flex gap-4 justify-start items-center p-4 bg-sky/10 hover:bg-sky/20">
                      <img
                        src={images.attachBg}
                        alt={item.title}
                        className="size-10"
                      />
                      <p className="text-sm">{item.title}</p>
                    </div>
                  </a>
                ))}
              </div>
            </>
          )}
        </WbContentWrapper>
      </WbPageWrapper>
    </>
  );
};
export default WbNewsEvents;

// ----------------------------------------

export const loader = (store: Store<RootState>) => async () => {
  try {
    const response = await customFetch.get(`/services/news-events`);
    const result = response.data.news;
    store.dispatch(setNewsEventsAll(result));
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
