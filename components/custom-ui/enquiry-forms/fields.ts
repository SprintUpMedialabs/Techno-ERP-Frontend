import {
  AdmissionMode,
  AdmissionReference,
  AdmittedThrough,
  ApplicationStatus,
  BloodGroup,
  Category,
  Course,
  Gender,
  Religion
} from '@/common/constants/enums';
import { addressSchema, contactNumberSchema } from '@/common/constants/schemas';
import { z, ZodTypeAny } from 'zod';
import { FormFieldInterface, FormSection } from '../dynamic-form/interface';

const StudentDetailsFields: FormFieldInterface[] = [
  {
    name: 'admissionMode',
    label: 'Admission Mode',
    style: 'col-span-2',
    zodSchema: z.nativeEnum(AdmissionMode).default(AdmissionMode.OFFLINE)
  },
  {
    name: 'dateOfEnquiry',
    label: 'Date of Enquiry',
    isDisabled: true,
    style: 'col-span-3 border-none',
    zodSchema: z.string()
  },
  {
    name: 'studentName',
    label: 'Student Name',
    style: 'col-span-2',
    zodSchema: z
      .string({ required_error: 'Student Name is required' })
      .nonempty('Student Name is required')
  },
  {
    name: 'studentPhoneNumber',
    label: 'Student Phone Number',
    style: 'col-span-2',
    zodSchema: contactNumberSchema
  },

  {
    name: 'emailId',
    label: 'Email ID',
    style: 'col-span-2',
    zodSchema: z.string().email('Invalid email format').optional()
  },
  {
    name: 'gender',
    label: 'Gender',
    style: 'col-span-2',
    zodSchema: z.nativeEnum(Gender).default(Gender.NOT_TO_MENTION)
  },
  {
    name: 'fatherName',
    label: 'Father Name',
    style: 'col-span-2',
    zodSchema: z
      .string({ required_error: 'Father Name is required' })
      .nonempty("Father's Name is required")
  },
  {
    name: 'fatherPhoneNumber',
    label: 'Father Phone Number',
    style: 'col-span-2',
    zodSchema: contactNumberSchema
  },
  {
    name: 'fatherOccupation',
    label: 'Father Occupation',
    style: 'col-span-2',
    zodSchema: z
      .string({ required_error: 'Father occupation is required' })
      .nonempty('Father occupation is required')
  },
  {
    name: 'motherName',
    label: 'Mother Name',
    style: 'col-span-2',
    zodSchema: z
      .string({ required_error: "Mother's Name is required" })
      .nonempty("Mother's Name is required")
  },
  {
    name: 'motherPhoneNumber',
    label: 'Mother Phone Number',
    style: 'col-span-2',
    zodSchema: contactNumberSchema
  },
  {
    name: 'motherOccupation',
    label: 'Mother Occupation',
    style: 'col-span-2',
    zodSchema: z
      .string({ required_error: 'Mother occupation is required' })
      .nonempty('Mother occupation is required')
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    style: 'col-span-2',
    zodSchema: z.date()
  },
  {
    name: 'category',
    label: 'Category',
    style: 'col-span-2',
    zodSchema: z.nativeEnum(Category)
  },
  {
    name: 'address',
    label: 'Address',
    style: 'col-span-2',
    zodSchema: addressSchema
  },
  {
    name: 'course',
    label: 'Course',
    style: 'col-span-2',
    zodSchema: z.nativeEnum(Course)
  },
  {
    name: 'reference',
    label: 'Reference',
    style: 'col-span-2',
    zodSchema: z.nativeEnum(AdmissionReference)
  }
];

const AcademicDetailsFields: FormFieldInterface[] = [
  {
    name: 'schoolCollegeName_10th',
    label: 'School Name (10th)',
    style: 'col-span-3',
    zodSchema: z.string().min(1, 'School Name is required')
  },
  {
    name: 'universityBoardName_10th',
    label: 'Board Name (10th)',
    style: 'col-span-3',
    zodSchema: z.string().min(1, 'Board Name is required')
  },
  {
    name: 'passingYear_10th',
    label: 'Passing Year (10th)',
    style: 'col-span-2',
    zodSchema: z
      .number()
      .int()
      .refine((year) => year.toString().length === 4, {
        message: 'Passing Year must be a valid 4-digit year'
      })
  },
  {
    name: 'percentageObtained_10th',
    label: 'Percentage Obtained (10th)',
    style: 'col-span-2',
    zodSchema: z.number().min(0).max(100)
  },
  {
    name: 'subjects_10th',
    label: 'Subjects (10th)',
    style: 'col-span-3',
    zodSchema: z.array(z.string().min(1)).nonempty('Subjects cannot be empty')
  },

  {
    name: 'schoolCollegeName_12th',
    label: 'College Name (12th)',
    style: 'col-span-3',
    zodSchema: z.string().min(1, 'College Name is required')
  },
  {
    name: 'universityBoardName_12th',
    label: 'Board Name (12th)',
    style: 'col-span-3',
    zodSchema: z.string().min(1, 'Board Name is required')
  },
  {
    name: 'passingYear_12th',
    label: 'Passing Year (12th)',
    style: 'col-span-2',
    zodSchema: z
      .number()
      .int()
      .refine((year) => year.toString().length === 4, {
        message: 'Passing Year must be a valid 4-digit year'
      })
  },
  {
    name: 'percentageObtained_12th',
    label: 'Percentage Obtained (12th)',
    style: 'col-span-2',
    zodSchema: z.number().min(0).max(100)
  },
  {
    name: 'subjects_12th',
    label: 'Subjects (12th)',
    style: 'col-span-3',
    zodSchema: z.array(z.string().min(1)).nonempty('Subjects cannot be empty')
  },

  {
    name: 'schoolCollegeName_Graduation',
    label: 'College Name (Graduation)',
    style: 'col-span-3',
    zodSchema: z.string().min(1, 'College Name is required')
  },
  {
    name: 'universityBoardName_Graduation',
    label: 'University Name (Graduation)',
    style: 'col-span-3',
    zodSchema: z.string().min(1, 'University Name is required')
  },
  {
    name: 'passingYear_Graduation',
    label: 'Passing Year (Graduation)',
    style: 'col-span-2',
    zodSchema: z
      .number()
      .int()
      .refine((year) => year.toString().length === 4, {
        message: 'Passing Year must be a valid 4-digit year'
      })
  },
  {
    name: 'percentageObtained_Graduation',
    label: 'Percentage Obtained (Graduation)',
    style: 'col-span-2',
    zodSchema: z.number().min(0).max(100)
  },
  {
    name: 'subjects_Graduation',
    label: 'Subjects (Graduation)',
    style: 'col-span-3',
    zodSchema: z.array(z.string().min(1)).nonempty('Subjects cannot be empty')
  }
];

const OtherDetailsFields: FormFieldInterface[] = [
  {
    name: 'applicationStatus',
    label: 'Application Status',
    style: 'col-span-2',
    zodSchema: z.nativeEnum(ApplicationStatus).default(ApplicationStatus.STEP_1)
  },
  {
    name: 'dateOfAdmission',
    label: 'Date of Admission',
    style: 'col-span-2',
    zodSchema: z.date()
  },
  {
    name: 'aadharNumber',
    label: 'Aadhar Number',
    style: 'col-span-2',
    zodSchema: z
      .string()
      .regex(/^\d{12}$/, 'Aadhar Number must be exactly 12 digits')
      .optional()
  },
  {
    name: 'religion',
    label: 'Religion',
    style: 'col-span-2',
    zodSchema: z.nativeEnum(Religion).optional()
  },
  {
    name: 'bloodGroup',
    label: 'Blood Group',
    style: 'col-span-2',
    zodSchema: z.nativeEnum(BloodGroup).optional()
  },
  {
    name: 'admittedThrough',
    label: 'Admitted Through',
    style: 'col-span-2',
    zodSchema: z.nativeEnum(AdmittedThrough)
  },
  {
    name: 'remarks',
    label: 'Remarks',
    style: 'col-span-2',
    zodSchema: z.string().optional()
  }
];

export const EnquiryFormFields = [
  {
    title: 'Student Details',
    fields: StudentDetailsFields
  },
  {
    title: 'Academic Details',
    fields: AcademicDetailsFields
  },
  {
    title: 'Other Details',
    fields: OtherDetailsFields
  }
] as FormSection[];
