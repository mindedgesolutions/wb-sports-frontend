import { UserProps } from './user';

export type MetaProps = {
  currentPage: number | null;
  lastPage: number | null;
  total: number | null;
};

export type PaginationProps = {
  totalPages: number;
  currentPage: number;
  addClass?: string;
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

export type PageBannerProps = {
  image_path?: string;
  page_title?: string;
};

export type ComputerCourseProps = {
  course_duration: string;
  course_eligibility: string;
  course_fees: number;
  course_name: string;
  course_slug: string;
  course_type: string;
  id: number;
  created_at: Date;
  updated_at: Date;
  is_active: boolean;
};

export type CompSyllabusProps = {
  added_by: number;
  created_at: Date;
  file_path: string;
  id: number;
  is_active: boolean;
  name: string;
  organisation: string;
  slug: string;
  updated_at: Date;
};
