import { useEffect, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutIcon from "@mui/icons-material/Logout";

import useLogout from "../hooks/useLogout";
import useGetUser from "../hooks/useGetUser";
import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function UserProfile() {
  const logoutUser = useLogout();
  const { getUserDetails } = useGetUser();
  const user = useSelector((state: RootState) => state.user);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        paddingX: 2,
        paddingY: 1,
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 2,
      }}
    >
      <Box>
        <Typography variant="subtitle1" fontWeight={600}>
          {user.firstName} {user.lastName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </Box>

      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>

      <Menu
        open={open}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
        sx={{ minWidth: 150 }}
      >
        <Divider />
        <MenuItem
          onClick={logoutUser}
          color="error"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            color: "error.main",
          }}
        >
          <LogoutIcon color="error" fontSize="small" />
          Logout
        </MenuItem>
      </Menu>
    </Stack>
  );
}

export default UserProfile;
