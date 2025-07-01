import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import SignInSwitch from "../components/SignInSwitch";
import validateEmail from "../helperFunctions/validateEmail";
import useCheckAuth from "../hooks/useCheckAuth";
import useLogin from "../hooks/useLogin";

function Login() {
  const isAutharized = useCheckAuth();
  const { loginUser, error, isLoading } = useLogin();
  const navigate = useNavigate();

  const [passError, setPassError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const handeleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setEmailError(null);
    setPassError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    let authenticate = true;

    if (email === "") {
      setEmailError("Email is Required");
      authenticate = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid Email");
      authenticate = false;
    }
    if (password === "") {
      setPassError("Password is Required");
      authenticate = false;
    }

    if (authenticate) loginUser({ email, password });
  };

  useEffect(() => {
    if (isAutharized) navigate("/");
  }, [isAutharized, navigate]);

  return (
    <Container maxWidth="sm">
      <SignInSwitch />
      <Paper elevation={10} sx={{ marginTop: 2, padding: 2 }}>
        <Typography component="h1" variant="h4" sx={{ mt: 2 }}>
          Log In
        </Typography>
        <Box
          component={"form"}
          noValidate
          sx={{ mt: 2 }}
          onSubmit={handeleSubmit}
        >
          <FormControl fullWidth>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              placeholder="you@email.com"
              type="email"
              id="email"
              name="email"
              required
              autoFocus
              sx={{ mb: 2 }}
              color={emailError ? "error" : "primary"}
              error={emailError ? true : false}
              helperText={emailError}
            />
          </FormControl>
          <FormControl fullWidth>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              placeholder="*****"
              type="password"
              id="password"
              name="password"
              required
              sx={{ mb: 2 }}
              color={passError ? "error" : "primary"}
              error={passError ? true : false}
              helperText={passError}
            />
          </FormControl>
          {error && (
            <Typography variant="body2" color="error">
              {error}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 1 }}
            disabled={isLoading}
          >
            Submit
            {isLoading && (
              <CircularProgress size={24} sx={{ position: "absolute" }} />
            )}
          </Button>
          <Link component="button" variant="body2" sx={{ mt: 1 }}>
            Forgot your password?
          </Link>
        </Box>
      </Paper>
    </Container>
  );
}

export default Login;
