import { toast } from "react-toastify";
import { 
    Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, 
    useDisclosure, Input, Select, SelectItem, DatePicker
} from '@nextui-org/react';
import { newUser } from '@/api';
import { useCreateFormConfig } from '@/hooks/useCreateFormConfig';

import PlusIcon from '@/icons/Plus'

import {useState} from 'react'

export const UserDialog = ({onCreate}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [email, setEmail] = useState()
  const [fullname, setFullname] = useState('')
  const [password, setPassword] = useState()
  const [repassword, setRepassword] = useState()

  const validate = (email, fullname, password, repassword) => {
    if (!email || email.length === 0) {
      throw new Error('Email cannot be empty')
    }
    if (!fullname || fullname.length === 0) {
      throw new Error('Full name cannot be empty')
    }
    if (!(String(email).toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
      throw new Error('Email is not a valid email format')
    }
    if (!password || password.length < 6) {
      throw new Error('Password length should be greater than 6 characters')
    }
    if (password !== repassword) {
      throw new Error('Please reconfirm your password')
    }
  }
  return (
    <>
      <Button color='primary' onPress={onOpen} variant='light' size='md' >
        <PlusIcon />{" "}New User
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
              <ModalHeader className='flex flex-col gap-1'>New User</ModalHeader>
              <ModalBody>
                <div className=''>
                  <Input type='text' label="Email" value={email} variant='bordered' className='mb-4' isRequired
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Input type='text' label="Full name" value={fullname} variant='bordered' className='mb-4' isRequired
                    onChange={(e) => setFullname(e.target.value)}
                  />
                  <Input type='password' label="Password" value={password} variant='bordered' className='mb-4' isRequired
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Input type='password' label="Re enter password" value={repassword} variant='bordered' className='mb-4' isRequired
                    onChange={(e) => setRepassword(e.target.value)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant='flat' color='primary' onPress={() => {
                    try {
                      validate(email, fullname, password, repassword)
                      onCreate({email, fullname, password});
                      onClose()
                    }
                    catch(e) {
                      toast.error(e.message, { autoClose: 1000 })
                    }
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

