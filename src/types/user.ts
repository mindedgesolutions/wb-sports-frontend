export type UserDetailsProps = {
  id: number;
  user_id: number;
  slug: string;
  mobile: string | null;
  created_at: Date;
  updated_at: Date;
};

export type UserProps = {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  user_details: UserDetailsProps;
};
