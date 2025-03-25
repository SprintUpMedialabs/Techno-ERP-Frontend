'use client';

// React and React Hook Form imports
import { useForm, FieldValues, Path, Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// Zod imports
import { z, ZodOptional, ZodDefault, ZodEffects, ZodObject, ZodDate } from 'zod';

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
import { FormFieldInterface, FormSection } from './interface';
import { FieldComponent } from './FieldComponent';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { JSX } from 'react';

interface DynamicFormProps<T extends FieldValues> {
  sections: FormSection[];
  onSubmit: (values: T) => void;
}

const DynamicForm = <T extends FieldValues>({ sections, onSubmit }: DynamicFormProps<T>) => {
  
  // Construct schema dynamically from the fields array
  const schema = z.object(
    sections
      ?.flatMap((section) => section.fields)
      .reduce((acc, field) => ({ ...acc, [field.name]: field.zodSchema }), {})
  );

  const form = useForm<T>({
    resolver: zodResolver(schema) as unknown as Resolver<T>
  });

  const renderField = ({
    name,
    label,
    style,
    zodSchema,
    isDisabled
  }: FormFieldInterface): JSX.Element | null => {
    let fieldSchema = zodSchema;

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
      <>
        <FormField
          key={name}
          control={form.control}
          name={name as Path<T>}
          render={({ field }) => (
            <FormItem>

              {/* Label */}
              <FormLabel className="font-inter font-normal text-[12px] text-[#666666]">
                {label}
              </FormLabel>

              {/* Form Control */}
              <FormControl className="w-[407px] h-[36px] border border-gray-300 bg-white">
                <FieldComponent
                  fieldType={fieldType}
                  field={field}
                  fieldSchema={fieldSchema}
                  style={style}
                  isDisabled={isDisabled}
                  label={label}
                />
              </FormControl>

              {/* Form Message */}
              <FormMessage />

            </FormItem>
          )}
        />
      </>
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
        {sections.map(({ title, fields }) => (

          <div key={title} className="space-y-4">
            {/* Section Title */}
            <h3 className="font-inter text-[16px] font-semibold">{title}</h3>
            
            {/* Fields */}
            <div className="flex flex-row flex-wrap gap-2">{fields.map(renderField)}</div>
          
          </div>
        
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default DynamicForm;
