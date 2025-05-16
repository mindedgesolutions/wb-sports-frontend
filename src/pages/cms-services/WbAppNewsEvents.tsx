import {
  AppContentWrapper,
  AppCountWrapper,
  AppMainWrapper,
  AppTitleWrapper,
  AppTooltip,
  WbcAddEditNewsEvents,
  WbcDeleteModal,
  WbcPaginationContainer,
  WbcSkeletonRows,
} from '@/components';
import { Switch } from '@/components/ui/switch';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { images, titles } from '@/constants';
import { updateSrCounter } from '@/features/commonSlice';
import { setNewsEvents } from '@/features/newsEventsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { MetaProps, NewsEventsProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { serialNo } from '@/utils/function';
import showSuccess from '@/utils/showSuccess';
import dayjs from 'dayjs';
import { Pencil } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const WbAppNewsEvents = () => {
  document.title = `News & Events | ${titles.services}`;

  const [data, setData] = useState<NewsEventsProps[] | null>(null);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { srCounter } = useAppSelector((state) => state.common);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get('page');
  const [editId, setEditId] = useState<number | null>(null);

  // ---------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/news-events`, {
        params: { page },
      });

      if (response.status === 200) {
        setData(response.data.data.data);
        setMeta({
          currentPage: response.data.data.current_page,
          lastPage: response.data.data.last_page,
          total: response.data.data.total,
        });
        dispatch(setNewsEvents(response.data.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------------

  useEffect(() => {
    fetchData();
  }, [page, srCounter]);

  // ---------------------------------

  const handleActive = (id: number) => async (checked: boolean) => {
    setIsLoading(true);
    try {
      await customFetch.put(`/news-events/activate/${id}`, {
        is_active: checked,
      });
      dispatch(updateSrCounter());
      showSuccess('Status updated successfully');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppMainWrapper>
      <AppTitleWrapper>
        news <span className="lowercase">and</span> events
      </AppTitleWrapper>
      <AppCountWrapper total={meta.total || 0} />
      <AppContentWrapper>
        <div className="flex md:flex-row flex-col-reverse justify-start items-start gap-4">
          <div className="basis-full w-full md:basis-2/3">
            <Table className="text-xs md:text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead></TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Event Date</TableHead>
                  <TableHead>Created On</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={7}>
                      <WbcSkeletonRows count={10} />
                    </TableCell>
                  </TableRow>
                ) : data?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={7}
                      className="text-xs uppercase text-center"
                    >
                      NO DATA FOUND
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map((news: NewsEventsProps, index: number) => {
                    const deletemsg =
                      'The news / event will be permanently deleted';

                    return (
                      <TableRow
                        key={nanoid()}
                        className="text-muted-foreground group"
                      >
                        <TableCell className="font-medium">
                          {serialNo(Number(meta.currentPage), 10) + index}.
                        </TableCell>
                        <TableCell className="w-[100px] md:w-[100px]">
                          <a
                            href={`${import.meta.env.VITE_BASE_URL}${
                              news.file_path
                            }`}
                            target="_blank"
                          >
                            <img
                              src={images.attachBg}
                              alt={news.title}
                              className="h-8"
                            />
                          </a>
                        </TableCell>
                        <TableCell>
                          <AppTooltip content={news.title ?? 'NA'} />
                        </TableCell>
                        <TableCell>
                          {news.event_date
                            ? dayjs(news.event_date).format('DD/MM/YYYY')
                            : null}
                        </TableCell>
                        <TableCell>
                          {dayjs(news.created_at).format('DD/MM/YYYY h:mm A')}
                        </TableCell>
                        <TableCell>
                          <Switch
                            className="data-[state=checked]:bg-sky cursor-pointer"
                            checked={news.is_active}
                            onCheckedChange={handleActive(news.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-row justify-center items-center gap-2">
                            <Pencil
                              className="h-4 text-yellow-500 duration-200 cursor-pointer"
                              onClick={() => setEditId(news.id)}
                            />
                            <WbcDeleteModal
                              apiUrl={`/news-events/${news.id}`}
                              description={deletemsg}
                              successMsg="News / Event deleted successfully"
                              setIsLoading={setIsLoading}
                              title="Are you absolutely sure?"
                            />
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
            {meta?.total
              ? meta?.total > 10 && (
                  <WbcPaginationContainer
                    currentPage={meta.currentPage!}
                    totalPages={meta.lastPage!}
                  />
                )
              : null}
          </div>
          <div className="basis-full w-full md:basis-1/3">
            <WbcAddEditNewsEvents editId={editId} setEditId={setEditId} />
          </div>
        </div>
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbAppNewsEvents;
