import { useDataConfig } from '@/hooks/useDataConfig';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { InputFieldOptions, InputOptionsType } from './InputFieldOptions';

export const CreateModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { name, dataConfig } = useDataConfig();

  const createInputs = dataConfig.filter((config) => config.isCreate);

  return (
    <>
      <Button
        color='primary'
        size='sm'
        className='mr-2'
        onPress={onOpen}
      >
        Add new {name.toLowerCase().slice(0, -1)}
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
              <ModalHeader className='flex flex-col gap-1'>Add new {name.toLowerCase().slice(0, -1)}</ModalHeader>
              <ModalBody>
                <div className=''>
                  {createInputs.map((column) => (
                    <InputFieldOptions
                      type={column.inputType as InputOptionsType}
                      label={column.label}
                      key={column.key}
                    />
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color='danger'
                  variant='flat'
                  onPress={onClose}
                >
                  Close
                </Button>
                <Button
                  color='primary'
                  onPress={onClose}
                >
                  Create
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
