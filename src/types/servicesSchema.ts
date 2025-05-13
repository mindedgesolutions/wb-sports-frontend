import { z } from 'zod';

const MAX_SIZE_200 = 200 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
];

const validNumber = (
  value: string | number | undefined | null,
  length: number
) => {
  if (value === null || value === undefined || value === '') return true;
  const str = String(value);
  const pattern = /^[0-9]+$/;
  return str.length === length && pattern.test(str);
};

const validEmail = (value: string | undefined | null) => {
  if (value === null || value === undefined || value === '') return true;
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return pattern.test(value);
};

// -------------------------------

export const computerCentreSchema = z.object({
  district: z.coerce.number().min(1, 'District is required'),
  yctcName: z.string().min(1, 'YCTC Name is required'),
  yctcCode: z.string().nullable(),
  centreCategory: z.string().nullable(),
  address1: z.string().min(1, 'Address line 1 is required'),
  address2: z.string().nullable(),
  address3: z.string().nullable(),
  city: z.string().nullable(),
  pincode: z
    .string()
    .optional()
    .nullable()
    .refine((val) => validNumber(val, 4), {
      message: 'Pincode must be 4 digits',
    }),
  inchargeName: z.string().nullable(),
  inchargeMobile: z
    .string()
    .optional()
    .nullable()
    .refine((val) => validNumber(val, 10), {
      message: 'Mobile number must be 10 digits',
    }),
  inchargeEmail: z
    .string()
    .nullable()
    .refine((val) => validEmail(val), {
      message: 'Invalid email',
    }),
  ownerName: z.string().nullable(),
  ownerMobile: z
    .string()
    .optional()
    .nullable()
    .refine((val) => validNumber(val, 10), {
      message: 'Mobile number must be 10 digits',
    }),
});
export type ComputerCentreSchema = z.infer<typeof computerCentreSchema>;

// --------------------------------

export const bannerSchema = (editId: number | null) =>
  z
    .object({
      page: z.string().min(1, 'Page is required'),
      pageTitle: z.string().optional().nullable(),
      banner: z.custom<FileList>(),
    })
    .superRefine((data, ctx) => {
      const file = data.banner?.item(0);

      if (!editId && !file) {
        ctx.addIssue({
          path: ['banner'],
          code: 'custom',
          message: 'File is required',
        });
      } else if (file) {
        if (file!.size > MAX_SIZE_200) {
          ctx.addIssue({
            path: ['banner'],
            code: 'custom',
            message: 'File size must be less than 100 KB',
          });
        }
        if (!ACCEPTED_IMAGE_TYPES.includes(file!.type)) {
          ctx.addIssue({
            path: ['banner'],
            code: 'custom',
            message: 'Invalid file type. Allowed: jpeg, png, jpg, webp',
          });
        }
      }
    });
export type BannerSchema = z.infer<ReturnType<typeof bannerSchema>>;

// --------------------------------

export const districtBlockOfficeSchema = z.object({
  district: z.string().min(1, 'District is required'),
  name: z.string().min(1, 'Office name is required'),
  address: z.string().min(1, 'Address is required'),
  landline: z
    .string()
    .nullable()
    .refine(
      (val) => {
        if (val === undefined || val === null || val === '') return true;
        const str = String(val);
        const pattern = /^[0-9]+$/;
        return pattern.test(str);
      },
      {
        message: 'Landline number must be digits only',
      }
    ),
  email: z
    .string()
    .nullable()
    .refine((val) => validEmail(val), {
      message: 'Invalid email',
    }),
  mobile_1: z
    .string()
    .optional()
    .nullable()
    .refine((val) => validNumber(val, 10), {
      message: 'Mobile number must be 10 digits',
    }),
  mobile_2: z
    .string()
    .optional()
    .nullable()
    .refine((val) => validNumber(val, 10), {
      message: 'Mobile number must be 10 digits',
    }),
  officerName: z.string().nullable(),
  officerDesignation: z.string().min(1, 'Designation is required'),
  officerMobile: z
    .string()
    .nullable()
    .refine((val) => validNumber(val, 10), {
      message: 'Mobile number must be 10 digits',
    }),
});
export type DistrictBlockOfficeSchema = z.infer<
  typeof districtBlockOfficeSchema
>;

// --------------------------------

export const courseDetailsSchema = z.object({
  courseType: z.string().min(1, 'Course type is required'),
  courseName: z.string().min(1, 'Course name is required'),
  duration: z.string().min(1, 'Duration is required'),
  courseFee: z.coerce
    .number({ message: 'Course fee must be a valid number' })
    .min(1, 'Course fee is required'),
  eligibility: z.string().min(1, 'Eligibility is required'),
});
export type CourseDetailsSchema = z.infer<typeof courseDetailsSchema>;

// -------------------------------

export const gbMembersSchema = z.object({
  designation: z.string().optional().nullable(),
  name: z.string().min(1, 'Name is required'),
  desc: z.string().min(1, 'Description is required'),
});
export type GbMembersSchema = z.infer<typeof gbMembersSchema>;

// -------------------------------

export const newsEvemtsSchema = z.object({
  title: z
    .string({ required_error: 'Title is required' })
    .min(1, { message: 'Title is required' }),
});
