import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Button } from "@mui/material";

import useToken from "../hooks/useToken";
import ThemeSwitch from "../components/ThemeSwitch";
import { logout } from "../store/authSlice";

function Layout() {
  const token = useToken();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (token == null) navigate("/login");
  }, [token, navigate]);

  return (
    <>
      <h1>Layout</h1>
      <Button
        variant="contained"
        color="error"
        size="large"
        onClick={() => dispatch(logout())}
      >
        Log Out
      </Button>
      <ThemeSwitch />
      <Outlet />
    </>
  );
}

export default Layout;
