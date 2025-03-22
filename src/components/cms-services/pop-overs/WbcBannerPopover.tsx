import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SlQuestion } from 'react-icons/sl';

const WbcBannerPopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <SlQuestion />
      </PopoverTrigger>
      <PopoverContent align="center" className="p-3 rounded-xs">
        <ol className="list-decimal pl-3 text-sky text-sm">
          <li className="mb-2">
            For best result, upload an image of 1600 x 700 pixel resolution
          </li>
          <li className="text-red-500 mb-2">
            Must be an image (.jpg, .jpeg, .png, .webp formats are allowed)
          </li>
          <li className="text-red-500">Image must be less than 500 KB</li>
        </ol>
      </PopoverContent>
    </Popover>
  );
};
export default WbcBannerPopover;
