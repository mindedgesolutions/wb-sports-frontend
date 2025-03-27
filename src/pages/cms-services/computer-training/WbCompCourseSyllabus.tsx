import {
  AppContentWrapper,
  AppCountWrapper,
  AppMainWrapper,
  AppTitleWrapper,
  AppTooltip,
  WbcAddEditCompSyllabus,
  WbcDeleteSyllabus,
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
import { setSyllabi } from '@/features/compCourseSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { CompSyllabusProps, MetaProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { handleDownload, serialNo } from '@/utils/function';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { EyeIcon, Pencil } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const WbCompCourseSyllabus = () => {
  document.title = `Computer Training: Course Syllabus | ${titles.services} `;

  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [data, setData] = useState<CompSyllabusProps[] | null>(null);
  const dispatch = useAppDispatch();
  const { srCounter } = useAppSelector((state) => state.common);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get('page') || 1;
  const [editId, setEditId] = useState<number | null>(null);

  // ------------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/comp-syllabus`, {
        params: { page: page },
      });

      if (response.status === 200) {
        setData(response?.data?.data?.data);
        setMeta({
          ...meta,
          currentPage: response?.data?.data?.current_page,
          lastPage: response?.data?.data?.last_page,
          total: response?.data?.data?.total,
        });
        dispatch(setSyllabi(response?.data?.data?.data));
      }
    } catch (error) {
      return showError(`Something went wrong!`);
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------

  useEffect(() => {
    fetchData();
  }, [srCounter, page]);

  // --------------------------------

  const handleActive = (id: number) => async (checked: boolean) => {
    setIsLoading(true);
    try {
      await customFetch.put(`/comp-syllabus/activate/${id}`, {
        is_active: checked,
      });
      const msg = checked ? 'Syllabus activated' : 'Syllabus deactivated';
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
      <AppTitleWrapper>Computer Training: Course Syllabus</AppTitleWrapper>
      <AppCountWrapper total={meta.total || 0} />
      <AppContentWrapper>
        <div className="flex md:flex-row flex-col-reverse justify-start items-start gap-4">
          <div className="basis-full md:basis-2/3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead></TableHead>
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
                  data?.map((syllabus: CompSyllabusProps, index: number) => {
                    return (
                      <TableRow
                        key={nanoid()}
                        className="text-muted-foreground group"
                      >
                        <TableCell className="font-medium">
                          {serialNo(Number(meta.currentPage), 10) + index}.
                        </TableCell>
                        <TableCell>
                          <AppTooltip content={syllabus.name} />
                        </TableCell>
                        <TableCell>
                          <img
                            src={images.pdfIcon}
                            alt={titles.services}
                            className="h-8 cursor-pointer"
                            onClick={() =>
                              handleDownload({
                                filePath: syllabus.file_path,
                                fileName: syllabus.name,
                              })
                            }
                          />
                        </TableCell>
                        <TableCell>
                          {dayjs(syllabus.updated_at).format(
                            'DD/MM/YYYY h:mm A'
                          )}
                        </TableCell>
                        <TableCell>
                          <Switch
                            className="data-[state=checked]:bg-muted-foreground group-hover:data-[state=checked]:bg-sky cursor-pointer"
                            checked={syllabus.is_active}
                            onCheckedChange={handleActive(syllabus.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-row justify-center items-center gap-2">
                            <Link to={titles.websiteBaseUrl}>
                              <EyeIcon className="h-4 group-hover:text-blue-500 duration-200 cursor-pointer" />
                            </Link>
                            <Pencil
                              className="h-4 group-hover:text-yellow-500 duration-200 cursor-pointer"
                              onClick={() => setEditId(syllabus.id)}
                            />
                            <WbcDeleteSyllabus
                              id={syllabus.id}
                              setIsLoading={setIsLoading}
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
            <WbcAddEditCompSyllabus editId={editId} setEditId={setEditId} />
          </div>
        </div>
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbCompCourseSyllabus;
