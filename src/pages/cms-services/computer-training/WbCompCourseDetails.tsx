import {
  AppContentWrapper,
  AppMainWrapper,
  AppTooltip,
  WbcAddEditCourseDetails,
  WbcDeleteBanner,
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
import { MetaProps } from '@/types/contents';
import { serialNo } from '@/utils/function';
import { nanoid } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { EyeIcon, Pencil } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const WbCompCourseDetails = () => {
  document.title = `Computer Training: Course Details | ${titles.services}`;

  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [data, setData] = useState<any[] | null>(null);

  return (
    <AppMainWrapper>
      <div className="bg-muted-foreground/10 p-2 pl-4 text-muted-foreground font-medium capitalize text-xl tracking-wider flex justify-between items-center">
        <p>computer training: course details</p>
        <WbcAddEditCourseDetails />
      </div>
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
                data?.map((banner: any, index: number) => {
                  return (
                    <TableRow
                      key={nanoid()}
                      className="text-muted-foreground group"
                    >
                      <TableCell className="font-medium">
                        {serialNo(Number(meta.currentPage), 10) + index}.
                      </TableCell>
                      <TableCell className="w-[100px]">
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
                          className="data-[state=checked]:bg-sky cursor-pointer"
                          checked={banner.is_active}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <Link to={titles.websiteBaseUrl + banner.page_url}>
                            <EyeIcon className="h-4 group-hover:text-blue-500 duration-200 cursor-pointer" />
                          </Link>
                          <Pencil className="h-4 group-hover:text-yellow-500 duration-200 cursor-pointer" />
                          <WbcDeleteBanner
                            id={banner.id}
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
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbCompCourseDetails;
