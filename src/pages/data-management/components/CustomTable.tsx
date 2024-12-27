import { EditIcon, DeleteIcon, SearchIcon } from '@/components/icons';
import DownloadIcon from '@/icons/Download'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, Spinner, useDisclosure } from '@nextui-org/react';
//import { ConfirmationModal } from './ConfirmationModal'
import { ConfirmationModal } from '@/dialogs/ConfirmationModal'
import React from 'react';

interface IProps {
  rows: any[];
  columns: {
    key: string;
    label: string;
  }[];
}

export const CustomTable = ({ rows, columns, loadingState,
    selectedKeys, onSelectionChange, 
    onItemDelete, 
    onItemUpdate, 
    onItemPreview,
    onItemDownload }: IProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  //const [ isOpen, onOpen ] = React.useState(false)
  const [currentItem, setCurrentItem] = React.useState(null)
  const renderCell = (item: any, columnKey: any) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case 'isAvailable':
        return cellValue ? 'Available' : 'Unavailable';
      case 'description':
        return cellValue || 'N/A';
      case 'actions':
        return (<>
          <Button
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
          </Button>
          <Button
            isIconOnly
            size='sm'
            variant='light'
            color="primary"
            className='text-lg opacity-75'
            onPress={()=> {
                console.log("Preview")
                onItemPreview(item)
            }}
          >
            <SearchIcon size={16} stroke="currentColor" fill="currentColor" />
          </Button>
          <Button
            isIconOnly
            size='sm'
            variant='light'
            color="primary"
            className='text-lg opacity-75'
            onPress={()=> {
                console.log("Download")
                onItemDownload(item)
            }}
          >
            <DownloadIcon size={16} strokeWidth={20} stroke="currentColor" fill="currentColor" />
          </Button>
          <Button
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
          </Button>
        </>);
      default:
        return cellValue;
    }
  };

  const [pageSize, setPageSize] = React.useState(23)
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
        isLoading={loadingState}
        loadingContent={<Spinner label="Loading ..." />}
        emptyContent='Loading...'
        // emptyContent='No Data'
        items={visibleRows}
      >
        {(item) => {
          return (
            <TableRow
              className={item.isAvailable ? 'ptable-row ptable-row-active' : 'ptable-row ptable-row-inactive'}
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
