// UI Components
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

// Utilities
import logger from '@/lib/logger';
import { format } from 'date-fns';

// Types
import { JSX } from 'react';
import { ZodString } from 'zod';

interface FieldComponentProps {
  fieldType: string;
  field: any;
  fieldSchema?: any;
  style?: string;
  isDisabled?: boolean;
  label?: string;
}

const fieldComponents: Record<
  string,
  (props: Omit<FieldComponentProps, 'fieldType'>) => JSX.Element | null
> = {
  // String Field
  ZodString: ({ field, style, isDisabled }) => (
    <Input type="text" {...field} className={style} disabled={isDisabled} />
  ),

  // Number Field
  ZodNumber: ({ field, style, isDisabled }) => (
    <Input type="number" {...field} className={style} disabled={isDisabled} />
  ),

  // Boolean Field
  ZodBoolean: ({ field, isDisabled }) => (
    <Checkbox
      checked={field.value}
      onCheckedChange={field.onChange}
      className="flex"
      disabled={isDisabled}
    />
  ),

  // String based Enum Field
  ZodEnum: ({ field, fieldSchema, style, isDisabled, label }) =>
    fieldSchema?._def?.values ? (
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(fieldSchema._def.values).map((option) => (
            <SelectItem
              key={option as string}
              value={option as string}
              className={style}
              disabled={isDisabled}
            >
              {option as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : null,

  // Custom Enum Field
  ZodNativeEnum: ({ field, fieldSchema, style, isDisabled, label }) =>
    fieldSchema?._def?.values ? (
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(fieldSchema._def.values).map((option) => (
            <SelectItem
              key={option as string}
              value={option as string}
              className={style}
              disabled={isDisabled}
            >
              {option as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : null,

  // Date Field
  ZodDate: ({ field, style, isDisabled, label }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className={`w-[407px] ${style}`} disabled={isDisabled}>
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
  ),

  // Array Field
  ZodArray: ({ field, fieldSchema, style, isDisabled }) => {
    if (fieldSchema?._def?.type instanceof ZodString) {
      return (
        <Input
          type="text"
          value={field.value ? field.value.join(', ') : ''}
          onChange={(e) => field.onChange(e.target.value.split(',').map((item) => item.trim()))}
          className={style}
          disabled={isDisabled}
          placeholder="Enter values separated by commas"
        />
      );
    }
    logger.warn(`Unsupported ZodArray type: ${fieldSchema?._def?.type}`);
    return null;
  }
};

export const FieldComponent: React.FC<FieldComponentProps> = ({ fieldType, ...props }) => {
  const Component = fieldComponents[fieldType];

  if (!Component) {
    logger.warn(`Unsupported field type: ${fieldType}`);
    return null;
  }

  return <Component {...props} />;
};
