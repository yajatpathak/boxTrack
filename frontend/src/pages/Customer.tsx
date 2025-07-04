import { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";

import CreateCustomerForm from "../components/CreateCustomerForm";
import CustomersTable from "../components/CustomersTable";
import SearchFilter from "../components/SearchFilter";
import ActiveFilter from "../components/ActiveFilter";

function Customer() {
  const [is_active, setIs_active] = useState<boolean | undefined>(undefined);
  const [search, setSearch] = useState("");

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Customers
      </Typography>
      <Stack
        direction="row"
        sx={{ mb: 2 }}
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack direction="row" spacing={2} alignItems="center">
          <SearchFilter setSearch={setSearch} />
          <ActiveFilter is_active={is_active} setIs_active={setIs_active} />
        </Stack>
        <CreateCustomerForm />
      </Stack>
      <CustomersTable is_active={is_active} search={search} />
    </Box>
  );
}

export default Customer;
