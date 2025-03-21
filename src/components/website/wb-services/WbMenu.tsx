import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { WebsiteMenuProps } from '@/types/menu';
import { motion } from 'framer-motion';

const WbMenu = ({ menu }: { menu: WebsiteMenuProps }) => {
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

  const hasSubMenu = menu.subMenus && menu.subMenus.length > 0;

  // return (
  // <ul>
  //   <li className="group">
  //     <span className="hidden lg:flex items-center gap-1.5 cursor-pointer px-3 py-2 hover:bg-white/15 rounded-xs">
  //       <span className="text-sm text-white">{menu.name}</span>
  //       {hasSubmenu && (
  //         <ChevronDown className="mt-0.5 size-4 text-white group-hover:rotate-180 duration-200" />
  //       )}
  //     </span>
  //     <div
  //       className={`grid gap-7 ${
  //         menu.gridCols === 3
  //           ? 'grid-cols-3'
  //           : menu.gridCols === 2
  //           ? 'grid-cols-2'
  //           : 'grid-cols-1'
  //       }`}
  //     >
  //       {hasSubmenu &&
  //         menu.subMenus!.map((submenu) => {
  //           return (
  //             <div className="relative cursor-pointer" key={nanoid()}>
  //               <div className="flex items-center gap-x-4 group/menubox">
  //                 {submenu.icon && (
  //                   <div className="bg-white/5 p-1 rounded-sm group-hover/menubox:bg-white/20 duration-300">
  //                     <submenu.icon className="text-white text-xs size-4" />
  //                   </div>
  //                 )}
  //                 <div>
  //                   <h6 className="text-white text-xs">{submenu.name}</h6>
  //                 </div>
  //               </div>
  //             </div>
  //           );
  //         })}
  //     </div>
  //   </li>
  // </ul>

  return (
    <motion.li
      className="group"
      onHoverStart={() => toggleHoverMenu()}
      onHoverEnd={toggleHoverMenu}
    >
      <span className="flex items-center gap-4 hover:bg-white/5 cursor-pointer p-1 rounded-xl text-white text-sm">
        {menu.name}
        {hasSubMenu && (
          <ChevronDown className="mt-[0.6px] group-hover/link:rotate-180 duration-200 text-white text-sm" />
        )}
      </span>
      {hasSubMenu && (
        <motion.div
          className="absolute top-[13.2rem] p-1 rounded-sm origin-[50%_-170px] backdrop-blur bg-blue-900/30"
          initial="exit"
          animate={isHover ? 'enter' : 'exit'}
          variants={subMenuAnimate}
        >
          <div
            className={`grid gap-7 ${
              menu.gridCols === 3
                ? 'grid-cols-3'
                : menu.gridCols === 2
                ? 'grid-cols-2'
                : 'grid-cols-1'
            }`}
          >
            {hasSubMenu &&
              menu.subMenus!.map((submenu, i) => (
                <div className="relative cursor-pointer" key={i}>
                  <div className="flex items-center gap-x-0 group/menubox">
                    <div className="bg-white/5 w-fit p-2 rounded-md group-hover/menubox:bg-white group-hover/menubox:text-gray-900 duration-300">
                      {submenu.icon && <submenu.icon />}
                    </div>
                    <div>
                      <h6 className="font-normal text-sm text-white">
                        {submenu.name}
                      </h6>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      )}
    </motion.li>
  );
};
export default WbMenu;
