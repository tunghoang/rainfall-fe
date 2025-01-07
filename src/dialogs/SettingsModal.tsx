import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { Tabs, Tab, Button, Select, SelectItem, Input,
    Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@nextui-org/react';
import _tr from '@/translation'
import {changePassword} from '@/api'

export const SettingsModal = ({isOpen, onOpenChange}) => {
  const [password, setPassword] = useState()
  const [password1, setPassword1] = useState()
  const [lang, setLang] = useState(new Set([localStorage.getItem('lang') || 'en']))
  const navigate = useNavigate()
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
              <ModalHeader className='text-primary'>{_tr('Settings')}</ModalHeader>
              <ModalBody>
                <div className='mb-4'>
                  <Tabs aria-label="Options">
                    <Tab key="language" title={_tr("Language")}>
                      <div className='flex flex-col gap-4'>
                        <Select selectedKeys={lang} label={_tr("Choose your language")} onSelectionChange={(l) => {
                          console.log(l)
                          setLang(l)
                        }}>
                          <SelectItem key="vi">Vietnam</SelectItem>
                          <SelectItem key="en">English</SelectItem>
                        </Select>
                        <Button color='primary' size='sm' type='solid' radius='sm' onClick={() => {
                          localStorage.setItem('lang', Array.from(lang)[0])
                          navigate('/')
                        }}>{_tr("Apply")}</Button>
                      </div>
                    </Tab>
                    <Tab key="security" title={_tr("Security")}>
                      <div className='flex flex-col gap-4'>
                        <Input type="password" label={_tr("New password")} placeholder={_tr("Enter new password")} 
                          value={password} onChange={(evt) => setPassword(evt.target.value)}/>
                        <Input type="password" label={_tr("Confirrm your Password")} placeholder={_tr("Enter your password")} 
                          value={password1} onChange={(evt) => setPassword1(evt.target.value)}/>
                        <Button color='primary' size='sm' type='solid' radius='sm' onClick={() => {
                          console.log('Change password')
                          changePassword(password)
                        }}>{_tr("Apply")}</Button>
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
  );
};
