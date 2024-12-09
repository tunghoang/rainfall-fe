import { EditIcon, DeleteIcon } from '@/components/icons';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, useDisclosure } from '@nextui-org/react';
import { ConfirmationModal } from '@/dialogs/ConfirmationModal'
import React from 'react';

export const UserTable = ({ rows, columns, 
    selectedKeys, onSelectionChange, 
    onItemDelete, onItemUpdate }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [currentItem, setCurrentItem] = React.useState(null)
  const renderCell = (item: any, columnKey: any) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case 'actions':
        return (<>
          {onItemUpdate?<Button
            isIconOnly
            size='sm'
            variant='light'
            color="primary"
            onPress={()=> {
                console.log("Edit")
                onItemUpdate(item)
            }}
            className='text-lg opacity-75'
          >
            <EditIcon size={16} stroke="currentColor" fill="currentColor" />
          </Button>:null}
          {onItemDelete?<Button
            color="danger"
            isIconOnly
            size='sm'
            variant='light'
            className='text-lg'
            onPress={()=> {
                console.log("Delete", item)
                setCurrentItem(item)
                onOpen()
            }}
          >
            <DeleteIcon size={16}/>
          </Button> : null}
        </>);
      default:
        return cellValue;
    }
  };

  const [pageSize, setPageSize] = React.useState(10)
  const [page, setPage] = React.useState(1)
  const pages = React.useMemo(() => Math.ceil(rows.length / pageSize), [pageSize, rows]);

  const visibleRows = React.useMemo(() => rows.slice((page - 1)*pageSize, Math.min(page*pageSize, rows.length)), [page, rows])

  return (
    <Table aria-label="data table"
      color='primary'
      selectionMode='multiple'
      selectedKeys={selectedKeys}
      onSelectionChange={onSelectionChange}
      topContent={
        <div className='flex w-full justify-end'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='default'
            page={page}
            total={pages}
            onChange={(page) => setPage(page)}
          />
        </div>
      }
      bottomContent={
        <ConfirmationModal isOpen={isOpen} onOpenChange={onOpenChange} userData={currentItem}
            onYes={(userData) => {
              console.log("...", userData)
              onItemDelete(userData)
            }}
        />
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        loadingContent='Loading...'
        emptyContent='No data'
        items={visibleRows}
      >
        {(item) => {
          return (
            <TableRow
              className='ptable-row ptable-row-active'
              key={item.key}
            >
              {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
            </TableRow>
            // <TableRow key={item.key}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
          );
        }}
      </TableBody>
    </Table>
  );
};

