import { useDispatch, useSelector } from "react-redux";
import { IconButton } from "@mui/material";
import { DarkModeOutlined, LightModeOutlined } from "@mui/icons-material";

import type { RootState } from "../store/store";
import { toggleTheme } from "../store/themeSlice";

function ThemeSwitch() {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <IconButton onClick={() => dispatch(toggleTheme())}>
      {theme === "light" ? <LightModeOutlined /> : <DarkModeOutlined />}
    </IconButton>
  );
}

export default ThemeSwitch;
