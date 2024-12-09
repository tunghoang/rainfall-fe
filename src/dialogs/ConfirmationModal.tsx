import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from '@nextui-org/react';
import _tr from '@/translation'

export const ConfirmationModal = ({isOpen, onOpenChange, userData, onYes}) => {
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
              <ModalHeader className='text-danger-500'>{_tr(userData.confirmTitle)}</ModalHeader>
              <ModalBody>
                <div className='mb-4'>
                  <p className='mb-2'>{_tr('Are you sure')}?</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='flat' onPress={() => {onClose(); onYes(userData)}} > {_tr('Yes')} </Button>
                <Button onPress={onClose} variant='flat'> {_tr('No')} </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
};
