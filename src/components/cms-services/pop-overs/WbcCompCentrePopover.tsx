import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SlQuestion } from 'react-icons/sl';

type CompoCentreAddressProps = {
  address1: string;
  address2?: string;
  address3?: string;
  city?: string;
  pincode?: string;
};

const WbcCompCentrePopover = ({
  address1,
  address2,
  address3,
  city,
  pincode,
}: CompoCentreAddressProps) => {
  let lastLine = '';
  if (city && pincode) {
    lastLine = `${city}, ${pincode}`;
  } else if (city && !pincode) {
    lastLine = city;
  } else if (!city && pincode) {
    lastLine = pincode;
  } else {
    lastLine = '';
  }

  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer mr-2">
        <SlQuestion className="text-sm ml-1.5" />
      </PopoverTrigger>
      <PopoverContent align="end" className="p-3 rounded-xs">
        <div className="flex flex-col justify-start items-start text-xs leading-relaxed">
          {address1 && <span>{address1},</span>}
          {address2 && <span>{address2},</span>}
          {address3 && <span>{address3}</span>}
          <span>{lastLine}</span>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default WbcCompCentrePopover;
