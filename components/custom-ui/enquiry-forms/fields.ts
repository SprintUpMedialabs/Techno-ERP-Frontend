import {
  AdmissionMode,
  AdmissionReference,
  Category,
  Course,
  Gender,
} from '@/common/constants/enums';
import { contactNumberSchema } from '@/common/constants/schemas';
import { z } from 'zod';
import { FormFieldInterface, FormSection, FormSubSection } from '../dynamic-form/interface';

const commonFieldClass = 'w-[407px]';

const StudentDetailsFields: FormFieldInterface[] = [
  {
    name: 'admissionMode',
    label: 'Admission Mode',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + '' ,
    zodSchema: z.nativeEnum(AdmissionMode).default(AdmissionMode.OFFLINE)
  },
  {
    name: 'dateOfEnquiry',
    label: 'Date of Enquiry',
    // isDisabled: true,
    itemClass: 'col-span-1 border-none',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z.string()
  },
  {
    name: 'studentName',
    label: 'Student Name',
    itemClass: 'col-start-1 col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z
      .string({ required_error: 'Student Name is required' })
      .nonempty('Student Name is required')
  },
  {
    name: 'studentPhoneNumber',
    label: 'Student Phone Number',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: contactNumberSchema
  },

  {
    name: 'emailId',
    label: 'Email ID',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z.string().email('Invalid email format').optional()
  },
  {
    name: 'gender',
    label: 'Gender',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z.nativeEnum(Gender).default(Gender.NOT_TO_MENTION)
  },
  {
    name: 'fatherName',
    label: 'Father Name',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z
      .string({ required_error: 'Father Name is required' })
      .nonempty("Father's Name is required")
  },
  {
    name: 'fatherPhoneNumber',
    label: 'Father Phone Number',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: contactNumberSchema
  },
  {
    name: 'fatherOccupation',
    label: 'Father Occupation',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z
      .string({ required_error: 'Father occupation is required' })
      .nonempty('Father occupation is required')
  },
  {
    name: 'motherName',
    label: 'Mother Name',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z
      .string({ required_error: "Mother's Name is required" })
      .nonempty("Mother's Name is required")
  },
  {
    name: 'motherPhoneNumber',
    label: 'Mother Phone Number',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: contactNumberSchema
  },
  {
    name: 'motherOccupation',
    label: 'Mother Occupation',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z
      .string({ required_error: 'Mother occupation is required' })
      .nonempty('Mother occupation is required')
  },
  {
    name: 'dateOfBirth',
    label: 'Date of Birth',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z.date()
  },
  {
    name: 'category',
    label: 'Category',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z.nativeEnum(Category)
  },
  {
    name: 'address',
    label: 'Address',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z.string()
  },
  {
    name: 'course',
    label: 'Course',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z.nativeEnum(Course)
  },
  {
    name: 'reference',
    label: 'Reference',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ',
    zodSchema: z.nativeEnum(AdmissionReference)
  }
];

const AddressDetailsFields: FormFieldInterface[] = [
  {
    name: 'addressLine1',
    label: 'Address Line 1',
    placeholder: 'Enter Address Line 1',
    itemClass: 'col-span-2',
    fieldClass: 'w-[847px]',
    zodSchema: z.string()
  },
  {
    name: 'addressLine2',
    label: 'Address Line 2',
    placeholder: 'Enter Address Line 2',
    itemClass: 'col-span-2',
    fieldClass: 'w-[847px]',
    zodSchema: z.string().optional()
  },
  {
    name: 'pincode',
    label: 'Pincode',
    itemClass: 'col-span-1 col-start-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z.string().regex(/^[1-9][0-9]{5}$/, 'Pincode must be a 6-digit number starting with a non-zero digit')
  },
  {
    name: 'district',
    label: 'District',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ',
    zodSchema: z.string()
  },
  {
    name: 'state',
    label: 'State',
    itemClass: 'col-span-1 col-start-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z.string()
  },
  {
    name: 'country',
    label: 'Country',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z.string()
  },
];

const AcademicDetailsFields10th: FormSubSection = {
  subHeading: "10th",
  fields: [
    {
      name: 'schoolCollegeName_10th',
      label: 'School Name ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.string().min(1, 'School Name is required')
    },
    {
      name: 'universityBoardName_10th',
      label: 'Board Name ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.string().min(1, 'Board Name is required')
    },
    {
      name: 'passingYear_10th',
      label: 'Passing Year ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z
        .number()
        .int()
        .refine((year) => year.toString().length === 4, {
          message: 'Passing Year must be a valid 4-digit year'
        })
    },
    {
      name: 'percentageObtained_10th',
      label: 'Percentage Obtained ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.number().min(0).max(100)
    },
    {
      name: 'subjects_10th',
      label: 'Subjects ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.array(z.string().min(1)).nonempty('Subjects cannot be empty')
    },
  ]
}

const AcademicDetailsFields12th: FormSubSection = {
  subHeading: "12th",
  fields: [
    {
      name: 'schoolCollegeName_12th',
      label: 'College Name ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.string().min(1, 'College Name is required')
    },
    {
      name: 'universityBoardName_12th',
      label: 'Board Name ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.string().min(1, 'Board Name is required')
    },
    {
      name: 'passingYear_12th',
      label: 'Passing Year ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z
        .number()
        .int()
        .refine((year) => year.toString().length === 4, {
          message: 'Passing Year must be a valid 4-digit year'
        })
    },
    {
      name: 'percentageObtained_12th',
      label: 'Percentage Obtained ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.number().min(0).max(100)
    },
    {
      name: 'subjects_12th',
      label: 'Subjects ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.array(z.string().min(1)).nonempty('Subjects cannot be empty')
    },
  ]
}

const AcademicDetailsFieldsCollege: FormSubSection = {
  subHeading: "Graduation",
  fields: [
    {
      name: 'schoolCollegeName_Graduation',
      label: 'College Name ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.string().min(1, 'College Name is required')
    },
    {
      name: 'universityBoardName_Graduation',
      label: 'University Name ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.string().min(1, 'University Name is required')
    },
    {
      name: 'passingYear_Graduation',
      label: 'Passing Year ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z
        .number()
        .int()
        .refine((year) => year.toString().length === 4, {
          message: 'Passing Year must be a valid 4-digit year'
        })
    },
    {
      name: 'percentageObtained_Graduation',
      label: 'Percentage Obtained ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.number().min(0).max(100)
    },
    {
      name: 'subjects_Graduation',
      label: 'Subjects ',
      itemClass: 'col-span-1',
      fieldClass: commonFieldClass + ' ' ,
      zodSchema: z.array(z.string().min(1)).nonempty('Subjects cannot be empty')
    }
  ]
}

const AcademicDetailsFields: FormSubSection[] = [
  AcademicDetailsFields10th,
  AcademicDetailsFields12th,
  AcademicDetailsFieldsCollege
];

const OtherDetailsFields: FormFieldInterface[] = [
  {
    name: 'counsellorName',
    label: 'Counsellor’s Name',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ',
    zodSchema: z.string().optional()
  },
  {
    name: 'telecallerName',
    label: 'Telecaller’s Name',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ',
    zodSchema: z.string().optional()
  },
  {
    name: 'date',
    label: 'Date',
    itemClass: 'col-span-1 col-start-1',
    fieldClass: commonFieldClass + ' ',
    zodSchema: z.date()
  },
  {
    name: 'remarks',
    label: 'Remarks',
    itemClass: 'col-span-1',
    fieldClass: commonFieldClass + ' ' ,
    zodSchema: z.string().optional()
  }
];

export const EnquiryFormFields = [
  {
    title: 'Student Details',
    fields: StudentDetailsFields
  },
  {
    title: 'Address Details',
    fields: AddressDetailsFields
  },
  {
    title: 'Academic Details',
    fields: AcademicDetailsFields
  },
  {
    title: 'To be filled by College',
    fields: OtherDetailsFields
  }
] as FormSection[];
