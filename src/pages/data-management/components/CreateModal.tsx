import { useDataConfigByUrl } from '@/hooks/useDataConfigByUrl';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { InputFieldOptions, InputOptionsType } from './InputFieldOptions';
import { postDataset } from '@/api';
import { useCreateFormConfig } from '@/hooks/useCreateFormConfig';

import PlusIcon from '@/icons/Plus'

import {useState} from 'react'

export const CreateModal = ({onCreate}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { name } = useDataConfigByUrl();

  const { createInputFields } = useCreateFormConfig();

  const [ instance, setInstance ] = useState({
    name: '',
    resolution: 4,
    frequency: 'daily',
    time: new Date(),
    file: null
  })
  const handlePostDataset = async () => {
    try {
      await postDataset('Name', 4, 'daily', new Date(), new File([], 'file'));
    } catch {
      console.log('Post dataset fail');
    }
  };

  return (
    <>
      <Button
        color='primary'
        onPress={onOpen}
        variant='light'
        size='md'
      >
        <PlusIcon />{" "}Add New {name}
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
              <ModalHeader className='flex flex-col gap-1'>Add new {name}</ModalHeader>
              <ModalBody>
                <div className=''>
                  {createInputFields.map((inputField) => (
                    <InputFieldOptions
                      key={inputField.key}
                      type={inputField.createFormConfig?.inputType as InputOptionsType}
                      label={inputField.createFormConfig?.label as string}
                      metadata={inputField.createFormConfig?.metadata}
                      isRequired={inputField.createFormConfig?.isRequired}
                      isDisabled={inputField.createFormConfig?.isDisabled}
                    />
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant='flat' color='primary' onPress={() => onCreate("Hic hic")} >Create</Button>
                <Button variant='flat' onPress={onClose} > Close </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
