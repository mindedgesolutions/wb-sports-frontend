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

export type DistrictProps = {
  created_at: Date;
  district_code: string | null;
  id: number;
  is_active: boolean;
  name: string;
  updated_at: Date;
};

export type CompCentreProps = {
  added_by: number;
  address_line_1: string | null;
  address_line_2: string | null;
  address_line_3: string | null;
  center_category: string | null;
  center_incharge_email: string | null;
  center_incharge_name: string | null;
  center_incharge_mobile: string | null;
  center_owner_mobile: string | null;
  center_owner_name: string | null;
  city: string | null;
  created_at: Date;
  district_id: number;
  id: number;
  is_active: boolean;
  pincode: string | null;
  slug: string;
  updated_at: Date;
  yctc_code: string | null;
  yctc_name: string;
  district: DistrictProps;
};
