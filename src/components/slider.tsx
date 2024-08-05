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
    <div className='flex justify-center align-middle p-4'>
      <div className='flex flex-col align-middle justify-center bg-white p-4 rounded-md'>
        <p className='mx-auto pb-2 text-lg'>
          {displayDate ? format(displayDate, 'dd/MM/yyyy'): ''} - <span className='text-gray-500'>31/12/2024</span>
        </p>
        <div className='mx-auto'>
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
            className='w-[880px] bg-white px-6 py-4 rounded-lg'
          />
        </div>
        <div className='mx-auto'>
          <TimeAxis
            width={800}
            height={40}
          />
        </div>
        <div className='flex justify-between text-md font-bp'>
          <p>1/8/2024</p>
          <p>31/12/2024</p>
        </div>
      </div>
    </div>
  );
};
