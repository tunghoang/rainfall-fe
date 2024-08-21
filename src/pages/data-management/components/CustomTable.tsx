import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  getKeyValue,
} from '@nextui-org/react';

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
          <TableRow key={item.key}>{(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}</TableRow>
        )}
      </TableBody>
    </Table>
  );
};
