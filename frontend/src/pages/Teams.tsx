import { useState } from "react";
import TeamsTabel from "../components/TeamsTable";
import ActiveFilter from "../components/ActiveFilter";
import SearchFilter from "../components/SearchFilter";
import { Box, Stack, Typography } from "@mui/material";

function Teams() {
  const [is_active, setIs_active] = useState<boolean | undefined>(undefined);
  const [search, setSearch] = useState("");

  return (
    <Box sx={{ margin: 2 }}>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Teams
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <SearchFilter setSearch={setSearch} />
        <ActiveFilter is_active={is_active} setIs_active={setIs_active} />
      </Stack>
      <TeamsTabel search={search} is_active={is_active} />
    </Box>
  );
}

export default Teams;
