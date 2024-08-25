import {
  Checkbox,
  Input,
  InputProps,
  CheckboxProps,
  DatePicker,
  DatePickerProps,
  Autocomplete,
  AutocompleteItem,
} from '@nextui-org/react';

export type InputOptionsType = 'text' | 'checkbox' | 'file' | 'date-time' | 'autocomplete';

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
    case 'autocomplete':
      return (
        <Autocomplete
          label='Select frequency'
          className='mb-4'
        >
          <AutocompleteItem
            key='hour'
            value='hour'
          >
            1 hours
          </AutocompleteItem>
          <AutocompleteItem
            key='day'
            value='daily'
          >
            1 day
          </AutocompleteItem>
        </Autocomplete>
      );
    default:
      return <Input {...(props as InputProps)} />;
  }
};
