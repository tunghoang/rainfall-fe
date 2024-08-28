import { useDataConfigByUrl } from '@/hooks/useDataConfigByUrl';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import { InputFieldOptions, InputOptionsType } from './InputFieldOptions';
import { postDataset } from '@/api';
import { useCreateFormConfig } from '@/hooks/useCreateFormConfig';

export const CreateModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { name } = useDataConfigByUrl();

  const { createInputFields } = useCreateFormConfig();

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
        size='md'
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
