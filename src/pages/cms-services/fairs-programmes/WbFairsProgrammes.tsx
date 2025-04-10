import {
  AppContentWrapper,
  AppCountWrapper,
  AppMainWrapper,
  AppTooltip,
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
import { FairProgrammeProps, MetaProps } from '@/types/contents';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { serialNo } from '@/utils/function';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { EyeIcon, Pencil } from 'lucide-react';
import customFetch from '@/utils/customFetch';
import { useAppSelector } from '@/hooks';
import { Button } from '@/components/ui/button';

const WbFairsProgrammes = () => {
  document.title = `Fairs & Programmes | ${titles.services} `;

  const { currentUser } = useAppSelector((state) => state.currentUser);
  const slug = currentUser?.user_details?.slug;
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [data, setData] = useState<FairProgrammeProps[] | null>(null);

  // -------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/fair-programme/list`);

      if (response.status === 200) {
        setData(response.data.data);
        setMeta({
          currentPage: response.data.meta.current_page,
          lastPage: response.data.meta.last_page,
          total: response.data.meta.total,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // --------------------------------

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <AppMainWrapper>
      <div className="bg-muted-foreground/10 p-2 md:pl-4 text-muted-foreground font-medium capitalize text-base md:text-xl tracking-normal md:tracking-wider flex justify-between items-center">
        <p>
          list <span className="lowercase">of</span> fairs & programmes
        </p>
        <Link to={`/${titles.servicesUrl}/${slug}/fairs-programmes/update`}>
          <Button size={'sm'} className="cs-btn-primary">
            Add details
          </Button>
        </Link>
      </div>
      <AppCountWrapper total={meta.total || 0} />
      <AppContentWrapper>
        <div className="flex md:flex-row flex-col-reverse justify-start items-start gap-4">
          <Table className="text-xs md:text-xs">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Occurance</TableHead>
                <TableHead>Galleries</TableHead>
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
                data?.map((fairprogram: FairProgrammeProps, index: number) => {
                  const view = `${titles.websiteBaseUrl}/${titles.serviceUrlWeb}/mountaineering`;

                  return (
                    <TableRow
                      key={nanoid()}
                      className="text-muted-foreground group"
                    >
                      <TableCell className="font-medium">
                        {serialNo(Number(meta.currentPage), 10) + index}.
                      </TableCell>
                      <TableCell className="uppercase">
                        <AppTooltip content={fairprogram.title} />
                      </TableCell>
                      <TableCell className="uppercase">
                        {fairprogram.occurance}
                      </TableCell>
                      <TableCell>0</TableCell>
                      <TableCell>
                        {dayjs(fairprogram.updated_at).format(
                          'DD/MM/YYYY h:mm A'
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <Link to={view}>
                            <EyeIcon className="h-4 text-blue-500 duration-200 cursor-pointer" />
                          </Link>
                          <Link
                            to={`/${titles.servicesUrl}/${slug}/fairs-programmes/update/${fairprogram.uuid}`}
                          >
                            <Pencil className="h-4 text-yellow-500 duration-200 cursor-pointer" />
                          </Link>
                          <WbcDeleteModal
                            setIsLoading={setIsLoading}
                            apiUrl={`/mountain/general-body/delete/${fairprogram.id}`}
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
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbFairsProgrammes;
