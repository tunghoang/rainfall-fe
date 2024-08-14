import DefaultLayout from '@/layouts/default';
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
  Chip,
  Tooltip,
  Pagination,
  Input,
  Button,
} from '@nextui-org/react';
import { DeleteIcon, EditIcon, EyeIcon, SearchIcon } from '@/components/icons';

const statusColorMap: { [key: string]: string } = {
  active: 'success',
  paused: 'danger',
  vacation: 'warning',
};

export default function DataSourcesPage() {
  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'ROLE', uid: 'role' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ];

  const users = [
    {
      id: 1,
      name: 'Tony Reichert',
      role: 'CEO',
      team: 'Management',
      status: 'active',
      age: '29',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
      email: 'tony.reichert@example.com',
    },
    {
      id: 2,
      name: 'Zoey Lang',
      role: 'Technical Lead',
      team: 'Development',
      status: 'paused',
      age: '25',
      avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
      email: 'zoey.lang@example.com',
    },
    {
      id: 3,
      name: 'Jane Fisher',
      role: 'Senior Developer',
      team: 'Development',
      status: 'active',
      age: '22',
      avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
      email: 'jane.fisher@example.com',
    },
    {
      id: 4,
      name: 'William Howard',
      role: 'Community Manager',
      team: 'Marketing',
      status: 'vacation',
      age: '28',
      avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
      email: 'william.howard@example.com',
    },
    {
      id: 5,
      name: 'Kristen Copper',
      role: 'Sales Manager',
      team: 'Sales',
      status: 'active',
      age: '24',
      avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
      email: 'kristen.cooper@example.com',
    },
  ];

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];

    switch (columnKey) {
      case 'name':
        return (
          <User
            avatarProps={{ radius: 'lg', src: user.avatar }}
            description={user.email}
            name={cellValue}
          >
            {user.email}
          </User>
        );
      case 'role':
        return (
          <div className='flex flex-col'>
            <p className='text-bold text-sm capitalize'>{cellValue}</p>
            <p className='text-bold text-sm capitalize text-default-400'>{user.team}</p>
          </div>
        );
      case 'status':
        return (
          <Chip
            className='capitalize'
            color={
              statusColorMap[user.status] as
                | 'success'
                | 'danger'
                | 'warning'
                | 'secondary'
                | 'default'
                | 'primary'
                | undefined
            }
            size='sm'
            variant='flat'
          >
            {cellValue}
          </Chip>
        );
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Details'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip content='Edit user'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EditIcon />
              </span>
            </Tooltip>
            <Tooltip
              // color='danger'
              content='Delete user'
            >
              <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const [page, setPage] = React.useState(1);
  const pages = 100;

  return (
    <DefaultLayout>
      <section className=' flex flex-col items-center justify-center gap-4 py-8 md:py-10'>
        <div className='flex justify-between w-full'>
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
          <Button
            color='primary'
            size='md'
          >
            Add new user
          </Button>
        </div>
        <Table
          aria-label='Example table with dynamic content'
          bottomContent={
            <div className='flex w-full justify-center'>
              <Pagination
                isCompact
                showControls
                showShadow
                color='secondary'
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                align={column.uid === 'actions' ? 'center' : 'start'}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={users}>
            {(item) => (
              <TableRow key={item.id}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
            )}
          </TableBody>
        </Table>
      </section>
    </DefaultLayout>
  );
}
