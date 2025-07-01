import { useState, type ReactNode } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import ThemeSwitch from "./ThemeSwitch";

interface SideBarProps {
  children: ReactNode;
  sidebarWidth: number;
  isSmallScreen: boolean;
}

function SideBar({ children, sidebarWidth, isSmallScreen }: SideBarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {isSmallScreen && (
        <IconButton
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Sidebar"
        >
          <MenuIcon />
        </IconButton>
      )}
      {isSmallScreen && !mobileOpen && <ThemeSwitch />}
      <Drawer
        variant={isSmallScreen ? "temporary" : "permanent"}
        anchor="left"
        open={!isSmallScreen || mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          width: 240,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: sidebarWidth,
            boxSizing: "border-box",
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          padding={1}
        >
          <ThemeSwitch />
          {isSmallScreen && (
            <IconButton
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Close Sidebar"
            >
              <MenuOpenIcon />
            </IconButton>
          )}
        </Box>
        {children}
      </Drawer>
    </>
  );
}

export default SideBar;
