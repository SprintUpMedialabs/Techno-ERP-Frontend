import { ZodTypeAny } from "zod";

export interface FormSection {
  title: string;
  fields: (FormFieldInterface | FormSubSection)[];
}

export interface FormSubSection {
  subHeading: string;
  fields: FormFieldInterface[];
}


export interface FormFieldInterface {
  name: string;
  label: string;
  itemClass: string;
  fieldClass: string;
  isDisabled?: boolean;
  zodSchema: ZodTypeAny;
}