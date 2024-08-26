import { useDataConfig } from '@/hooks/useDataConfig';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { InputFieldOptions, InputOptionsType } from './InputFieldOptions';
import { postDataset } from '@/api';

export const CreateModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { name, dataConfig } = useDataConfig();

  const createInputs = dataConfig.filter((config) => config.isCreate);

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
        // variant='light'
        size='lg'
      >
        Add new {name.toLowerCase()}
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
              <ModalHeader className='flex flex-col gap-1'>Add new {name.toLowerCase()}</ModalHeader>
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
                  onPress={handlePostDataset}
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
