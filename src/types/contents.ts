import { UserProps } from './user';

export type MetaProps = {
  currentPage: number | null;
  lastPage: number | null;
  total: number | null;
};

export type BannerProps = {
  id: number;
  organization: string;
  page_title: string;
  page_url: string;
  image_path: string;
  is_active: boolean;
  added_by: number;
  updated_by: number | null;
  created_at: Date;
  updated_at: Date;
  banner_added_by: UserProps;
  banner_updated_by: UserProps | null;
};
