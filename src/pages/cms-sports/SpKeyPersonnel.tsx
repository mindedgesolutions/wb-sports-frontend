import { images, titles } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { KeyPersonnelProps, MetaProps } from '@/types/contents';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AppContentWrapper,
  AppMainWrapper,
  AppTitleWrapper,
  AppTooltip,
  SpAddEditKeyPersonnel,
  SpCountWrapper,
  WbcDeleteModal,
  WbcPaginationContainer,
  WbcSkeletonRows,
} from '@/components';
import customFetch from '@/utils/customFetch';
import { setKeyPersonnel } from '@/features/sports/spKeyPersonnelSlice';
import showSuccess from '@/utils/showSuccess';
import { updateSpCounter } from '@/features/commonSlice';
import { nanoid } from 'nanoid';
import { serialNo } from '@/utils/function';
import dayjs from 'dayjs';
import { Switch } from '@/components/ui/switch';
import { EyeIcon } from 'lucide-react';

const SpKeyPersonnel = () => {
  document.title = `Key Personnel | ${titles.sports}`;

  const [data, setData] = useState<KeyPersonnelProps[] | null>(null);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const { spCounter } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();
  const [editId, setEditId] = useState<number | null>(null);

  // ------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get('/sports/key-personnel', {
        params: { page: queryString.get('page') },
      });

      if (response.status === 200) {
        setData(response.data.data.data);
        setMeta({
          currentPage: response.data.data.current_page,
          lastPage: response.data.data.last_page,
          total: response.data.data.total,
        });
        dispatch(setKeyPersonnel(response.data.data.data));
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
  }, [queryString.get('page'), spCounter]);

  // ------------------------------
  const handleActive = (id: number) => async (checked: boolean) => {
    setIsLoading(true);
    try {
      await customFetch.put(`/sports/homepage-sliders/activate/${id}`, {
        is_active: checked,
      });
      const msg = checked ? 'Slider activated' : 'Slider deactivated';
      showSuccess(msg);
      dispatch(updateSpCounter());
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppMainWrapper>
      <AppTitleWrapper>
        list <span className="lowercase">of</span> key personnel
      </AppTitleWrapper>
      <SpCountWrapper total={meta.total || 0} />
      <AppContentWrapper>
        <div className="flex md:flex-row flex-col-reverse justify-start items-start gap-4">
          <div className="basis-full w-full md:basis-2/3">
            <Table className="text-xs md:text-xs">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead></TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead>Active</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8}>
                      <WbcSkeletonRows count={10} />
                    </TableCell>
                  </TableRow>
                ) : data?.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={8}
                      className="text-xs uppercase text-center"
                    >
                      NO DATA FOUND
                    </TableCell>
                  </TableRow>
                ) : (
                  data?.map((member: KeyPersonnelProps, index: number) => {
                    const deletemsg =
                      'The key person will be permanently deleted.';

                    return (
                      <TableRow
                        key={nanoid()}
                        className="text-muted-foreground group"
                      >
                        <TableCell className="font-medium">
                          {serialNo(Number(meta.currentPage), 10) + index}.
                        </TableCell>
                        <TableCell>
                          <img
                            src={
                              member.image_path
                                ? `${titles.baseUrl}${member.image_path}`
                                : images.noImg
                            }
                            alt={member.name}
                            className="h-8 md:h-12 object-cover"
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col justify-start items-start gap-1">
                            <span className="uppercase font-medium">
                              <AppTooltip content={member.name} />
                            </span>
                            <span className="italic">
                              <AppTooltip content={member.rank || 'NA'} />
                            </span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <AppTooltip content={member.designation ?? 'NA'} />
                        </TableCell>
                        <TableCell>
                          <AppTooltip content={member.department ?? 'NA'} />
                        </TableCell>
                        <TableCell>
                          {dayjs(member.updated_at).format('DD/MM/YYYY h:mm A')}
                        </TableCell>
                        <TableCell>
                          <Switch
                            className="data-[state=checked]:bg-sky cursor-pointer"
                            checked={member.is_active}
                            onCheckedChange={handleActive(member.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-row justify-center items-center gap-2">
                            <Link
                              to={titles.websiteBaseUrl + member.image_path}
                            >
                              <EyeIcon className="h-4 text-blue-500 duration-200 cursor-pointer" />
                            </Link>
                            <WbcDeleteModal
                              apiUrl={`/sports/homepage-sliders/${member.id}`}
                              description={deletemsg}
                              successMsg="Slider deleted successfully"
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
            <SpAddEditKeyPersonnel editId={editId} setEditId={setEditId} />
          </div>
        </div>
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default SpKeyPersonnel;
