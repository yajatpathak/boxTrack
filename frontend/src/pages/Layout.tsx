import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  Box,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import FaceOutlinedIcon from "@mui/icons-material/FaceOutlined";
import RestoreOutlinedIcon from "@mui/icons-material/RestoreOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import useCheckAuth from "../hooks/useCheckAuth";
import SideBar from "../components/SideBar";
import UserProfile from "../components/UserProfile";
import useGetUser from "../hooks/useGetUser";

const menuItems = [
  { text: "Dashboard", path: "/", icon: HomeOutlinedIcon },
  { text: "Teams", path: "/teams", icon: GroupsOutlinedIcon },
  { text: "Inventory", path: "/inventory", icon: Inventory2OutlinedIcon },
  { text: "Customers", path: "/customers", icon: FaceOutlinedIcon },
  { text: "Order History", path: "/order-history", icon: RestoreOutlinedIcon },
  {
    text: "Current Order",
    path: "/current-order",
    icon: ShoppingCartOutlinedIcon,
  },
];

function Layout() {
  const isAuthorized = useCheckAuth();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  const navigate = useNavigate();
  const location = useLocation();

  const { getUserDetails } = useGetUser();

  const sidebarWidth = 240;

  useEffect(() => {
    if (!isAuthorized) navigate("/login");
  }, [isAuthorized, navigate]);

  useEffect(() => {
    getUserDetails();
  }, []);

  return (
    <>
      <SideBar isSmallScreen={isSmallScreen} sidebarWidth={sidebarWidth}>
        <Stack justifyContent="space-between" height="100%">
          <List>
            {menuItems.map((item, i) => (
              <ListItem key={i} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                >
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <UserProfile />
        </Stack>
      </SideBar>
      <Box
        component="main"
        sx={{
          marginLeft: isSmallScreen ? 0 : `${sidebarWidth}px`,
        }}
      >
        <Outlet />
        <Fab
          component={Link}
          size="medium"
          to="/current-order"
          sx={{ bottom: 16, right: 16, position: "fixed" }}
        >
          <ShoppingCartOutlinedIcon />
        </Fab>
      </Box>
    </>
  );
}

export default Layout;
