import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import { MenuType } from '@/constants/testMenu';

const WbMenu = ({ menu }: { menu: MenuType }) => {
  const [isHover, toggleHover] = useState(false);
  const toggleHoverMenu = () => {
    toggleHover(!isHover);
  };

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.5,
      },
      transitionEnd: {
        display: 'none',
      },
    },
  };

  return (
    <div className="bg-sky-600">
      <div className="max-w-screen-xl mx-auto flex flex-row"></div>
    </div>
  );
};
export default WbMenu;
