import { Button } from '@/components/ui/button';
import { ALargeSmall, Minus, Plus } from 'lucide-react';
import { useState } from 'react';

const WbFontContainer = () => {
  const [pulsingPlus, setPulsingPlus] = useState(false);
  const [pulsingMinus, setPulsingMinus] = useState(false);

  const increment = () => {
    setPulsingPlus(true);
    setTimeout(() => setPulsingPlus(false), 100);
  };

  const decrement = () => {
    setPulsingMinus(true);
    setTimeout(() => setPulsingMinus(false), 100);
  };

  return (
    <div className="flex flex-row justify-center items-center bg-sky-800 rounded-md">
      <Button
        className="relative bg-transparent hover:bg-transparent"
        onClick={increment}
      >
        <Plus size={24} color="white" />
        {pulsingPlus && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-full h-full bg-blue-500 opacity-50 rounded-full animate-ping"></span>
          </span>
        )}
      </Button>
      <section className="flex flex-row gap-2 justify-center items-center text-white">
        <ALargeSmall />
      </section>
      <Button
        className="relative bg-transparent hover:bg-transparent"
        onClick={decrement}
      >
        <Minus size={24} color="white" />
        {pulsingMinus && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-full h-full bg-blue-500 opacity-50 rounded-full animate-ping"></span>
          </span>
        )}
      </Button>
    </div>
  );
};
export default WbFontContainer;
