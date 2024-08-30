import { CustomTable } from '@/components/Table/Table';
import DefaultLayout from '@/layouts/default';
import {
  Input,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Checkbox,
  useDisclosure,
} from '@nextui-org/react';

import { SearchIcon } from '@/components/icons';
import React from 'react';

const data = [
  {
    dataType: 'GeoTIFF',
    workspace: 'GeoTIFF',
    storeName: 'PVOUT',
    type: 'GeoTIFF',
    enabled: 'True',
  },
  {
    dataType: 'GeoTIFF',
    workspace: 'GeoTIFF',
    storeName: 'PVOUT',
    type: 'GeoTIFF',
    enabled: 'True',
  },
  {
    dataType: 'GeoTIFF',
    workspace: 'GeoTIFF',
    storeName: 'PVOUT',
    type: 'GeoTIFF',
    enabled: 'True',
  },
  {
    dataType: 'GeoTIFF',
    workspace: 'GeoTIFF',
    storeName: 'PVOUT',
    type: 'GeoTIFF',
    enabled: 'True',
  },
  {
    dataType: 'GeoTIFF',
    workspace: 'GeoTIFF',
    storeName: 'PVOUT',
    type: 'GeoTIFF',
    enabled: 'True',
  },
  {
    dataType: 'GeoTIFF',
    workspace: 'GeoTIFF',
    storeName: 'PVOUT',
    type: 'GeoTIFF',
    enabled: 'True',
  },
  {
    dataType: 'GeoTIFF',
    workspace: 'GeoTIFF',
    storeName: 'PVOUT',
    type: 'GeoTIFF',
    enabled: 'True',
  },
  {
    dataType: 'GeoTIFF',
    workspace: 'GeoTIFF',
    storeName: 'PVOUT',
    type: 'GeoTIFF',
    enabled: 'True',
  },
  {
    dataType: 'GeoTIFF',
    workspace: 'GeoTIFF',
    storeName: 'PVOUT',
    type: 'GeoTIFF',
    enabled: 'True',
  },
  {
    dataType: 'GeoTIFF',
    workspace: 'GeoTIFF',
    storeName: 'PVOUT',
    type: 'GeoTIFF',
    enabled: 'True',
  },
];

export default function DataSourcesPage() {
  const [page] = React.useState(1);
  const pages = 100;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { isOpen: isOpenDelete, onOpen: onOpenDelete, onOpenChange: onOpenChangeDelete } = useDisclosure();

  return (
    <DefaultLayout>
      <section className=' flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <>
          <div className='flex justify-between w-full'>
            <div>
              <Button
                color='primary'
                size='sm'
                className='mr-2'
                onPress={onOpen}
              >
                Add new Store
              </Button>
              <Button
                color='danger'
                size='sm'
                onPress={onOpenDelete}
              >
                Remove selected Stores
              </Button>
            </div>
            <Input
              classNames={{
                base: 'max-w-lg',
                mainWrapper: 'h-full',
                input: 'text-small',
                inputWrapper: 'h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20',
              }}
              placeholder='Type to search...'
              size='sm'
              startContent={<SearchIcon size={18} />}
              type='search'
            />
          </div>
          <CustomTable
            data={data}
            page={page}
            totalPages={pages}
          />
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
                  <ModalHeader className='flex flex-col gap-1'>Add new Store</ModalHeader>
                  <ModalBody>
                    <div className='mb-4'>
                      <p className='mb-2'>Basic Store Info</p>
                      <Input
                        autoFocus
                        label='Data Type'
                        variant='bordered'
                        className='mb-4'
                      />
                      <Input
                        label='Workspace'
                        required
                        className='mb-4'
                        variant='bordered'
                      />
                      <Input
                        label='Data Source Name'
                        required
                        className='mb-4'
                        variant='bordered'
                      />
                      <Input
                        label='Description'
                        className='mb-4'
                        variant='bordered'
                      />
                      <Checkbox
                        className='mr-8'
                        classNames={{
                          label: 'text-small',
                        }}
                      >
                        Enabled
                      </Checkbox>
                      <Checkbox
                        classNames={{
                          label: 'text-small',
                        }}
                      >
                        Auto disable on connection failure
                      </Checkbox>
                    </div>
                    <div>
                      <p className='mb-2'>Connection Parameters</p>
                      <Input
                        label='URL'
                        variant='bordered'
                        type='text'
                        className='mb-4'
                      />
                      <Input
                        type='file'
                        className='mb-4'
                      />
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
                  <ModalHeader className='text-danger-500'>Remove selected Stores</ModalHeader>
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
      </section>
    </DefaultLayout>
  );
}
