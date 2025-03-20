import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ALargeSmall } from 'lucide-react';
import { useState } from 'react';

const WbFontContainer = () => {
  const [fontsize, setFontsize] = useState('text-sm');

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="data-[state=closed]:border-none data-[state=closed]:outline-none cursor-pointer">
        <ALargeSmall size={24} color="white" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-sky-900 border-none">
        <DropdownMenuItem
          className="text-sm font-normal text-primary-foreground cursor-pointer focus:bg-sky-700 focus:text-white font-roboto"
          // onClick={() => setFontsize()}
        >
          Abc
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-xl font-normal text-primary-foreground cursor-pointer focus:bg-sky-700 focus:text-white font-roboto"
          // onClick={() => setFontsize()}
        >
          Abc
        </DropdownMenuItem>
        <DropdownMenuItem
          className="text-3xl font-normal text-primary-foreground cursor-pointer focus:bg-sky-700 focus:text-white font-roboto"
          // onClick={() => setFontsize()}
        >
          Abc
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default WbFontContainer;
