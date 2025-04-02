import { WebsiteMenuProps } from '@/types/menu';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const WbDesktopMenu = ({ menu }: { menu: WebsiteMenuProps }) => {
  const [isHover, setIsHover] = useState(false);
  const hasSubMenu = menu.subMenus && menu.subMenus.length > 0;

  const toggleHover = () => {
    setIsHover(!isHover);
  };

  // animation variants

  const subMenuAnimate = {
    enter: {
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.1,
      },
      display: 'block',
    },
    exit: {
      opacity: 0,
      rotateX: -15,
      transition: {
        duration: 0.1,
      },
      display: 'none',
    },
  };

  return (
    <motion.li
      className="group/link relative"
      onHoverStart={toggleHover}
      onHoverEnd={toggleHover}
      onMouseLeave={() => setIsHover(false)}
    >
      <span className="flex-center gap-1 cursor-pointer px-3 py-2.5 hover:bg-sky-foreground/30 duration-200 text-sm text-white">
        {menu.name}
        {hasSubMenu && (
          <ChevronDown className="size-4 group-hover/link:rotate-180 duration-200" />
        )}
      </span>
      {hasSubMenu && (
        <motion.div
          className={`sub-menu ${
            menu.gridCols && menu.gridCols === 3
              ? 'min-w-xl'
              : menu.gridCols === 2
              ? 'min-w-md'
              : 'min-w-56'
          }`}
          initial={`exit`}
          animate={isHover ? 'enter' : 'exit'}
          variants={subMenuAnimate}
        >
          <div className={`grid grid-cols-${menu.gridCols || 1} gap-4`}>
            {menu.subMenus?.map((subMenu, index) => (
              <div key={index} className="relative cursor-pointer">
                <div className="flex-center gap-x-4 group/menubox">
                  <div className="bg-white/20 w-fit p-2 rounded-md group-hover/menubox:bg-white/40 duration-300">
                    {subMenu.icon && (
                      <subMenu.icon className="size-4 text-sky-muted group-hover/menubox:text-white" />
                    )}
                  </div>
                  <h6 className="text-sky-muted group-hover/menubox:text-white text-sm duration-300">
                    {subMenu.name}
                  </h6>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
};
export default WbDesktopMenu;
