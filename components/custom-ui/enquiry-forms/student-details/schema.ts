import {
  AdmissionMode,
  AdmissionReference,
  AdmittedThrough,
  ApplicationStatus,
  BloodGroup,
  Category,
  Course,
  EducationLevel,
  Gender,
  Religion
} from '@/common/constants/enums';
import {
  addressSchema,
  contactNumberSchema,
} from '@/common/constants/schemas';
import { z } from 'zod';

export const academicDetailSchema = z.object({
  educationLevel: z.nativeEnum(EducationLevel), // Only allows fixed values
  schoolCollegeName: z.string().min(1, 'School/College Name is required'),
  universityBoardName: z.string().min(1, 'University/Board Name is required'),
  passingYear: z
    .number()
    .int()
    .refine((year) => year.toString().length === 4, {
      message: 'Passing Year must be a valid 4-digit year'
    }),
  percentageObtained: z
    .number()
    .min(0, 'Percentage must be at least 0')
    .max(100, 'Percentage cannot exceed 100'),
  subjects: z
    .array(z.string().min(1, 'Subject name is required'))
    .nonempty('Subjects cannot be empty')
});

export const academicDetailsArraySchema = z.array(academicDetailSchema);

export const studentDetailsSchema = z.object({
  admissionMode: z.nativeEnum(AdmissionMode).default(AdmissionMode.OFFLINE),
  studentName: z
    .string({ required_error: 'Student Name is required' })
    .nonempty('Student Name is required'),

  dateOfBirth: z.date(),
  dateOfEnquiry: z.date(),
  studentPhoneNumber: contactNumberSchema,
  gender: z.nativeEnum(Gender).default(Gender.NOT_TO_MENTION),

  fatherName: z
    .string({ required_error: 'Father Name is required' })
    .nonempty("Father's Name is required"),
  fatherPhoneNumber: contactNumberSchema,
  fatherOccupation: z
    .string({ required_error: 'Father occupation is required' })
    .nonempty('Father occupation is required'),

  motherName: z
    .string({ required_error: "Mother's Name is required" })
    .nonempty("Mother's Name is required"),
  motherPhoneNumber: contactNumberSchema,
  motherOccupation: z
    .string({ required_error: 'Mother occupation is required' })
    .nonempty('Mother occupation is required'),

  category: z.nativeEnum(Category),
  address: addressSchema,
  emailId: z.string().email('Invalid email format').optional(),

  reference: z.nativeEnum(AdmissionReference),
  course: z.nativeEnum(Course)
});

export const otherDetailsSchema = z.object({
    applicationStatus: z.nativeEnum(ApplicationStatus).default(ApplicationStatus.STEP_1),

  dateOfAdmission: z.date(),

  aadharNumber: z
    .string()
    .regex(/^\d{12}$/, 'Aadhar Number must be exactly 12 digits')
    .optional(),

  religion: z.nativeEnum(Religion).optional(),

  bloodGroup: z.nativeEnum(BloodGroup).optional(),

    admittedThrough: z.nativeEnum(AdmittedThrough),
  
  remarks: z.string().optional(),
})

export const enquirySchema = z.object({
  studentDetails: studentDetailsSchema,

  academicDetails: academicDetailsArraySchema.optional(),

  otherDetails: otherDetailsSchema
  
});
