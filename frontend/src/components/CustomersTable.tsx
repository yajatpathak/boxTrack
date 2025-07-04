import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import useGetCustomerList from "../hooks/useGetCustomerList";

interface CustomersTableProps {
  is_active: boolean | undefined;
  search: string;
}

function CustomersTable({ is_active, search }: CustomersTableProps) {
  const [page, setPage] = useState(0);
  const pageSize = 10;

  const { getCustomerList, customerList, isLoading, count } =
    useGetCustomerList();

  useEffect(() => {
    getCustomerList({ page: page + 1, is_active, search });
  }, [page, is_active, search]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "first_name", headerName: "First Name", flex: 2 },
    { field: "last_name", headerName: "Last Name", flex: 2 },
    { field: "phone_number", headerName: "Phone Number", flex: 3 },
    { field: "email", headerName: "Email", flex: 3 },
    { field: "address", headerName: "Address", flex: 4 },
    {
      field: "is_active",
      headerName: "Active",
      flex: 1,
      type: "boolean",
    },
    {
      field: "created_at",
      headerName: "Created At",
      flex: 2,
      valueGetter: (value) => {
        const date = new Date(value);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      },
    },
    { field: "created_by", headerName: "Created By", flex: 1 },
  ];

  return (
    <DataGrid
      rows={customerList}
      columns={columns}
      loading={isLoading}
      rowCount={count}
      paginationMode="server"
      pageSizeOptions={[10]}
      onPaginationModelChange={(model) => {
        setPage(model.page);
      }}
      paginationModel={{ page, pageSize }}
    />
  );
}

export default CustomersTable;
