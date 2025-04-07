import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DistrictBlockOfficeProps } from '@/types/contents';
import { nanoid } from 'nanoid';

const WbDistrictOfficeTable = ({
  districtOffices: data,
}: {
  districtOffices: DistrictBlockOfficeProps[] | undefined;
}) => {
  return (
    <Table className="text-xs uppercase">
      <TableHeader>
        <TableRow className="bg-sky/30 hover:bg-sky/30">
          <TableHead className="w-[50px]">#</TableHead>
          <TableHead>Name of the Office and Address</TableHead>
          <TableHead>Landline No.</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Designation & Mobile no. of Officers</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.length === 0 ? (
          <TableRow>
            <TableCell colSpan={5} className="text-xs uppercase text-center">
              NO DATA FOUND
            </TableCell>
          </TableRow>
        ) : (
          data?.map((office: DistrictBlockOfficeProps, index: number) => {
            return (
              <TableRow
                key={nanoid()}
                className="text-sky-foreground group odd:bg-sky/5 even:bg-sky/10 duration-200"
              >
                <TableCell className="font-medium">{index + 1}.</TableCell>
                <TableCell>
                  <div className="max-w-[250px] text-left text-wrap flex flex-col gap-3">
                    <p>{office.name}</p>
                    <p>{office.address}</p>
                  </div>
                </TableCell>
                <TableCell className="align-top">
                  {office.landline_no ?? `NA`}
                </TableCell>
                <TableCell className="align-top">
                  {office.email ? (
                    <span className="lowercase">{office.email}</span>
                  ) : (
                    `NA`
                  )}
                </TableCell>
                <TableCell className="align-top">
                  <div className="max-w-[250px] text-wrap flex flex-col">
                    <span className={`${office.officer_name ? 'mb-2' : null}`}>
                      {office.officer_name ? office.officer_name + ', ' : ''}
                    </span>
                    <span
                      className={`${
                        office.officer_designation ? 'mb-2' : null
                      }`}
                    >
                      {office.officer_designation
                        ? office.officer_designation + ', '
                        : ''}
                    </span>
                    <span>{office.officer_mobile ?? ''}</span>
                  </div>
                </TableCell>
              </TableRow>
            );
          })
        )}
      </TableBody>
    </Table>
  );
};
export default WbDistrictOfficeTable;
