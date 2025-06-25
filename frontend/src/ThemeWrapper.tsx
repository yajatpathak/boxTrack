import type { ReactNode } from "react";
import { useSelector } from "react-redux";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

import type { RootState } from "./store/store";

const lightTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

interface ThemeWrapperProps {
  children: ReactNode;
}

function ThemeWrapper({ children }: ThemeWrapperProps) {
  const mode = useSelector((state: RootState) => state.theme.mode);
  const theme = mode == "dark" ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default ThemeWrapper;
