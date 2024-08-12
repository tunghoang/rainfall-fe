import { Slider } from '@nextui-org/slider';
import { useState, useEffect, useContext } from 'react';
import TimeAxis from './TimeAxis';
import { format } from 'date-fns';
import { SliderContext } from './Map';

export const CustomSlider = () => {
  const { stepSlider, setStepSlider } = useContext(SliderContext) || { stepSlider: 0, setStepSlider: () => {} };

  const [displayDate, setDisplayDate] = useState<string>();

  const startDate = new Date(2024, 7, 1);
  const endDate = new Date(2024, 7, 31);

  // Function to calculate the number of days between two dates
  const calculateDaysBetween = (start: Date, end: Date) => {
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const totalSteps = calculateDaysBetween(startDate, endDate);

  useEffect(() => {
    const currentDate = addDays(startDate, stepSlider - 1);
    setDisplayDate(currentDate.toLocaleDateString());
  }, [stepSlider]);

  return (
    <div className='flex justify-center align-middle mb-4'>
      <div className='flex flex-col align-middle justify-center p-2 pb-2 rounded-md transparent-base w-5/6'>
        <div className='flex justify-between text-base'>
          <p>{format(startDate, 'dd/MM/yyyy')}</p>
          <p>
            {displayDate ? format(displayDate, 'dd/MM/yyyy') : ''} -{' '}
            <span className='text-gray-500'>{format(endDate, 'dd/MM/yyyy')}</span>
          </p>
          <p>{format(endDate, 'dd/MM/yyyy')}</p>
        </div>
        <Slider
          size='sm'
          step={1}
          maxValue={totalSteps}
          minValue={1}
          value={stepSlider}
          onChange={(value) => {
            if (typeof value === 'number') {
              setStepSlider(value);
            }
          }}
          className='py-1 rounded-lg'
          classNames={{
            thumb: 'w-4 h-4',
          }}
        />
        <TimeAxis
          startDate={startDate}
          endDate={endDate}
        />
      </div>
    </div>
  );
};
