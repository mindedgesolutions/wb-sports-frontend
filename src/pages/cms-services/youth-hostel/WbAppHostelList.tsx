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
import { images, titles } from '@/constants';
import { MetaProps, YouthHostelProps } from '@/types/contents';
import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { serialNo } from '@/utils/function';
import { Link, useLocation } from 'react-router-dom';
import { Bus, EyeIcon, Mail, Pencil, Phone, Plane, Train } from 'lucide-react';
import customFetch from '@/utils/customFetch';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { updateSrCounter } from '@/features/commonSlice';

const WbAppHostelList = () => {
  document.title = `Hostel List | ${titles.services} `;

  const { currentUser } = useAppSelector((state) => state.currentUser);
  const slug = currentUser?.user_details?.slug;
  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [data, setData] = useState<YouthHostelProps[] | null>(null);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get('page');
  const { srCounter } = useAppSelector((state) => state.common);
  const dispatch = useAppDispatch();

  // -------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/youth-hostels`, {
        params: { page },
      });

      if (response.status === 200) {
        setData(response.data.data.data);
        setMeta({
          currentPage: response.data.data.current_page,
          lastPage: response.data.data.last_page,
          total: response.data.data.total,
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
  }, [page, srCounter]);

  // --------------------------------

  const handleActive = (id: number) => async (checked: boolean) => {
    setIsLoading(true);
    try {
      const response = await customFetch.put(`youth-hostels/activate/${id}`, {
        is_active: checked,
      });

      if (response.status === 200) {
        dispatch(updateSrCounter());
        showSuccess(`Hostel status updated successfully`);
      }
    } catch (error) {
      return showError(`Something went wrong!`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppMainWrapper>
      <div className="bg-muted-foreground/10 p-2 md:pl-4 text-muted-foreground font-medium capitalize text-base md:text-xl tracking-normal md:tracking-wider flex justify-between items-center">
        <p>
          list <span className="lowercase">of</span> youth hostels
        </p>
        <Link to={`/${titles.servicesUrl}/${slug}/youth-hostels/update`}>
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
                <TableHead>Address</TableHead>
                <TableHead>Contact Info</TableHead>
                <TableHead>Accommodation</TableHead>
                <TableHead>Transportation</TableHead>
                <TableHead>How to Reach</TableHead>
                <TableHead>Active</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={10}>
                    <WbcSkeletonRows count={10} />
                  </TableCell>
                </TableRow>
              ) : data?.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={10}
                    className="text-xs uppercase text-center"
                  >
                    NO DATA FOUND
                  </TableCell>
                </TableRow>
              ) : (
                data?.map((hostel: YouthHostelProps, index: number) => {
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
                        <div className="flex flex-row justify-start items-center gap-2">
                          <img
                            src={
                              hostel.hostel_img
                                ? `${titles.baseUrl}${hostel.hostel_img}`
                                : images.hostelDefault
                            }
                            alt={hostel.name}
                            className="h-10 w-auto max-w-10 rounded-xs object-cover"
                          />
                          <AppTooltip content={hostel.name} />
                        </div>
                      </TableCell>
                      <TableCell>
                        <AppTooltip content={hostel.address} />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col justify-start items-start gap-1">
                          {hostel.phone_1 && (
                            <div className="flex flex-row justify-start items-center gap-2">
                              <Phone className="size-3.5" />
                              <p>{hostel.phone_1 ?? 'NA'}</p>
                            </div>
                          )}
                          {hostel.phone_2 && (
                            <div className="flex flex-row justify-start items-center gap-2">
                              <Phone className="size-3.5" />
                              <p>{hostel.phone_2 ?? 'NA'}</p>
                            </div>
                          )}
                          {hostel.email && (
                            <div className="flex flex-row justify-start items-center gap-2">
                              <Mail className="size-3.5" />
                              <AppTooltip content={hostel.email ?? 'NA'} />
                            </div>
                          )}
                          {!hostel.phone_1 &&
                            !hostel.phone_2 &&
                            !hostel.email && <p className="na">NA</p>}
                        </div>
                      </TableCell>
                      <TableCell>
                        {!hostel.accommodation ? (
                          <p className="na">NA</p>
                        ) : (
                          <ol className="list-disc list-inside">
                            {hostel.accommodation?.split(',').map((item) => (
                              <li key={nanoid()}>
                                <AppTooltip content={item} />
                              </li>
                            ))}
                          </ol>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col justify-start items-start gap-1">
                          {hostel.railway_station && (
                            <div className="flex flex-row justify-start items-center gap-2">
                              <Train className="size-3.5" />
                              <AppTooltip content={hostel.railway_station} />
                            </div>
                          )}
                          {hostel.bus_stop && (
                            <div className="flex flex-row justify-start items-center gap-2">
                              <Bus className="size-3.5" />
                              <p>{hostel.bus_stop ?? 'NA'}</p>
                            </div>
                          )}
                          {hostel.airport && (
                            <div className="flex flex-row justify-start items-center gap-2">
                              <Plane className="size-3.5" />
                              <AppTooltip content={hostel.airport ?? 'NA'} />
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <AppTooltip content={hostel.how_to_reach ?? 'NA'} />
                      </TableCell>
                      <TableCell>
                        <Switch
                          className="data-[state=checked]:bg-sky cursor-pointer"
                          checked={hostel.is_active}
                          onCheckedChange={handleActive(hostel.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <Link to={view}>
                            <EyeIcon className="h-4 text-blue-500 duration-200 cursor-pointer" />
                          </Link>
                          <Link
                            to={`/${titles.servicesUrl}/${slug}/youth-hostels/update/${hostel.uuid}`}
                          >
                            <Pencil className="h-4 text-yellow-500 duration-200 cursor-pointer" />
                          </Link>
                          <WbcDeleteModal
                            setIsLoading={setIsLoading}
                            apiUrl={`/youth-hostels/${hostel.id}`}
                            description="Youth hostel details will be permanently deleted."
                            successMsg="Youth hostel details deleted successfully"
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
export default WbAppHostelList;
