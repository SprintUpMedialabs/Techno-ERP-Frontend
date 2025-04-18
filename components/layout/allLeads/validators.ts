import { z } from 'zod';
import {
  Course,
  FinalConversionType,
  Gender,
  LeadType,
  Locations,
  Marketing_Source,
} from '@/static/enum';

export const objectIdSchema = z.string();

export const requestDateSchema = z
  .string()
  .regex(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Date must be in DD/MM/YYYY format');

export const contactNumberSchema = z
  .string()
  .regex(/^[1-9]\d{9}$/, 'Invalid contact number format. Expected: 1234567890');

export const leadMasterSchema = z.object({
  date: z.date(),
  source: z.nativeEnum(Marketing_Source).optional(),
  schoolName: z.string().optional(),
  name: z
    .string()
    .nonempty('Name field is required')
    .regex(/^[A-Za-z\s]+$/, 'Name can only contain alphabets and spaces'),
  phoneNumber: contactNumberSchema,
  altPhoneNumber: contactNumberSchema.optional(),
  email: z.string().email('Invalid Email Format').optional(),
  gender: z.nativeEnum(Gender).default(Gender.NOT_TO_MENTION),
  area: z.string().optional(),
  city: z.string().optional(),
  course: z.nativeEnum(Course).optional(),
  assignedTo: objectIdSchema, // TODO: need to test this
  leadType: z.nativeEnum(LeadType).default(LeadType.OPEN),
  leadTypeModifiedDate: z.string().optional(),
  nextDueDate: z.date().optional(),
  footFall: z.boolean().optional(), //This is referring to Campus Visit
  finalConversion: z
    .nativeEnum(FinalConversionType)
    .optional()
    .default(FinalConversionType.NO_FOOTFALL),
  remarks: z.string().optional(),
  leadsFollowUpCount: z.number().optional().default(0),
  yellowLeadsFollowUpCount: z.number().optional().default(0)
});

export const leadSchema = leadMasterSchema
  .omit({
    finalConversion: true,
    remarks: true,
    footFall: true,
    yellowLeadsFollowUpCount: true
  })
  .strict();

export const yellowLeadSchema = leadMasterSchema
  .omit({ leadType: true, leadsFollowUpCount: true })
  .strict();

export const leadRequestSchema = leadSchema.extend({
  date: requestDateSchema,
  nextDueDate: requestDateSchema.optional()
});

export const updateLeadRequestSchema = leadRequestSchema
  .extend({
    _id: objectIdSchema,
    remarks: z.string().optional(),
    date: requestDateSchema.optional(),
    phoneNumber: contactNumberSchema.optional(),
    gender: z.nativeEnum(Gender).optional(),
    leadType: z.nativeEnum(LeadType).optional(),
    assignedTo: objectIdSchema.optional(),
    nextDueDate: requestDateSchema.optional()
  })
  .omit({ source: true })
  .strict(); // strict will restrict extra properties

export const yellowLeadUpdateSchema = yellowLeadSchema
  .extend({
    _id: objectIdSchema,
    name: z.string().optional(),
    phoneNumber: contactNumberSchema.optional(),
    footFall: z.boolean().optional(),
    assignedTo: objectIdSchema.optional(),
    date: requestDateSchema.optional(),
    nextDueDate: requestDateSchema.optional()
  })
  .strict();

export type ILeadMaster = z.infer<typeof leadMasterSchema>;
export type ILead = z.infer<typeof leadSchema>;
export type IYellowLead = z.infer<typeof yellowLeadSchema>;
export type IUpdateLeadRequestSchema = z.infer<typeof updateLeadRequestSchema>;
export type ILeadRequest = z.infer<typeof leadRequestSchema>;
export type IYellowLeadUpdate = z.infer<typeof yellowLeadUpdateSchema>;
