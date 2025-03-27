import {
  AppContentWrapper,
  AppCountWrapper,
  AppMainWrapper,
  AppTooltip,
  WbcAddEditCourseDetails,
  WbcDeleteCompCourse,
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
import { setCourses } from '@/features/compCourseSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { ComputerCourseProps, MetaProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { currencyFormat, serialNo } from '@/utils/function';
import showSuccess from '@/utils/showSuccess';
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { EyeIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const WbCompCourseDetails = () => {
  document.title = `Computer Training: Course Details | ${titles.services}`;

  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [data, setData] = useState<ComputerCourseProps[] | null>(null);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get('page') || 1;
  const dispatch = useAppDispatch();
  const { srCounter } = useAppSelector((state) => state.common);

  // ----------------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get('com-training-courses', {
        params: { page },
      });

      if (response.status === 200) {
        setData(response.data.courses.data);
        dispatch(setCourses(response.data.courses.data));
        setMeta({
          currentPage: response.data.courses.current_page,
          lastPage: response.data.courses.last_page,
          total: response.data.courses.total,
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------------------------

  useEffect(() => {
    fetchData();
  }, [page, srCounter]);

  // ----------------------------------------

  const handleActive = (id: number) => async (checked: boolean) => {
    setIsLoading(true);
    try {
      await customFetch.put(`com-training-courses/activate/${id}`, {
        is_active: checked,
      });
      const msg = checked ? 'Course published' : 'Banner removed from website';
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
      <div className="bg-muted-foreground/10 p-2 pl-4 text-muted-foreground font-medium capitalize text-xl tracking-wider flex justify-between items-center">
        <p>computer training: course details</p>
        <WbcAddEditCourseDetails />
      </div>
      <AppCountWrapper total={meta.total || 0} />
      <AppContentWrapper>
        <div className="flex md:flex-row flex-col-reverse justify-start items-start gap-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Eligibility</TableHead>
                <TableHead>Fees</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Active</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={9}>
                    <WbcSkeletonRows count={10} />
                  </TableCell>
                </TableRow>
              ) : data?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={9}
                    className="text-xs uppercase text-center"
                  >
                    NO DATA FOUND
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((course: ComputerCourseProps, index: number) => {
                  return (
                    <TableRow
                      key={nanoid()}
                      className="text-muted-foreground group"
                    >
                      <TableCell className="font-medium">
                        {serialNo(Number(meta.currentPage), 10) + index}.
                      </TableCell>
                      <TableCell className="capitalize">
                        {course.course_type}
                      </TableCell>
                      <TableCell>
                        <AppTooltip content={course.course_name} />
                      </TableCell>
                      <TableCell>{course.course_duration}</TableCell>
                      <TableCell>
                        <AppTooltip content={course.course_eligibility} />
                      </TableCell>
                      <TableCell>
                        {currencyFormat().format(course.course_fees)}
                      </TableCell>
                      <TableCell>
                        {dayjs(course.updated_at).format('DD/MM/YYYY h:mm A')}
                      </TableCell>
                      <TableCell>
                        <Switch
                          className="data-[state=checked]:bg-muted-foreground group-hover:data-[state=checked]:bg-sky cursor-pointer"
                          checked={course.is_active}
                          onCheckedChange={handleActive(course.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <Link
                            to={`${titles.websiteBaseUrl}/${titles.serviceUrlWeb}/computer-training`}
                          >
                            <EyeIcon className="h-4 group-hover:text-blue-500 duration-200 cursor-pointer" />
                          </Link>
                          <WbcAddEditCourseDetails editId={course.id} />
                          <WbcDeleteCompCourse
                            id={course.id}
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
        </div>
        {meta?.total
          ? meta?.total > 10 && (
              <WbcPaginationContainer
                currentPage={meta.currentPage!}
                totalPages={meta.lastPage!}
              />
            )
          : null}
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbCompCourseDetails;
