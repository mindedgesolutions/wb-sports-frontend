import { Label } from '@/components/ui/label';
import { menus } from '@/constants/wbMenu';
import { WebsiteMenuProps } from '@/types/menu';
import { nanoid } from '@reduxjs/toolkit';
import WbcBannerPopover from '../pop-overs/WbcBannerPopover';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const WbcAddEditBanner = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="border p-4">
      <div className="bg-muted-foreground/10 text-muted-foreground p-2 text-base font-medium tracking-wider">
        Add new banner
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mt-6">
          <div className="flex flex-col justify-start items-start gap-2">
            <Label className="text-muted-foreground">
              Select a page <span className="text-red-500">*</span>
            </Label>
            <select
              className="flex h-10 w-full items-center justify-between rounded-xs border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/70 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
              name="page"
            >
              <option value="">- Select -</option>
              {menus.map((menu: WebsiteMenuProps) => {
                const hasSubMenus = menu.subMenus && menu.subMenus.length > 0;
                if (!hasSubMenus) {
                  return (
                    <option
                      key={nanoid()}
                      value={menu.link!}
                      className="text-muted-foreground"
                    >
                      {menu.name}
                    </option>
                  );
                }
                return (
                  <optgroup
                    key={nanoid()}
                    label={menu.name}
                    className="text-sky font-medium"
                  >
                    {menu.subMenus?.map((subMenu) => (
                      <option
                        key={nanoid()}
                        value={subMenu.link!}
                        className="text-muted-foreground"
                      >
                        {subMenu.name}
                      </option>
                    ))}
                  </optgroup>
                );
              })}
            </select>
            <span className="text-red-500 text-xs"></span>
          </div>
          <div className="flex flex-col justify-start items-start gap-2 my-4">
            <div className="flex flex-row gap-2">
              <Label className="text-muted-foreground">
                Select an image <span className="text-red-500">*</span>
              </Label>
              <WbcBannerPopover />
            </div>
            <Input type="file" name="banner" id="banner" />
            <span className="text-red-500 text-xs"></span>
            <div className="w-full h-28 border border-dashed flex justify-center items-center">
              <p className="text-sm font-extralight tracking-widest">
                preview banner
              </p>
            </div>
          </div>
          <Separator />
          <div className="my-4 flex flex-row justify-between items-center">
            <Button
              type="button"
              variant="outline"
              className="tracking-widest text-base font-normal"
            >
              Reset
            </Button>
            <Button type="submit" className="cs-btn">
              Upload
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default WbcAddEditBanner;
