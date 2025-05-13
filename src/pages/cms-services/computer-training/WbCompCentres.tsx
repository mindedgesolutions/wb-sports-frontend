import {
  AppContentWrapper,
  AppCountWrapper,
  AppMainWrapper,
  AppTooltip,
  WbcAddEditCompCentre,
  WbcCompCentrePopover,
  WbcCompCentresFilter,
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
import { setCompCentres } from '@/features/compCourseSlice';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { CompCentreProps, MetaProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { serialNo } from '@/utils/function';
import showError from '@/utils/showError';
import showSuccess from '@/utils/showSuccess';
import { nanoid } from 'nanoid';
import { EyeIcon, Mail, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const WbCompCentres = () => {
  document.title = `Computer Training: Training Centres | ${titles.services}`;

  const [isLoading, setIsLoading] = useState(false);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [data, setData] = useState<CompCentreProps[] | null>(null);
  const { srCounter } = useAppSelector((state) => state.common);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get('page') || 1;
  const dist = queryString.get('dist');
  const cat = queryString.get('cat');
  const s = queryString.get('s');
  const dispatch = useAppDispatch();

  // ----------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get(`/comp-centres`, {
        params: { page, dist, cat, s },
      });

      if (response.status === 200) {
        setData(response?.data?.data);
        setMeta({
          ...meta,
          currentPage: response?.data?.current_page,
          lastPage: response?.data?.last_page,
          total: response?.data?.total,
        });
        dispatch(setCompCentres(response?.data?.data));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------

  const handleActive = (id: number) => async (checked: boolean) => {
    setIsLoading(true);
    try {
      await customFetch.put(`/comp-centres/activate/${id}`, {
        is_active: checked,
      });
      const msg = checked
        ? 'Training centre activated'
        : 'Training centre deactivated';
      showSuccess(msg);
      dispatch(updateSrCounter());
    } catch (error) {
      showError(`Something went wrong`);
    } finally {
      setIsLoading(false);
    }
  };

  // ----------------------

  useEffect(() => {
    fetchData();
  }, [srCounter, page, dist, cat, s]);

  return (
    <AppMainWrapper>
      <div className="bg-muted-foreground/10 p-2 md:pl-4 text-muted-foreground font-medium capitalize text-base md:text-xl tracking-normal md:tracking-wider flex justify-between items-center">
        <p>computer training: training centres</p>
        <WbcAddEditCompCentre />
      </div>
      <AppCountWrapper total={meta.total || 0} />
      <WbcCompCentresFilter />
      <AppContentWrapper>
        <div className="flex md:flex-row flex-col-reverse justify-start items-start gap-4">
          <Table className="text-xs md:text-xs">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>District</TableHead>
                <TableHead>YCTC Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Centre Incharge</TableHead>
                <TableHead>Centre Owner</TableHead>
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
                data?.map((centre: CompCentreProps, index: number) => {
                  const addressLabel = `${centre.address_line_1}, 
                  ${centre.address_line_2 ? centre.address_line_2 + ', ' : ''}
                  ${centre.address_line_3 ? centre.address_line_3 + ', ' : ''}
                  ${centre.city ? centre.city + ', ' : ''}
                  ${centre.pincode ? centre.pincode : ''}`;

                  return (
                    <TableRow
                      key={nanoid()}
                      className="text-muted-foreground group"
                    >
                      <TableCell className="font-medium">
                        {serialNo(Number(meta.currentPage), 10) + index}.
                      </TableCell>
                      <TableCell className="capitalize">
                        {centre.district.name}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col justify-start items-start">
                          <AppTooltip content={centre.yctc_name} />
                          <span className="text-xs uppercase mt-1.5 font-normal text-muted-foreground">
                            code:{' '}
                            {centre.yctc_code || <span className="na">NA</span>}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="capitalize">
                        {centre.center_category || <p className="na">NA</p>}
                      </TableCell>
                      <TableCell className="flex justify-between items-center max-w-[240px]">
                        <AppTooltip content={addressLabel} />
                        <WbcCompCentrePopover
                          {...{
                            address1: centre.address_line_1 as string,
                            address2: centre.address_line_2 as
                              | string
                              | undefined,
                            address3: centre.address_line_3 as
                              | string
                              | undefined,
                            city: centre.city as string | undefined,
                            pincode: centre.pincode as string | undefined,
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col justify-start items-start">
                          {centre.center_incharge_name && (
                            <span className="flex justify-start items-center text-xs uppercase mt-1 font-normal text-muted-foreground">
                              <User className="h-3.5" />
                              <AppTooltip
                                content={centre.center_incharge_name || `NA`}
                              />
                            </span>
                          )}
                          {centre.center_incharge_mobile && (
                            <span className="flex justify-start items-center text-xs uppercase mt-1 font-normal text-muted-foreground">
                              <Phone className="h-3" />{' '}
                              {centre.center_incharge_mobile}
                            </span>
                          )}
                          {centre.center_incharge_email && (
                            <span className="flex justify-start items-center text-xs lowercase mt-1 font-normal text-muted-foreground">
                              <Mail className="h-3" />{' '}
                              {centre.center_incharge_email}
                            </span>
                          )}
                          {!centre.center_incharge_name &&
                            !centre.center_incharge_mobile &&
                            !centre.center_incharge_email && (
                              <p className="na">NA</p>
                            )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col justify-start items-start">
                          {centre.center_owner_name && (
                            <span className="flex justify-start items-center text-xs uppercase mt-1 font-normal text-muted-foreground">
                              <User className="h-3.5" />
                              <AppTooltip
                                content={centre.center_owner_name || `NA`}
                              />
                            </span>
                          )}
                          {centre.center_owner_mobile && (
                            <span className="flex justify-start items-center text-xs uppercase mt-1 font-normal text-muted-foreground">
                              <Phone className="h-3" />{' '}
                              {centre.center_owner_mobile}
                            </span>
                          )}
                          {!centre.center_owner_name &&
                            !centre.center_owner_mobile && (
                              <p className="na">NA</p>
                            )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Switch
                          className="data-[state=checked]:bg-sky cursor-pointer"
                          checked={centre.is_active}
                          onCheckedChange={handleActive(centre.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <Link
                            to={`${titles.websiteBaseUrl}/${titles.serviceUrlWeb}/computer-training`}
                          >
                            <EyeIcon className="h-4 text-blue-500 duration-200 cursor-pointer" />
                          </Link>
                          <WbcAddEditCompCentre editId={centre.id} />
                          <WbcDeleteModal
                            apiUrl={`/comp-centres/${centre.id}`}
                            description="The centre will be permanently deleted."
                            setIsLoading={setIsLoading}
                            successMsg="Centre deleted successfully"
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
export default WbCompCentres;
