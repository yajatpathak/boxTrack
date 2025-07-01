import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormLabel,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import validateEmail from "../helperFunctions/validateEmail";
import SignInSwitch from "../components/SignInSwitch";
import PasswordChecker from "../components/PasswordChecker";
import useCheckAuth from "../hooks/useCheckAuth";
import useRegister from "../hooks/useRegister";

function Register() {
  const isAutharized = useCheckAuth();
  const navigate = useNavigate();

  const { registerUser, error, isLoading } = useRegister();

  const [firstNameError, setFirstNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const passwordRef = useRef<HTMLInputElement>(null);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const password = passwordRef.current?.value.trim() || "";

    setFirstNameError(null);
    setEmailError(null);

    let register = true;

    if (firstName === "") {
      setFirstNameError("First Name is Required");
      register = false;
    }
    if (email === "") {
      setEmailError("Email is Required");
      register = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid Email");
      register = false;
    }

    if (register) {
      const userPayload = { firstName, email, password } as any;
      if (lastName) userPayload.lastName = lastName;

      registerUser(userPayload);
    }
  };

  useEffect(() => {
    if (isAutharized) navigate("/");
  }, [isAutharized, navigate]);

  return (
    <Container maxWidth="sm">
      <SignInSwitch />
      <Paper elevation={10} sx={{ marginTop: 2, marginBottom: 8, padding: 2 }}>
        <Typography component="h1" variant="h4" sx={{ mt: 2 }}>
          Register
        </Typography>
        <Box
          component={"form"}
          noValidate
          sx={{ mt: 2 }}
          onSubmit={handleSubmission}
        >
          <Box display="flex" sx={{ mb: 2, gap: 2 }}>
            <FormControl fullWidth>
              <FormLabel htmlFor="firstName">First Name*</FormLabel>
              <TextField
                placeholder="Jhon"
                id="firstName"
                name="firstName"
                autoFocus
                required
                color={firstNameError ? "error" : "primary"}
                error={firstNameError ? true : false}
                helperText={firstNameError}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="lastName">Last Name</FormLabel>
              <TextField placeholder="Doe" id="lastName" name="lastName" />
            </FormControl>
          </Box>
          <FormControl fullWidth>
            <FormLabel htmlFor="email">Email*</FormLabel>
            <TextField
              placeholder="you@email.com"
              type="email"
              id="email"
              name="email"
              required
              sx={{ mb: 2 }}
              color={emailError ? "error" : "primary"}
              error={emailError ? true : false}
              helperText={emailError}
            />
          </FormControl>
          <PasswordChecker
            setSubmitDisabled={setSubmitDisabled}
            passwordRef={passwordRef}
          />
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
            disabled={submitDisabled || isLoading}
          >
            Submit
            {isLoading && (
              <CircularProgress size={24} sx={{ position: "absolute" }} />
            )}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Register;
