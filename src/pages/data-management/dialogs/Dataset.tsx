import { useDataConfigByUrl } from '@/hooks/useDataConfigByUrl';
import { 
    Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
    useDisclosure, Input, Select, SelectItem, DatePicker
} from '@nextui-org/react';
import { postDataset } from '@/api';
import { parseDate } from '@internationalized/date'
import { useCreateFormConfig } from '@/hooks/useCreateFormConfig';

import PlusIcon from '@/icons/Plus'

import {useState} from 'react'

import FileInput from '../components/FileInput'

export const Dataset = ({dataset, onCreate, update}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  //const [name, setName] = useState(dataset.name)
  const [resolution, setResolution] = useState(new Set(["" + dataset.resolution]))
  const [frequency, setFrequency] = useState(new Set([dataset.frequency]))
  const [time, setTime] = useState(dataset.time)
  const [file, setFile] = useState(dataset.file)

  return (
    <>
      <Button color='primary' onPress={onOpen} variant='light' size='md' >
        <PlusIcon />{" "}Add New {dataset.name}
      </Button>
      <Modal
        isOpen={isOpen}
        className=''
        onOpenChange={onOpenChange}
        placement='top'
        backdrop='opaque'
        classNames={{
          backdrop: 'bg-background/60',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>Add new {dataset.name}</ModalHeader>
              <ModalBody>
                <div className=''>
                  <Input type='text' label="Product" value={dataset.name} isReadOnly
                      variant='bordered'
                      className='mb-4' />
                  <DatePicker label="Time"
                    granularity="hour"
                    className='mb-4'
                    hideTimeZone
                    showMonthAndYearPickers
                    isRequired
                    isReadOnly={update}
                    value={time}
                    onChange={setTime}
                  />
                  <Select label="Select resolution" isRequired className='mb-4' 
                    isReadOnly={update}
                    selectedKeys={resolution}
                    onSelectionChange={setResolution}>
                    <SelectItem key="10">10KM</SelectItem>
                    <SelectItem key="4">4KM</SelectItem>
                  </Select>
                  <Select label="Select frequency" isRequired className='mb-4' 
                    isReadOnly={update}
                    selectedKeys={frequency} onSelectionChange={setFrequency}>
                    <SelectItem key="daily">Daily</SelectItem>
                    <SelectItem key="hourly">Hourly</SelectItem>
                  </Select>
                  <FileInput label="select a file" onChange={(e) => setFile(e.target.files[0])}/>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant='flat' color='primary' onPress={() => {
                    onCreate({name:dataset.name,resolution: Array.from(resolution)[0], frequency: Array.from(frequency)[0], time: time.toDate(), file});
                    onClose()
                }} >Create</Button>
                <Button variant='flat' onPress={onClose} > Close </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

