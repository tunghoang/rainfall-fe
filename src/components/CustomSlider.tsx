import { Slider } from '@nextui-org/slider';
import { useState, useEffect, useContext, useMemo } from 'react';
//import TimeAxis from './TimeAxis';
import { format } from 'date-fns';
import { SliderContext } from './Map';
import { calcStartDate } from '@/utils'

export const CustomSlider = ({endDate, startDate, onChange}) => {
  const { stepSlider, setStepSlider } = useContext(SliderContext) || { stepSlider: 0, setStepSlider: () => {} };

  const [displayDate, setDisplayDate] = useState<string>();

  console.log("...", endDate);
  const endDate1 = useMemo(() => ( endDate || new Date() ), [endDate])
  const startDate1 = useMemo(() => {
    if ( startDate ) {
      return new Date(startDate)
    }
    const now = new Date(endDate1)
    now.setDate(now.getDate() - 22)
    return now
  }, [startDate, endDate1]) 
  /*const startDate = useMemo(() => {
    const now = new Date(endDate1)
    now.setDate(now.getDate() - 22)
    return now
  }, [endDate1])*/

  // Function to calculate the number of days between two dates
  const calculateDaysBetween = (start: Date, end: Date) => {
    try {
      if (start === null || end === null) {
        return 10
      }
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    catch(e) {
      console.log("Errorrrrr", e)
      throw e
    }
  };

  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };

  const totalSteps = useMemo(() => (calculateDaysBetween(startDate1, endDate1)), [startDate1]);

  useEffect(() => {
    const currentDate = addDays(startDate1, stepSlider - 1);
    setDisplayDate(currentDate.toLocaleDateString());
    onChange(startDate1, stepSlider)
  }, [startDate1, stepSlider]);

  return (
    <div className='flex flex-col align-middle justify-center p-1.5 pb-0 transparent-base grow'>
      <div className='flex justify-between text-base'>
        <p>{format(startDate1, 'dd/MM/yyyy')}</p>
        <p>
          {displayDate ? format(displayDate, 'dd/MM/yyyy') : ''} - {' '}
          <span className='text-gray-500'>{format(endDate1, 'dd/MM/yyyy')}</span>
        </p>
        <p>{format(endDate1, 'dd/MM/yyyy')}</p>
      </div>
      <Slider
        size='sm'
        step={1}
        showSteps={true}
        maxValue={totalSteps}
        minValue={1}
        value={stepSlider}
        onChange={(value) => {
          if (typeof value === 'number') {
            setStepSlider(value);
            onChange(startDate1, value)
          }
        }}
        className='pb-0.5 rounded-lg'
        classNames={{
          thumb: 'w-4 h-4',
        }}
      />
      {/*<TimeAxis
        startDate={startDate1}
        endDate={endDate1}
      />*/}
    </div>
  );
};
