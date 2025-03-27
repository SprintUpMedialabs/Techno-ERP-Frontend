'use client';

// React and React Hook Form imports
import { useForm, FieldValues, Path, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod imports
import { z, ZodOptional, ZodDefault, ZodEffects } from 'zod';

// UI Components
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';

// Types and Interfaces
import { FormFieldInterface, FormSection, FormSubSection } from './interface';
import { FieldComponent } from './FieldComponent';
import { Button } from '@/components/ui/button';
import React, { JSX } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';

const isFormField = (field: FormFieldInterface | FormSubSection): field is FormFieldInterface => {
  return (field as FormFieldInterface).zodSchema !== undefined;
};

const isFormSubSection = (field: FormFieldInterface | FormSubSection): field is FormSubSection => {
  return (field as FormSubSection).subHeading !== undefined;
};

interface DynamicFormProps<T extends FieldValues> {
  sections: FormSection[];
  onSubmit: (values: T) => void;
}

const extractFields = (fields: (FormFieldInterface | FormSubSection)[]): FormFieldInterface[] => {
  return fields.flatMap(
    (field) =>
      'zodSchema' in field
        ? field // If it's a field, return it
        : extractFields(field.fields) // If it's a sub-section, recurse into it
  );
};

const DynamicForm = <T extends FieldValues>({ sections, onSubmit }: DynamicFormProps<T>) => {
  // Create a Zod schema from the fields
  const schema = z.object(
    sections
      ?.flatMap((section) => extractFields(section.fields)) // Extract fields recursively
      .reduce((acc, field) => ({ ...acc, [field.name]: field.zodSchema }), {})
  );

  const form = useForm<T>({
    resolver: zodResolver(schema) as unknown as Resolver<T>
  });

  const renderField = ({
    name,
    label,
    placeholder,
    itemClass,
    fieldClass,
    zodSchema,
    isDisabled
  }: FormFieldInterface): JSX.Element | null => {
    let fieldSchema = zodSchema;

    /**
     * Unwraps the Zod schema to its core type by traversing through optional, default,
     * and effect wrappers until the base schema is reached.
     */
    while (
      fieldSchema instanceof ZodOptional ||
      fieldSchema instanceof ZodDefault ||
      fieldSchema instanceof ZodEffects
    ) {
      if (fieldSchema instanceof ZodOptional || fieldSchema instanceof ZodDefault) {
        fieldSchema = fieldSchema._def.innerType;
      } else if (fieldSchema instanceof ZodEffects) {
        fieldSchema = fieldSchema._def.schema;
      }
    }

    const fieldType = fieldSchema.constructor.name;

    return (
      <FormField
        key={name}
        control={form.control}
        name={name as Path<T>}
        render={({ field }) => (
          <FormItem className={itemClass}>
            {/* Label */}
            <FormLabel className="font-inter font-normal text-[12px] text-[#666666]">
              {label}
            </FormLabel>

            {/* Form Control */}
            <FormControl>
              <FieldComponent
                fieldType={fieldType}
                field={field}
                placeholder={placeholder}
                fieldSchema={fieldSchema}
                fieldClass={fieldClass}
                isDisabled={isDisabled}
                label={label}
              />
            </FormControl>

            {/* Form Message */}
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="py-8 space-y-8 flex flex-col">
        {sections.map(({ title, fields }, index) => (
          <Accordion type="single" key={`section-${index}`} collapsible>
            <AccordionItem value={`item-${index}`} key={`item-${index}`}>
              <div className="space-y-2">
                <AccordionTrigger className="w-full items-center">
                  {/* Section Title */}
                  <h3 className="font-inter text-[16px] font-semibold">
                  {title}
                  </h3>
                  <hr className="flex-1 border-t border-[#DADADA] ml-2" />
                </AccordionTrigger>

                <AccordionContent>
                  <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-y-4 bg-white p-4 rounded-[10px]">
                    {fields.map((field, fieldIndex) => (
                      <React.Fragment key={`field-${fieldIndex}`}>
                        {isFormSubSection(field) ? (
                          <div className="space-y-4">
                            {/* Subheading */}

                            <h4 className="font-inter text-[14px] font-medium">
                              {field.subHeading}
                            </h4>

                            {/* Fields under the subheading */}

                            {field.fields.map((subField, subFieldIndex) => (
                              <React.Fragment key={`subField-${subField.name}-${subFieldIndex}`}>
                                {renderField(subField)}
                              </React.Fragment>
                            ))}
                          </div>
                        ) : isFormField(field) ? (
                          renderField(field)
                        ) : null}
                      </React.Fragment>
                    ))}
                  </div>
                </AccordionContent>
              </div>
            </AccordionItem>
          </Accordion>
        ))}

        {/* Confirmation Check box */}
        <FormField
          control={form.control}
          name={'confirmation' as Path<T>}
          render={({ field }) => (
            <FormItem className="cols-span-3">
              <FormControl>
                <FieldComponent
                  fieldType="ZodBoolean"
                  field={field}
                  fieldSchema={z.boolean()}
                  fieldClass="h-4 w-4"
                  isDisabled={false}
                  label="All the above information has been verified by the applicant and thoroughly check by the Admissions team."
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Sticky Footer */}
        <div className="fixed bottom-0 w-full bg-white shadow-md p-4 border-t flex justify-between items-center">
          <Button type="button">
            <span className="font-inter font-semibold text-[12px]">Save Draft</span>
          </Button>

          <Button type="submit">
            <span className="font-inter font-semibold text-[12px]">Submit & Continue</span>
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default DynamicForm;
