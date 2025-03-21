export type WebsiteSubMenuProps = {
  name: string;
  desc?: string | null;
  link: string;
  icon: React.ElementType | null;
};

export type WebsiteMenuProps = {
  name: string;
  link?: string | null;
  icon?: React.ElementType | null;
  subMenuHeading?: string | null;
  subMenus?: WebsiteSubMenuProps[] | null;
  gridCols?: number | null;
};
