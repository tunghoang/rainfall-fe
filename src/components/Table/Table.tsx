import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination } from '@nextui-org/react';

interface IProps {
  data: any[];
  page: number;
  totalPages: number;
}

export const CustomTable = ({ data, page, totalPages }: IProps) => {
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
      <TableHeader>
        <TableColumn>Data Type</TableColumn>
        <TableColumn>Workspace</TableColumn>
        <TableColumn>Store Name </TableColumn>
        <TableColumn>Type</TableColumn>
        <TableColumn>Enabled?</TableColumn>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{item.dataType}</TableCell>
            <TableCell>{item.workspace}</TableCell>
            <TableCell>{item.storeName}</TableCell>
            <TableCell>{item.type}</TableCell>
            <TableCell>{item.enabled}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
