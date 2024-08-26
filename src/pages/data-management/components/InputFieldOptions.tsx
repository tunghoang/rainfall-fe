import {
  Checkbox,
  Input,
  InputProps,
  CheckboxProps,
  DatePicker,
  DatePickerProps,
  Select,
  SelectItem,
} from '@nextui-org/react';

export type InputOptionsType = 'text' | 'checkbox' | 'file' | 'date-time' | 'autocomplete' | 'resolution' | 'frequency';

interface InputFieldOptionsProps {
  type: InputOptionsType;
  label: string;
}

// Merge props from Input and Checkbox based on the type
export const InputFieldOptions = ({ type, label, ...props }: InputFieldOptionsProps & (InputProps | CheckboxProps)) => {
  switch (type) {
    case 'text':
      return (
        <Input
          {...(props as InputProps)}
          label={label}
          variant='bordered'
          className='mb-4'
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          {...(props as CheckboxProps)}
          className='mb-4'
        >
          {label}
        </Checkbox>
      );
    case 'date-time':
      return (
        <DatePicker
          {...(props as DatePickerProps)}
          label={label}
          className='mb-4'
          // value={new CalendarDate(new Date().getFullYear(), new Date().getMonth(), new Date().getDay())}
        />
      );
    case 'file':
      return (
        <>
          <p className='text-sm'>{label}</p>
          <Input
            type='file'
            className='mb-4'
          />
        </>
      );
    case 'resolution':
      return (
        <Select
          label='Select resolution'
          className='mb-4'
        >
          <SelectItem
            key='hour'
            value='hour'
          >
            4 km
          </SelectItem>
          <SelectItem
            key='day'
            value='daily'
          >
            10 km
          </SelectItem>
        </Select>
      );
    case 'frequency':
      return (
        <Select
          label='Select frequency'
          className='mb-4'
        >
          <SelectItem
            key='hour'
            value='hourly'
          >
            hourly
          </SelectItem>
          <SelectItem
            key='day'
            value='daily'
          >
            daily
          </SelectItem>
        </Select>
      );
    default:
      return <Input {...(props as InputProps)} />;
  }
};
