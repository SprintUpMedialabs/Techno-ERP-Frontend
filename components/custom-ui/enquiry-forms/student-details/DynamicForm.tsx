'use client';

import { useForm, Controller, FieldValues, Path } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z, ZodTypeAny, ZodOptional, ZodDefault, ZodEffects, ZodObject, ZodDate } from 'zod';
import { format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from '@/components/ui/form';
import logger from '@/lib/logger';
import { JSX } from 'react';
import { FormFieldInterface, FormSection } from './fields';

interface DynamicFormProps<T extends FieldValues> {
  sections: FormSection[];
  onSubmit: (values: T) => void;
}

const DynamicForm = <T extends FieldValues>({ sections, onSubmit }: DynamicFormProps<T>) => {
  // Construct schema dynamically from the fields array
  const schema = z.object(
    sections?.flatMap(section => section.fields).reduce((acc, field) => ({ ...acc, [field.name]: field.zodSchema }), {})
  );

  const form = useForm<T>({
    resolver: zodResolver(schema)
  });

  const renderField = ({ name, label, style, zodSchema, isDisabled }: FormFieldInterface): JSX.Element | null => {
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
    logger.info(`Rendering field: ${name}, Type: ${fieldType}`);

    return (
      <FormField
        key={name}
        control={form.control}
        name={name as Path<T>}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="font-inter font-normal text-[12px] text-[#666666]">
              {label}
            </FormLabel>
            <FormControl className="w-[407px] h-[36px] border border-gray-300 bg-white">
              {(() => {
                switch (fieldType) {
                  case 'ZodString':
                        return <Input type="text" {...field} className={`${style}`} disabled={isDisabled} />;
                  case 'ZodNumber':
                    return <Input type="number" {...field} className={`${style}`} disabled={isDisabled} />;
                  case 'ZodBoolean':
                    return (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                            className="flex"
                            disabled={isDisabled}
                      />
                    );
                  case 'ZodEnum':
                  case 'ZodNativeEnum':
                    const enumValues = Object.values(fieldSchema._def.values);
                    return (
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <SelectTrigger>
                          <SelectValue placeholder={`Select ${label}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {enumValues.map((option) => (
                            <SelectItem key={option as string} value={option as string} className={`${style}`} disabled={isDisabled}>
                              {option as string}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    );
                  case 'ZodDate':
                    return (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button variant="outline" className={ "w-[407px] " +  `${style}`} disabled={isDisabled}>
                            {field.value ? format(field.value, 'PPP') : `Pick a ${label}`}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={(date) => field.onChange(date || undefined)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    );
                  default:
                    logger.warn(`Unsupported field type: ${fieldType}`);
                    return null;
                }
              })()}
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    );
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 flex flex-col">
        {sections.map(({ title, fields }) => (
          <div key={title} className="space-y-4">
            <h3 className="text-lg font-bold">{title}</h3>
            <div className="flex flex-row flex-wrap gap-2">{fields.map(renderField)}</div>
          </div>
        ))}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default DynamicForm;
