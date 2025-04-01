import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { SlQuestion } from 'react-icons/sl';

const WbcFairProgrammPopover = () => {
  return (
    <Popover>
      <PopoverTrigger className="cursor-pointer">
        <SlQuestion />
      </PopoverTrigger>
      <PopoverContent align="start" className="p-3 rounded-xs">
        <ol className="list-decimal pl-3 text-sky text-xs">
          <li className="mb-2">
            Use 'Shift + Enter' for line break, instead of 'Enter'
          </li>
          <li>
            If you're pasting the content from other web page / document, copy
            and paste the content in a Notepad first
          </li>
        </ol>
      </PopoverContent>
    </Popover>
  );
};
export default WbcFairProgrammPopover;
