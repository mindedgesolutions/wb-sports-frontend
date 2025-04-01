import {
  AppContentWrapper,
  AppCountWrapper,
  AppMainWrapper,
  AppTitleWrapper,
  AppTooltip,
  WbcAddEditBanner,
  WbcDeleteModal,
  WbcPaginationContainer,
  WbcSkeletonRows,
} from '@/components';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { titles } from '@/constants';
import { BannerProps, MetaProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { serialNo } from '@/utils/function';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { EyeIcon, Pencil } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { updateSrCounter } from '@/features/commonSlice';
import showSuccess from '@/utils/showSuccess';
import { setBanners } from '@/features/bannerSlice';

const WbCmsBanners = () => {
  document.title = `Upload Banners | ${titles.services}`;

  const [data, setData] = useState<BannerProps[] | null>(null);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const { srCounter } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState<number | null>(null);

  // ------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get('/banners', {
        params: { page: queryString.get('page') },
      });

      if (response.status === 200) {
        setData(response.data.data.data);
        setMeta({
          currentPage: response.data.data.current_page,
          lastPage: response.data.data.last_page,
          total: response.data.data.total,
        });
        dispatch(setBanners(response.data.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ------------------------------

  useEffect(() => {
    fetchData();
  }, [queryString.get('page'), srCounter]);

  // ------------------------------
  const handleActive = (id: number) => async (checked: boolean) => {
    setIsLoading(true);
    try {
      await customFetch.put(`/banners/activate/${id}`, { is_active: checked });
      const msg = checked ? 'Banner activated' : 'Banner deactivated';
      showSuccess(msg);
      dispatch(updateSrCounter());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppMainWrapper>
      <AppTitleWrapper>upload banner for individual pages</AppTitleWrapper>
      <AppCountWrapper total={meta.total || 0} />
      <AppContentWrapper>
        <div className="flex md:flex-row flex-col-reverse justify-start items-start gap-4">
          <div className="basis-full w-full md:basis-2/3">
            <Table className="text-xs md:text-sm">
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
                  data?.map((banner: BannerProps, index: number) => {
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
                        <TableCell className="w-[100px] md:w-[100px]">
                          <img
                            src={titles.baseUrl + banner.image_path}
                            alt={banner.page_title}
                            className="h-8 object-cover"
                          />
                        </TableCell>
                        <TableCell>
                          <AppTooltip content={banner.page_title} />
                        </TableCell>
                        <TableCell>
                          {dayjs(banner.updated_at).format('DD/MM/YYYY h:mm A')}
                        </TableCell>
                        <TableCell>
                          <Switch
                            className="data-[state=checked]:bg-muted-foreground group-hover:data-[state=checked]:bg-sky cursor-pointer"
                            checked={banner.is_active}
                            onCheckedChange={handleActive(banner.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-row justify-center items-center gap-2">
                            <Link to={titles.websiteBaseUrl + banner.page_url}>
                              <EyeIcon className="h-4 group-hover:text-blue-500 duration-200 cursor-pointer" />
                            </Link>
                            <Pencil
                              className="h-4 group-hover:text-yellow-500 duration-200 cursor-pointer"
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
            <WbcAddEditBanner editId={editId} setEditId={setEditId} />
          </div>
        </div>
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbCmsBanners;
