import { Checkbox, Input, InputProps, CheckboxProps } from '@nextui-org/react';

export type InputOptionsType = 'text' | 'checkbox' | 'file';

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
          className='mb-4 block'
        >
          {label}
        </Checkbox>
      );
    case 'file':
      return (
        <>
          {/* <Input
            label={label}
            variant='bordered'
            type='text'
            className='mb-4'
          /> */}
          <p className='text-sm'>{label}</p>
          <Input
            type='file'
            className='mb-4'
          />
        </>
      );
    default:
      return <Input {...(props as InputProps)} />;
  }
};
