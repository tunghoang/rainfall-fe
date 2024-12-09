import _tr from "../translation"

import {Button, Input, Modal, ModalContent, ModalHeader, ModalFooter, ModalBody} from '@nextui-org/react'
import {useState} from 'react'
export default function({isOpen, onOpenChange, onLogin}) {
    const [username, setUsername] = useState(null)
    const [password, setPassword] = useState(null)
    const doLogin = () => {
        console.log("doLogin")
        onLogin(username, password)
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
              <ModalHeader className='flex flex-col gap-1'>Sign In</ModalHeader>
              <ModalBody>
                <div className='flex flex-col gap-4'>
                  <Input type="text" label={_tr("Email")} placeholder={_tr("Enter email")} 
                    value={username} onChange={(evt) => setUsername(evt.target.value)}/>
                  <Input type="password" label={_tr("Password")} placeholder={_tr("Enter your password")} 
                    value={password} onChange={(evt) => setPassword(evt.target.value)}/>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant='flat' onPress={onClose} >{_tr('Close')}</Button>
                <Button color='primary' onPress={ () => {
                    doLogin();onClose()
                }} >{_tr('OK')}</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    )
}
