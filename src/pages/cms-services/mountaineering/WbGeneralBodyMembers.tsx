import {
  AppContentWrapper,
  AppCountWrapper,
  AppMainWrapper,
  AppTitleWrapper,
  AppTooltip,
  WbcAddEditGbMembers,
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
import { MetaProps, srGbMembersProps } from '@/types/contents';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { serialNo } from '@/utils/function';
import dayjs from 'dayjs';
import { Link, useLocation } from 'react-router-dom';
import { EyeIcon, Pencil } from 'lucide-react';
import customFetch from '@/utils/customFetch';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setGbMembers } from '@/features/mountainSlice';

const WbGeneralBodyMembers = () => {
  document.title = `Mountaineering: General Body Members | ${titles.services} `;

  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [data, setData] = useState<srGbMembersProps[] | null>(null);
  const [editId, setEditId] = useState<number | null>(null);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get('page') || 1;
  const { srCounter } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  // -----------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/mountain/general-body/list`, {
        params: { page },
      });

      if (response.status === 200) {
        setData(response.data.members.data);
        setMeta({
          currentPage: response.data.members.current_page,
          lastPage: response.data.members.last_page,
          total: response.data.members.total,
        });
        dispatch(setGbMembers(response.data.members.data));
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // -----------------------------------

  useEffect(() => {
    fetchData();
  }, [page, srCounter]);

  return (
    <AppMainWrapper>
      <AppTitleWrapper>Mountaineering: General Body Members</AppTitleWrapper>
      <AppCountWrapper total={meta.total || 0} />
      <AppContentWrapper>
        <div className="flex md:flex-row flex-col-reverse justify-start items-start gap-4">
          <div className="basis-full w-full md:basis-2/3">
            <Table className="text-xs md:text-sm">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">#</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Last Updated</TableHead>
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
                  data?.map((gbMember: srGbMembersProps, index: number) => {
                    const view = `${titles.websiteBaseUrl}/${titles.serviceUrlWeb}/mountaineering`;

                    return (
                      <TableRow
                        key={nanoid()}
                        className="text-muted-foreground group"
                      >
                        <TableCell className="font-medium">
                          {serialNo(Number(meta.currentPage), 10) + index}.
                        </TableCell>
                        <TableCell>
                          <AppTooltip content={gbMember.name} />
                        </TableCell>
                        <TableCell>
                          <AppTooltip content={gbMember.designation || 'NA'} />
                        </TableCell>
                        <TableCell>
                          <AppTooltip content={gbMember.description} />
                        </TableCell>
                        <TableCell>
                          {dayjs(gbMember.updated_at).format(
                            'DD/MM/YYYY h:mm A'
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-row justify-center items-center gap-2">
                            <Link to={view}>
                              <EyeIcon className="h-4 group-hover:text-blue-500 duration-200 cursor-pointer" />
                            </Link>
                            <Pencil
                              className="h-4 group-hover:text-yellow-500 duration-200 cursor-pointer"
                              onClick={() => setEditId(gbMember.id)}
                            />
                            <WbcDeleteModal
                              setIsLoading={setIsLoading}
                              apiUrl={`/mountain/general-body/delete/${gbMember.id}`}
                              description="The General Body memeber will be permanently deleted."
                              successMsg="General Body member deleted successfully"
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
