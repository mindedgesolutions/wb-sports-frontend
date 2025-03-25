import WbFontContainer from './WbFontContainer';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { titles } from '@/constants';

const WbHeaderTop = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem(titles.serviceToken);

  return user ? (
    <div className="bg-black p-2 md:px-8 flex justify-start items-center">
      <Button onClick={() => navigate(-1)} className="hover:bg-gray-600/50">
        <ArrowLeft className="text-white cursor-pointer h-4 mr-1" />
        <p className="text-white">Back to Admin</p>
      </Button>
    </div>
  ) : (
    <div className="bg-sky-900 p-2 md:px-8">
      <div className="w-full max-w-screen-xl mx-auto flex justify-end items-center">
        <WbFontContainer />
      </div>
    </div>
  );
};
export default WbHeaderTop;
