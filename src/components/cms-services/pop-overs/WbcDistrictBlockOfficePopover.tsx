import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { DistrictBlockOfficeProps } from '@/types/contents';
import { SlQuestion } from 'react-icons/sl';

const WbcDistrictBlockOfficePopover = ({
  office,
}: {
  office: DistrictBlockOfficeProps;
}) => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <SlQuestion />
      </PopoverTrigger>
      <PopoverContent align="end" className="p-3 rounded-xs">
        <div className="flex flex-col justify-start items-start gap-2 text-sky font-normal tracking-wider text-sm">
          {office.officer_name && <p>{office.officer_name},</p>}
          {office.officer_designation && <p>{office.officer_designation},</p>}
          {office.officer_mobile && <p>{office.officer_mobile}</p>}
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default WbcDistrictBlockOfficePopover;
