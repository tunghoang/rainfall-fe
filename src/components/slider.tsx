import { Slider } from '@nextui-org/slider';
import { useState, useEffect } from 'react';
import TimeAxis from './TimeAxis';
import { format } from 'date-fns';

export const CustomSlider = () => {
  const [stepSlider, setStepSlider] = useState(1);
  const [displayDate, setDisplayDate] = useState();

  const startDate = new Date(2024, 7, 1); // 1/8/2024
  const endDate = new Date(2024, 11, 31); // 31/12/2024

  // Function to calculate the number of days between two dates
  const calculateDaysBetween = (start, end) => {
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  // Function to add days to a date
  const addDays = (date, days) => {
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
      <div className='flex flex-col align-middle justify-center bg-white bg-background/90 p-2 pb-0 rounded-md'>
        <div className='flex justify-between text-medium'>
          <p>1/8/2024</p>
          <p>
            {displayDate ? format(displayDate, 'dd/MM/yyyy') : ''} - <span className='text-gray-500'>31/12/2024</span>
          </p>
          <p>31/12/2024</p>
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
          className='w-[2020px] py-1 rounded-lg'
          classNames={{
            thumb: 'w-4 h-4',
          }}
        />
        <div className='mx-auto'>
          <TimeAxis
            width={2000}
            height={32}
          />
        </div>
      </div>
    </div>
  );
};
