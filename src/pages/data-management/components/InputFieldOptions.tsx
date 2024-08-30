import {
  Checkbox,
  Input,
  InputProps,
  CheckboxProps,
  DatePicker,
  DatePickerProps,
  Select,
  SelectItem,
  SelectProps,
} from '@nextui-org/react';
import { now, getLocalTimeZone } from '@internationalized/date';
import { useDataConfigByUrl } from '@/hooks/useDataConfigByUrl';

export type InputOptionsType = 'text' | 'date-time' | 'checkbox' | 'select' | 'file';

interface IProps {
  type: InputOptionsType;
  label: string;
  metadata?: any;
}

export type InputFieldOptionsProps = IProps & (InputProps | DatePickerProps | CheckboxProps | SelectProps);

export const InputFieldOptions = ({ type, label, metadata, ...props }: InputFieldOptionsProps) => {
  const { name } = useDataConfigByUrl();

  switch (type) {
    case 'text':
      return (
        <Input
          {...(props as InputProps)}
          label={label}
          variant='bordered'
          className='mb-4'
          defaultValue={metadata?.isDataName ? name : ''}
        />
      );
    case 'date-time':
      return (
        <DatePicker
          {...(props as DatePickerProps)}
          label={label}
          className='mb-4'
          hideTimeZone
          showMonthAndYearPickers
          isRequired
          defaultValue={now(getLocalTimeZone())}
        />
      );
    case 'checkbox':
      return (
        <Checkbox
          {...(props as CheckboxProps)}
          className='mb-4'
          checked
        >
          {label}
        </Checkbox>
      );
    case 'select':
      return (
        <Select
          {...(props as SelectProps)}
          label='Select resolution'
          isRequired
          className='mb-4'
          defaultSelectedKeys='all'
        >
          {metadata?.options?.map((option: any) => (
            <SelectItem
              key={option.key}
              value={option.key}
            >
              {option.value}
            </SelectItem>
          ))}
        </Select>
      );
    case 'file':
      return (
        <>
          <p className='text-sm'>{label}</p>
          <Input
            {...(props as InputProps)}
            type='file'
            className='mb-4'
          />
        </>
      );

    default:
      return <Input {...(props as InputProps)} />;
  }
};
