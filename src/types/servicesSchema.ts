import { z } from 'zod';

export const computerCentreSchema = z.object({
  district: z.string().min(1, 'District is required'),
  yctcName: z.string().min(1, 'YCTC Name is required'),
  yctcCode: z.string().nullable(),
  centreCategory: z.string().nullable(),
  address1: z.string().min(1, 'Address line 1 is required'),
  address2: z.string().nullable(),
  address3: z.string().nullable(),
  city: z.string().nullable(),
  pincode: z
    .union([z.string(), z.number(), z.null()])
    .optional()
    .refine(
      (val) => {
        if (val === null || val === undefined || val === '') return true;
        const str = String(val);
        const pattern = /^[0-9]+$/;
        return str.length === 6 && pattern.test(str);
      },
      {
        message: 'Pincode must be 6 digits',
      }
    ),
  inchargeName: z.string().nullable(),
  inchargeMobile: z
    .union([z.string(), z.number(), z.null()])
    .optional()
    .refine(
      (val) => {
        if (val === null || val === undefined || val === '') return true;
        const str = String(val);
        const pattern = /^[0-9]+$/;
        return str.length === 10 && pattern.test(str);
      },
      {
        message: 'Mobile number must be 10 digits',
      }
    ),
  inchargeEmail: z
    .string()
    .optional()
    .refine(
      (val) => {
        if (val === null || val === undefined || val === '') return true;
        const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return pattern.test(val);
      },
      {
        message: 'Invalid email',
      }
    ),
  ownerName: z.string().nullable(),
  ownerMobile: z
    .union([z.string(), z.number(), z.null()])
    .optional()
    .refine(
      (val) => {
        if (val === null || val === undefined || val === '') return true;
        const str = String(val);
        const pattern = /^[0-9]+$/;
        return str.length === 10 && pattern.test(str);
      },
      {
        message: 'Mobile number must be 10 digits',
      }
    ),
});
export type ComputerCentreSchema = z.infer<typeof computerCentreSchema>;
