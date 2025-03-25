import { images, titles } from '@/constants';
import WbFooterLogo from './WbFooterLogo';
import { NavLink } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const WbFooter = () => {
  return (
    <div className="flex-1 mt-16">
      <img
        src={images.footerBg}
        alt={titles.services}
        className="w-full object-cover"
      />
      <WbFooterLogo />
      <div className="bg-sky-foreground p-8">
        <div className="max-w-screen-xl mx-auto md:h-5 flex flex-col md:flex-row justify-start items-start gap-4 text-white text-xs md:text-base">
          <NavLink to={`#`}>Home</NavLink>
          <Separator
            orientation="vertical"
            className="bg-white hidden md:block"
          />
          <NavLink to={`#`}>Sitemap</NavLink>
          <Separator
            orientation="vertical"
            className="bg-white hidden md:block"
          />
          <NavLink to={`#`}>E-tenders</NavLink>
          <Separator
            orientation="vertical"
            className="bg-white hidden md:block"
          />
          <NavLink to={`#`}>Contact Us</NavLink>
          <Separator
            orientation="vertical"
            className="bg-white hidden md:block"
          />
          <p>
            Copyright &copy; {new Date().getFullYear()} Department of Youth
            Services & Sports, Govt. of West Bengal. All Rights Reserved.
          </p>
        </div>
      </div>
    </div>
  );
};
export default WbFooter;
