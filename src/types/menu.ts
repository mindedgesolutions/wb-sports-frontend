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

export type CmsSubMenuProps = {
  title: string;
  url: string;
};

export type CmsMenuProps = {
  title: string;
  url?: string | null;
  icon?: React.ElementType | null;
  children?: CmsSubMenuProps[] | null;
};
