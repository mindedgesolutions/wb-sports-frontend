import {
  WbPageWrapper,
  WbPageSidebar,
  WbPageTopBanner,
  WbContentWrapper,
} from '@/components';
import { titles } from '@/constants';
import { DistrictWithOfficeProps } from '@/types/contents';
import customFetch from '@/utils/customFetch';
import { useState } from 'react';
import { LoaderFunction, useLoaderData } from 'react-router-dom';

const WbDistrictOffice = () => {
  document.title = `District / Block Offices | ${titles.services}`;
  const [districtId, setDistrictId] = useState<number>(0);
  const { dbdist } = useLoaderData();
  const districts = dbdist as DistrictWithOfficeProps[];

  return (
    <>
      <WbPageTopBanner />
      <WbPageWrapper>
        <WbPageSidebar parentMenu="About Us" />
        <WbContentWrapper title="District / Block Offices">
          <div className="grid grid-cols-3 grid-flow-row gap-4">
            <div className="">
              <select
                className="flex h-10 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                name="district"
                id="district"
                value={districtId ?? ''}
                onChange={(e) => {
                  setDistrictId(e.target.value ? Number(e.target.value) : 0);
                }}
              >
                <option value={0}>All</option>
                {districts?.map((district) => (
                  <option key={district.id} value={district.id}>
                    {district.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-3 grid-flow-row gap-4">
            {districts?.map((district) => (
              <div
                key={district.id}
                className="w-full grid grid-cols-4 bg-sky/10 p-3 hover:bg-sky/20 duration-200 cursor-pointer group/dist"
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
