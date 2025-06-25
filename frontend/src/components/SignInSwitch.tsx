import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function SignInSwitch() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    newValue: string
  ) => {
    navigate(newValue);
  };

  return (
    <ToggleButtonGroup
      size="large"
      value={pathname}
      exclusive
      onChange={handleChange}
      sx={{ mt: 6 }}
    >
      <ToggleButton value="/login">Login</ToggleButton>
      <ToggleButton value="/register">Register</ToggleButton>
    </ToggleButtonGroup>
  );
}

export default SignInSwitch;
