import _tr from "../translation"

import { toast } from "react-toastify";
import {Button, Input, Modal, ModalContent, ModalHeader, ModalFooter, ModalBody} from '@nextui-org/react'
import {useState} from 'react'
import { register } from '@/api'

export default function({isOpen, onOpenChange, onLogin}) {
    const [username, setUsername] = useState(null)
    const [fullname, setFullname] = useState(null)
    const [password, setPassword] = useState(null)
    const [rePassword, setRePassword] = useState(null)
    const [registerFlag, setRegister] = useState(false)
    const doLogin = () => {
        console.log("doLogin")
        onLogin(username, password)
    }
    const doRegister = async () => {
        console.log("doRegister")
        if (password !== rePassword) {
            toast.error("passwords are not match", {autoClose: 1000})
            return;
        }
        register(username, password, fullname)
        toast.success(`User ${username} registration: Success`, {autoClose: 1000})
    }
    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} 
        placement='top' backdrop='opaque'
        classNames={{
          backdrop: 'bg-background/60',
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>{registerFlag?_tr('Register'):_tr('Sign In')}</ModalHeader>
              <ModalBody>
                {registerFlag?<div className='flex flex-col gap-4'>
                  <Input type="text" label={_tr("Email")} placeholder={_tr("Enter email")} 
                    value={username} onChange={(evt) => setUsername(evt.target.value)}/>
                  <Input type="text" label={_tr("Full name")} placeholder={_tr("Full name")} 
                    value={fullname} onChange={(evt) => setFullname(evt.target.value)}/>
                  <Input type="password" label={_tr("Password")} placeholder={_tr("Enter your password")} 
                    value={password} onChange={(evt) => setPassword(evt.target.value)}/>
                  <Input type="password" label={_tr("Confirm your password")} placeholder={_tr("Enter your password again")} 
                    value={rePassword} onChange={(evt) => setRePassword(evt.target.value)}/>
                </div>:<div className='flex flex-col gap-4'>
                  <Input type="text" label={_tr("Email")} placeholder={_tr("Enter email")} 
                    value={username} onChange={(evt) => setUsername(evt.target.value)}/>
                  <Input type="password" label={_tr("Password")} placeholder={_tr("Enter your password")} 
                    value={password} onChange={(evt) => setPassword(evt.target.value)}/>
                </div>}
              </ModalBody>
              <ModalFooter>
                {registerFlag?<span className='grow'>
                    <div>{_tr('Already have an account?')}</div>
                    <a className="text-primary underline" href="#" onClick={() => setRegister(false)}>{_tr('Log in')}</a>
                </span>:<span className='grow'>
                    <div>{_tr('Do not have an account?')}</div>
                    <a className="text-primary underline" href="#" onClick={() => setRegister(true)}>{_tr('Register')}</a>
                </span>}
                <Button variant='flat' onPress={onClose} >{_tr('Close')}</Button>
                <Button color='primary' onPress={ () => {
                    if (registerFlag) {
                        doRegister();
                    }
                    else {
                        doLogin();
                        onClose()
                    }
                }} >{_tr('OK')}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}
