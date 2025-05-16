import {
  WbPageWrapper,
  WbPageSidebar,
  WbPageTopBanner,
  WbContentWrapper,
  WbDistrictOfficeTable,
} from '@/components';
import { Button } from '@/components/ui/button';
import { titles } from '@/constants';
import { DistrictWithOfficeProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { X } from 'lucide-react';
import { useState } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';

const WbDistrictOffice = () => {
  document.title = `District / Block Offices | ${titles.services}`;
  const [districtId, setDistrictId] = useState<number | undefined>(undefined);
  const { dbdist } = useLoaderData();
  const districts = dbdist as DistrictWithOfficeProps[];
  const districtOffices = districts.find(
    (district) => district.id === districtId
  )?.district_offices;

  return (
    <>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="About Us" />
        <WbContentWrapper title="District / Block Offices">
          <div className="grid grid-cols-5 md:grid-cols-3 grid-flow-row gap-0 md:gap-4">
            <div className="col-span-3 md:col-span-1">
              <select
                className="flex h-9 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                name="district"
                id="district"
                value={districtId ?? ''}
                onChange={(e) => {
                  setDistrictId(e.target.value ? Number(e.target.value) : 0);
                }}
              >
                <option value={''}>All</option>
                {districts?.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-span-2">
              {districtId && (
                <Button
                  variant={'ghost'}
                  size="icon"
                  onClick={() => setDistrictId(undefined)}
                  title="Clear filter"
                  aria-label="Clear filter"
                >
                  <X className="text-red-500" />
                </Button>
              )}
            </div>
          </div>
          {!districtId && (
            <div className="grid grid-cols-1 md:grid-cols-3 grid-flow-row gap-4">
              {districts?.map((district) => (
                <div
                  key={district.id}
                  className="w-full grid grid-cols-4 bg-sky/10 p-3 hover:bg-sky/20 duration-200 cursor-pointer group/dist"
                  onClick={() => setDistrictId(district.id)}
                >
                  <div className="col-span-3 flex justify-start items-center text-sky-foreground text-sm tracking-wider uppercase">
                    {district.name}
                  </div>
                  <div className="flex justify-center items-center text-sky-foreground text-base font-bold">
                    {district.district_offices.length < 10
                      ? `0${district.district_offices.length}`
                      : `${district.district_offices.length}`}
                  </div>
                </div>
              ))}
            </div>
          )}
          {districtId && (
            <WbDistrictOfficeTable districtOffices={districtOffices} />
          )}
        </WbContentWrapper>
      </WbPageWrapper>
    </>
  );
};
export default WbDistrictOffice;

// ---------------------------

export const loader: LoaderFunction = async () => {
  try {
    const response = await customFetch.get(
      `/services/district-wise-block-offices`
    );
    return { dbdist: response.data.data };
  } catch (error) {
    console.log(error);
    return error;
  }
};
