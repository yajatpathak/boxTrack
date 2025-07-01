import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import useCheckAuth from "../hooks/useCheckAuth";

function ErrorPage() {
  const isAutharized = useCheckAuth();
  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box>
        <Typography variant="h3" marginBottom={3}>
          Oops...
        </Typography>
        <Typography variant="h5" marginBottom={2}>
          This page does not exist.
        </Typography>
      </Box>
      <Button component={Link} to={isAutharized ? "/" : "/login"}>
        {isAutharized ? "Go to Dashboard" : "LogIn"}
      </Button>
    </Box>
  );
}

export default ErrorPage;
