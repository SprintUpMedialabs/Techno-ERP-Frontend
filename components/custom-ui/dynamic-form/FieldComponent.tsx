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
import { CalendarDaysIcon } from 'lucide-react';

interface FieldComponentProps {
  fieldType: string;
  field: any;
  fieldSchema?: any;
  placeholder?: string;
  fieldClass?: string;
  isDisabled?: boolean;
  label?: string;
}

const fieldComponents: Record<
  string,
  (props: Omit<FieldComponentProps, 'fieldType'>) => JSX.Element | null
> = {
  
  // String Field
  ZodString: ({ field, fieldClass, isDisabled, placeholder }) => (
    <Input
      placeholder={placeholder}
      type="text" {...field} className={fieldClass} disabled={isDisabled} />
  ),

  // Number Field
  ZodNumber: ({ field, fieldClass, isDisabled, placeholder }) => (
    <Input
      type="number"
      placeholder={placeholder}
      value={field.value || ''}
      onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
      className={fieldClass}
      disabled={isDisabled}
    />
  ),

  // Boolean Field
  ZodBoolean: ({ field, fieldClass, isDisabled, label }) => (
  <div className="flex items-center">
    <Checkbox
      checked={field.value}
      onCheckedChange={field.onChange}
      className={fieldClass}
      disabled={isDisabled}
    />
    <label className={`ml-2 w-full`}>{label}</label>
  </div>
  ),

  // String based Enum Field
  ZodEnum: ({ field, fieldSchema, fieldClass, isDisabled, label }) =>
    fieldSchema?._def?.values ? (
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger  className={fieldClass} disabled={isDisabled}>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(fieldSchema._def.values).map((option) => (
            <SelectItem
              key={option as string}
              value={option as string}
              disabled={isDisabled}
            >
              {option as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : null,

  // Custom Enum Field
  ZodNativeEnum: ({ field, fieldSchema, fieldClass, isDisabled, label }) =>
    fieldSchema?._def?.values ? (
      <Select onValueChange={field.onChange} defaultValue={field.value}>
        <SelectTrigger  className={fieldClass} disabled={isDisabled}>
          <SelectValue placeholder={`Select ${label}`} />
        </SelectTrigger>
        <SelectContent>
          {Object.values(fieldSchema._def.values).map((option) => (
            <SelectItem
              key={option as string}
              value={option as string}
              className={fieldClass}
              disabled={isDisabled}
            >
              {option as string}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    ) : null,

  // Date Field
  ZodDate: ({ field, fieldClass, isDisabled, label }) => (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          className={`${fieldClass} justify-between bg-inherit`}
          disabled={isDisabled}
        >
        
          <span>{field.value ? format(field.value, 'dd/MM/yyyy') : label}</span>
        
          <CalendarDaysIcon size={16} className="ml-2" />
        
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
  ZodArray: ({ field, fieldSchema, fieldClass, isDisabled }) => {
    if (fieldSchema?._def?.type instanceof ZodString) {
      return (
        <Input
          type="text"
          value={field.value ? field.value.join(', ') : ''}
          onChange={(e) => field.onChange(e.target.value.split(',').map((item) => item.trim()))}
          className={fieldClass}
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
