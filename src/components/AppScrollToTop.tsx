import { ArrowUpFromLine } from 'lucide-react';
import { smoothScrollTo } from '@/utils/function';
import { useEffect, useState } from 'react';

const AppScrollToTop = () => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () =>
    window.scrollY > 300 ? setVisible(true) : setVisible(false);

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  return (
    <>
      {visible && (
        <div
          className="fixed bottom-5 right-0 z-50 bg-sky rounded-full shadow-lg hover:bg-sky/80 transition size-12 cursor-pointer flex justify-center items-center"
          onClick={() => smoothScrollTo(0, 0, 1000)}
        >
          <ArrowUpFromLine className="text-white" />
        </div>
      )}
    </>
  );
};
export default AppScrollToTop;
