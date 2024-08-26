import { useDataConfig } from '@/hooks/useDataConfig';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';

export const DeleteModal = () => {
  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();

  const { name } = useDataConfig();

  return (
    <>
      <Button
        color='danger'
        onPress={onOpenDelete}
        variant='light'
        size='lg'
      >
        Remove selected {name.toLowerCase()}
      </Button>
      <Modal
        isOpen={isOpenDelete}
        className=''
        onOpenChange={onOpenChangeDelete}
        placement='top'
        backdrop='opaque'
        classNames={{
          backdrop: 'bg-background/60',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='text-danger-500'>Remove selected {name.toLowerCase()}</ModalHeader>
              <ModalBody>
                <div className='mb-4'>
                  <p className='mb-2'>Are you want to remove all selected stores?</p>
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
                  color='danger'
                  onPress={onClose}
                >
                  Remove
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
