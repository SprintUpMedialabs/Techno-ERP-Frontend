import { ZodTypeAny } from "zod";

export interface FormSection {
  title: string;
  fields: FormFieldInterface[];
}

export interface FormFieldInterface {
  name: string;
  label: string;
  style: string;
  isDisabled?: boolean;
  zodSchema: ZodTypeAny;
}