import { EditIcon } from '@/components/icons';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Tooltip,
} from '@nextui-org/react';
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
      case 'actions':
        return (
          <div className='relative flex items-center gap-2'>
            <Tooltip content='Edit'>
              <span className='text-lg text-default-400 cursor-pointer active:opacity-50'>
                <EditIcon />
              </span>
            </Tooltip>
            {/* <Tooltip
              color='danger'
              content='Delete'
            >
              <span className='text-lg text-danger cursor-pointer active:opacity-50'>
                <DeleteIcon />
              </span>
            </Tooltip> */}
          </div>
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
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>{(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}</TableRow>
          // <TableRow key={item.key}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
};
