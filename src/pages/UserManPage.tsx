import { useState, useContext, useEffect } from 'react'
import { title } from '@/components/primitives';
import DefaultLayout from '@/layouts/default';
import { UserTable } from '@/components/UserTable';
import { listUsers, newUser, deleteUsers } from '@/api'
import { UserContext } from '@/App'
import { UserDialog } from '@/dialogs/UserDialog'
import { Button, useDisclosure } from '@nextui-org/react';
import CloseIcon from '@/icons/Close'
import { ConfirmationModal } from '@/dialogs/ConfirmationModal';
import { toast } from "react-toastify";


export default function UserManPage() {
  const [selectedKeys, setSelectedKeys] = useState(new Set([]))
  const [rows, setRows] = useState([])
  const [reload, setReload] = useState(0)
  const token = useContext(UserContext)
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const columns = [{
    key: 'email',
    label: 'Email'
  }, {
    key: 'fullname',
    label: 'Full Name'
  }, {
    key: 'actions',
    label: 'Actions'
  }]

  const userDelete = (userIds: string[]) => {
    console.log(userIds)
    deleteUsers(userIds)
    setReload(reload + 1)
  }

  useEffect(() => {
    console.log("Reload:", reload)
    listUsers(1000, 0, token).then(users => {
      setRows(users)
    }).catch(e => {
      console.error(e)
    })
  },[reload])
  return (
    <DefaultLayout>
      <section className='flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <h1 className='text-2xl font-bold text-left w-full'>User Accounts</h1>
        <div className='flex justify-start gap-2.5 w-full'>
          <div className='flex-1 flex justify-end gap-2.5 items-center '>
            <UserDialog onCreate={(data) => {
                console.log(data)
                newUser(data).then(res => toast.success(res.message, {autoClose: 1000}))
                setReload(reload + 1)
            }}/>
            <Button color='danger' onPress={onOpen} variant='light' size='md' isDisabled={selectedKeys.size===0} >
                <CloseIcon />{" "}Remove selected users
            </Button>
            <ConfirmationModal isOpen={isOpen} onOpenChange={onOpenChange} onOpen={onOpen} userData={{confirmTitle: "Delete users"}}
                onYes={(udata) => {
                    console.log(selectedKeys);
                    userDelete(Array.from(selectedKeys).map(key => +key))
                }
            } />
          </div>
        </div>
        <UserTable
          selectedKeys={selectedKeys}
          onSelectionChange={setSelectedKeys}
          rows={rows ?? []}
          columns={columns}
          onItemDelete={(item) => {
            console.log([item.key]);
            userDelete([+(item.key)])
          }}
        />
      </section>
    </DefaultLayout>
  );
}
