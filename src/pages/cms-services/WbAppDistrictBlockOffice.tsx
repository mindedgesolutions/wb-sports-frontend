import {
  AppContentWrapper,
  AppCountWrapper,
  AppMainWrapper,
  AppTooltip,
  WbcAddEditDistrictBlockOffice,
  WbcDeleteModal,
  WbcDistrictBlockOfficePopover,
  WbcDistrictOfficeFilter,
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
import { DistrictBlockOfficeProps, MetaProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { serialNo } from '@/utils/function';
import { nanoid } from '@reduxjs/toolkit';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import dayjs from 'dayjs';
import { EyeIcon, Mail, Phone } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { setDistrictBlockOffices } from '@/features/districtBlockOfficeSlice';
import showSuccess from '@/utils/showSuccess';
import { updateSrCounter } from '@/features/commonSlice';

const WbAppDistrictBlockOffice = () => {
  document.title = `District / Block Offices | ${titles.services}`;

  const [data, setData] = useState<DistrictBlockOfficeProps[] | null>(null);
  const [meta, setMeta] = useState<MetaProps>({
    currentPage: null,
    lastPage: null,
    total: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const { srCounter } = useAppSelector((state) => state.common);
  const { search } = useLocation();
  const queryString = new URLSearchParams(search);
  const page = queryString.get('page');
  const dist = queryString.get('dist');
  const s = queryString.get('s');

  // ---------------------------------

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await customFetch.get('district-block-offices', {
        params: { page, dist, s },
      });

      if (response.status === 200) {
        setData(response.data.data.data);
        setMeta({
          currentPage: response.data.data.current_page,
          lastPage: response.data.data.last_page,
          total: response.data.data.total,
        });
        dispatch(setDistrictBlockOffices(response.data.data.data));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  // ---------------------------------

  useEffect(() => {
    fetchData();
  }, [page, srCounter, dist, s]);

  // ---------------------------------

  const handleActive = (id: number) => async (checked: boolean) => {
    setIsLoading(true);
    try {
      await customFetch.put(`/district-block-offices/activate/${id}`, {
        is_active: checked,
      });
      dispatch(updateSrCounter());
      showSuccess('Status updated successfully');
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppMainWrapper>
      <div className="bg-muted-foreground/10 p-2 md:pl-4 text-muted-foreground font-medium capitalize text-base md:text-xl tracking-normal md:tracking-wider flex justify-between items-center">
        <p>
          list <span className="lowercase">of</span> district / block offices
        </p>
        <WbcAddEditDistrictBlockOffice />
      </div>
      <AppCountWrapper total={meta.total || 0} />
      <WbcDistrictOfficeFilter />
      <AppContentWrapper>
        <div className="flex md:flex-row flex-col-reverse justify-start items-start gap-4">
          <Table className="text-xs md:text-xs">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">#</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Landline No. & Email</TableHead>
                <TableHead>Officer Info</TableHead>
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
                data?.map((office: DistrictBlockOfficeProps, index: number) => {
                  const deletemsg =
                    'The office information will be permanently deleted';

                  let officerInfo = '';
                  officerInfo += office.officer_name
                    ? office.officer_name + ', '
                    : '';
                  officerInfo += office.officer_designation
                    ? office.officer_designation + ', '
                    : '';
                  officerInfo += office.officer_mobile
                    ? office.officer_mobile
                    : '';

                  return (
                    <TableRow
                      key={nanoid()}
                      className="text-muted-foreground group"
                    >
                      <TableCell className="font-medium">
                        {serialNo(Number(meta.currentPage), 10) + index}.
                      </TableCell>
                      <TableCell>{office.district_name}</TableCell>
                      <TableCell>
                        <AppTooltip content={office.name ?? 'NA'} />
                      </TableCell>
                      <TableCell>
                        <AppTooltip content={office.address ?? 'NA'} />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col justify-start items-start gap-1">
                          {office.landline_no && (
                            <div className="flex flex-row justify-start items-center gap-2">
                              <Phone className="size-3.5" />
                              <p>{office.landline_no ?? 'NA'}</p>
                            </div>
                          )}
                          {office.email && (
                            <div className="flex flex-row justify-start items-center gap-2">
                              <Mail className="size-3.5" />
                              <AppTooltip content={office.email ?? 'NA'} />
                            </div>
                          )}
                          {!office.landline_no && !office.email && (
                            <p className="na">NA</p>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex justify-between items-start">
                          <AppTooltip content={officerInfo ?? 'NA'} />
                          <WbcDistrictBlockOfficePopover office={office} />
                        </div>
                      </TableCell>
                      <TableCell>
                        {dayjs(office.updated_at).format('DD/MM/YYYY h:mm A')}
                      </TableCell>
                      <TableCell>
                        <Switch
                          className="data-[state=checked]:bg-sky cursor-pointer"
                          checked={office.is_active}
                          onCheckedChange={handleActive(office.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-row justify-center items-center gap-2">
                          <EyeIcon className="h-4 text-blue-500 duration-200 cursor-pointer" />
                          <WbcAddEditDistrictBlockOffice editId={office.id} />
                          <WbcDeleteModal
                            apiUrl={`/district-block-offices/${office.id}`}
                            description={deletemsg}
                            successMsg="Office deleted successfully"
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
export default WbAppDistrictBlockOffice;
