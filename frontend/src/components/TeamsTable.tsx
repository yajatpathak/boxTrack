import { useEffect, useState } from "react";
import { DataGrid, type GridColDef } from "@mui/x-data-grid";

import useGetUserList from "../hooks/useGetUserList";

interface TeamsTableProps {
  is_active: boolean | undefined;
  search: string;
}

function TeamsTabel({ is_active, search }: TeamsTableProps) {
  const [page, setPage] = useState(0);

  const pageSize = 10;

  const { getUserList, userList, isLoading, totalCount } = useGetUserList();

  useEffect(() => {
    getUserList({ page: page + 1, is_active, search });
  }, [page, is_active, search]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", flex: 1 },
    { field: "first_name", headerName: "First Name", flex: 2 },
    { field: "last_name", headerName: "Last Name", flex: 2 },
    { field: "email", headerName: "Email", flex: 3 },
    { field: "is_active", headerName: "Active", type: "boolean", flex: 1 },
  ];

  return (
    <DataGrid
      rows={userList}
      columns={columns}
      loading={isLoading}
      rowCount={totalCount}
      paginationMode="server"
      pageSizeOptions={[10]}
      onPaginationModelChange={(model) => setPage(model.page)}
      paginationModel={{ page, pageSize }}
    />
  );
}

export default TeamsTabel;
