import { EditIcon } from '@/components/icons';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button } from '@nextui-org/react';
import React from 'react';

interface IProps {
  rows: any[];
  columns: {
    key: string;
    label: string;
  }[];
  page: number;
  totalPages: number;
}

export const CustomTable = ({ rows, columns, page, totalPages }: IProps) => {
  const renderCell = React.useCallback((item: any, columnKey: any) => {
    const cellValue = item[columnKey];

    switch (columnKey) {
      case 'isAvailable':
        return cellValue ? 'Available' : 'Unavailable';
      case 'description':
        return cellValue || 'N/A';
      case 'actions':
        return (
          <Button
            isIconOnly
            size='sm'
            variant='light'
            className='text-lg text-default-400 cursor-pointer active:opacity-50'
          >
            <EditIcon />
          </Button>
        );
      default:
        return cellValue;
    }
  }, []);
  return (
    <Table
      color='primary'
      selectionMode='multiple'
      bottomContent={
        <div className='flex w-full justify-center'>
          <Pagination
            isCompact
            showControls
            showShadow
            color='default'
            page={page}
            total={totalPages}
            // onChange={(page) => setPage(page)}
          />
        </div>
      }
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody
        loadingContent='Loading...'
        emptyContent='Loading...'
        // emptyContent='No Data'
        items={rows}
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
