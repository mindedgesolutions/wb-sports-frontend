import {
  AppContentWrapper,
  AppMainWrapper,
  AppTitleWrapper,
  WbcAddEditBanner,
} from '@/components';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const WbCmsBanners = () => {
  return (
    <AppMainWrapper>
      <AppTitleWrapper>upload banner for individual pages</AppTitleWrapper>
      <AppContentWrapper>
        <div className="flex md:flex-row flex-col-reverse justify-start items-start gap-4">
          <div className="basis-full md:basis-3/5">
            <Table>
              <TableCaption>A list of your recent invoices.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Invoice</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">INV001</TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          <div className="basis-full w-full md:basis-2/5">
            <WbcAddEditBanner />
          </div>
        </div>
      </AppContentWrapper>
    </AppMainWrapper>
  );
};
export default WbCmsBanners;
