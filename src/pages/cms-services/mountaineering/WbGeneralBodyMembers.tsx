import {
  AppContentWrapper,
  AppCountWrapper,
  AppMainWrapper,
  AppTitleWrapper,
  AppTooltip,
  WbcAddEditCompSyllabus,
  WbcAddEditGbMembers,
  WbcDeleteSyllabus,
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
import { images, titles } from '@/constants';
import { MetaProps } from '@/types/contents';
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { serialNo } from '@/utils/function';
import dayjs from 'dayjs';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';
import { EyeIcon, Pencil } from 'lucide-react';

const WbGeneralBodyMembers = () => {
  document.title = `Mountaineering: General Body Members | ${titles.services} `;

  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [data, setData] = useState<any[] | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  return (
    <AppMainWrapper>
      <AppTitleWrapper>Mountaineering: General Body Members</AppTitleWrapper>
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
                  data?.map((syllabus: any, index: number) => {
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
            <WbcAddEditGbMembers editId={editId} setEditId={setEditId} />
          </div>
        </div>
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbGeneralBodyMembers;
