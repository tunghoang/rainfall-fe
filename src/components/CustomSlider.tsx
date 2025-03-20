import { Slider } from '@nextui-org/slider';
import { DateRangePicker, Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { useState, useEffect, useContext, useMemo } from 'react';
import { format } from 'date-fns';
import { SliderContext } from './Map';
import { calcStartDate, datediff } from '@/utils'
import { parseDate, parseDateTime } from '@internationalized/date';
import SettingsIcon from '@/icons/Settings'
import _tr from '@/translation'
import { formatDate } from '@/utils'

const PeriodModal = ({start, end, stepSlider, isOpen, onOpenChange, onChange}) => {

  const [period, setPeriod] = useState()

  const now = new Date()

  const days = useMemo(() => period?datediff(period.start.toDate(), period.end.toDate()):-1, [period])
  useEffect(() => {
    if (start && end) {
      setPeriod({
        start: parseDate(formatDate(start)),
        end: parseDate(formatDate(end))
      })
    }
  }, [start, end])
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className=''
      placement='top'
      backdrop='opaque'
      classNames={{
        backdrop: 'bg-background/60',
      }}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className='text-primary'>{_tr('Select time range')}</ModalHeader>
            <ModalBody>
              <div className='mb-4'>
                <DateRangePicker 
                  value={period}
                  onChange={(p) => {
                    console.log('pERIOD', period)
                    setPeriod(p)
                  }}
                  label='Time duration'
                  className='max-w-md'
                  maxValue={parseDate(formatDate(now))}
                  size='sm'
                  pageBehavior='single'
                  visibleMonths={1}
                />
              </div>
              {!period?(<div className='mb-4'>
                <p className='text-danger text-tiny'>{_tr('Time range is not valid')}</p>
              </div>):null}
              {(days > 30)?(<div className='mb-4'>
                <p className='text-danger text-tiny'>{_tr('Time range should be less than 30 days')}</p>
              </div>):null}
              {(days < stepSlider)?(<div className='mb-4'>
                <p className='text-danger text-tiny'>{_tr('Time range should be greater than') + " " + stepSlider + " " + _tr('days')}</p>
              </div>):null}
            </ModalBody>
            <ModalFooter>
              <Button color='primary' variant='flat' isDisabled={!period || days > 30 || days < stepSlider }
                onClick={() => {onClose(); onChange(period)}} > {_tr('Ok')} </Button>
              <Button onClick={onClose} variant='flat'> {_tr('Close')} </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}
export const CustomSlider = ({endDate, startDate, onChange, onRangeChange}) => {
  const { stepSlider, setStepSlider } = useContext(SliderContext) || { stepSlider: 0, setStepSlider: () => {} };

  const [displayDate, setDisplayDate] = useState<string>();

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

  const {isOpen, onOpen, onOpenChange} = useDisclosure()
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
    if (stepSlider > 0) {
      const currentDate = addDays(startDate1, stepSlider - 1);
      setDisplayDate(currentDate.toLocaleDateString());
      onChange(startDate1, stepSlider)
    }
  }, [startDate1, stepSlider]);

  useEffect(() => {
    if ( !stepSlider ) {
      setStepSlider(totalSteps);
    }
  }, [stepSlider])

  return (
    <div className='flex flex-col justify-center p-1.5 pb-0 bg-white grow'>
      <div className='flex justify-between items-end text-xs'>
        <p>{format(startDate1, 'dd/MM/yyyy')}</p>
        <div>
          <Button className="text-primary align-middle" isIconOnly size='sm' radius='none' variant='light' 
            onClick={() => {
              console.log("date range")
              onOpen()
            }}>
            <SettingsIcon size={16} />
          </Button>
          {displayDate ? <div className='inline-block bg-primary text-white px-2'>{format(displayDate, 'dd/MM/yyyy')} </div>: ''}
        </div>
        <p>{format(endDate1, 'dd/MM/yyyy')}</p>
      </div>
      <PeriodModal start={startDate1} end={endDate1} stepSlider={stepSlider} isOpen={isOpen} onOpenChange={onOpenChange} 
        onChange={(p) => {
          console.log(p);
          onRangeChange(p)
        }} />
      <Slider
        aria-label="time-slider"
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
    </div>
  );
};
