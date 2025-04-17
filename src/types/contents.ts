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

export type srGbMembersProps = {
  added_by: number;
  created_at: Date;
  description: string;
  designation: string | null;
  id: number;
  name: string;
  organisation: string;
  updated_at: Date;
};

export type DeleteProps = {
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  apiUrl: string;
  title?: string;
  description: string;
  successMsg: string;
};

export type GalleryImageProps = {
  created_at: Date;
  gallery_id: number;
  id: number;
  image_path: string;
  updated_at: Date;
};

export type FairGalleryProps = {
  added_by: number;
  cover_image: string | null;
  created_at: Date;
  description: string | null;
  id: number;
  images: GalleryImageProps[];
  cover?: GalleryImageProps | null;
  organisation: string;
  program_id: number;
  programme_date: string | Date;
  show_in_gallery: boolean;
  slug: string;
  title: string;
  updated_at: Date;
  updated_by: number | null;
};

export type FairProgrammeProps = {
  added_by: number;
  created_at: Date;
  cover_image: string | null;
  description: string | null;
  gallery: FairGalleryProps[] | null;
  gallery_images: GalleryImageProps[] | null;
  id: number;
  occurance: string;
  title: string;
  slug: string;
  organisation: string;
  updated_at: Date;
  updated_by: number | null;
  uuid: string;
};

export type FairGalleryOverviewProps = {
  added_by: number;
  created_at: Date;
  cover_image: string | null;
  description: string | null;
  id: number;
  occurance: string;
  title: string;
  slug: string;
  organisation: string;
  updated_at: Date;
  updated_by: number | null;
  uuid: string;
};

export type DistrictBlockOfficeProps = {
  added_by: number;
  address: string | null;
  created_at: Date;
  district_id: number;
  district_name: string | null;
  email: string | null;
  id: number;
  is_active: boolean;
  landline_no: string | null;
  mobile_1: string | null;
  mobile_2: string | null;
  name: string;
  officer_designation: string | null;
  officer_mobile: string | null;
  officer_name: string | null;
  organisation: string;
  slug: string;
  updated_at: Date;
  updated_by: number | null;
};

export type DistrictWithOfficeProps = {
  created_at: Date;
  district_code: string | null;
  district_offices: DistrictBlockOfficeProps[];
  id: number;
  is_active: boolean;
  name: string;
  updated_at: Date;
};

export type YouthHostelProps = {
  accommodation: string | null;
  added_by: number;
  address: string;
  airport: string | null;
  bus_stop: string | null;
  created_at: Date;
  district_id: number;
  email: string | null;
  hostel_img: string | null;
  how_to_reach: string | null;
  id: number;
  is_active: boolean;
  name: string;
  phone_1: string | null;
  phone_2: string | null;
  railway_station: string | null;
  remarks: string | null;
  road_network: string | null;
  slug: string;
  updated_at: Date;
  updated_by: number | null;
  uuid: string;
};

// Sports API wrappers start ------------------------------

export type SliderProps = {
  id: number;
  image_path: string;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
};

export type KeyPersonnelProps = {
  id: number;
  name: string;
  designation: string | null;
  image_path: string | null;
  created_at: Date;
  updated_at: Date;
  rank: string | null;
  department: string | null;
  govt: string | null;
  is_active: boolean;
  added_by: number;
  updated_by: number | null;
};
