import {
  AppContentWrapper,
  AppCountWrapper,
  AppMainWrapper,
  AppTitleWrapper,
  AppTooltip,
  WbcAddEditBanner,
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
import { titles } from '@/constants';
import { updateSrCounter } from '@/features/commonSlice';
import { setNewsEvents } from '@/features/newsEventsSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { MetaProps, NewsEventsProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { serialNo } from '@/utils/function';
import showSuccess from '@/utils/showSuccess';
import dayjs from 'dayjs';
import { EyeIcon, Pencil } from 'lucide-react';
import { nanoid } from 'nanoid';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

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
  const dist = queryString.get('dist');
  const s = queryString.get('s');
  const [editId, setEditId] = useState<number | null>(null);

  // ---------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get('news-events', {
        params: { page, dist, s },
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
  }, [page, srCounter, dist, s]);

  // ---------------------------------

  const handleActive = (id: number) => async (checked: boolean) => {
    setIsLoading(true);
    try {
      await customFetch.put(`/district-block-offices/activate/${id}`, {
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
                  <TableHead>Page</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={6}>
                      <WbcSkeletonRows count={10} />
                    </TableCell>
                  </TableRow>
                ) : data?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-xs uppercase text-center"
                    >
                      NO DATA FOUND
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map((banner: NewsEventsProps, index: number) => {
                    const deletemsg =
                      'The banner image will be permanently deleted. There is a default banner set for every page. So rest assured, the page will not be left without a banner.';

                    return (
                      <TableRow
                        key={nanoid()}
                        className="text-muted-foreground group"
                      >
                        <TableCell className="font-medium">
                          {serialNo(Number(meta.currentPage), 10) + index}.
                        </TableCell>
                        <TableCell className="w-[100px] md:w-[100px]"></TableCell>
                        <TableCell></TableCell>
                        <TableCell>
                          {dayjs(banner.updated_at).format('DD/MM/YYYY h:mm A')}
                        </TableCell>
                        <TableCell>
                          <Switch
                            className="data-[state=checked]:bg-sky cursor-pointer"
                            checked={banner.is_active}
                            onCheckedChange={handleActive(banner.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-row justify-center items-center gap-2">
                            <Link to={`#`}>
                              <EyeIcon className="h-4 text-blue-500 duration-200 cursor-pointer" />
                            </Link>
                            <Pencil
                              className="h-4 text-yellow-500 duration-200 cursor-pointer"
                              onClick={() => setEditId(banner.id)}
                            />
                            <WbcDeleteModal
                              apiUrl={`/banners/${banner.id}`}
                              description={deletemsg}
                              successMsg="Banner deleted successfully"
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
