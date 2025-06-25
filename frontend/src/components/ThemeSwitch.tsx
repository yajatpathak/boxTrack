import { useDispatch, useSelector } from "react-redux";
import { Switch } from "@mui/material";

import type { RootState } from "../store/store";
import { toggleTheme } from "../store/themeSlice";

function ThemeSwitch() {
  const theme = useSelector((state: RootState) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <>
      <Switch
        defaultChecked={theme == "light"}
        onChange={() => dispatch(toggleTheme())}
      />
      {theme}
    </>
  );
}

export default ThemeSwitch;
