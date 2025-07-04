import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  FormControl,
  FormLabel,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

import useCreateCustomer from "../hooks/useCreateCustomer";
import validateEmail from "../helperFunctions/validateEmail";

function CreateCustomerForm() {
  const [isOpen, setIsOpen] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const { isLoading, createCustomer, error } = useCreateCustomer();

  const handleClose = () => {
    setIsOpen(false);
    setFirstNameError("");
    setEmailError("");
    setAddressError("");
    setPhoneError("");
  };

  const handleSubmission = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const first_name = (formData.get("first_name") as string).trim();
    const last_name = (formData.get("last_name") as string).trim();
    const email = (formData.get("email") as string).trim();
    const phone_number = (formData.get("phone_number") as string).trim();
    const address = (formData.get("address") as string).trim();

    setFirstNameError("");
    setEmailError("");
    setAddressError("");
    setPhoneError("");

    let create = true;

    if (first_name === "") {
      setFirstNameError("First Name is required.");
      create = false;
    }
    if (phone_number === "") {
      setPhoneError("Phone Number is required.");
      create = false;
    } else if (!/^\d+$/.test(phone_number)) {
      setPhoneError("Invalid Phone Number.");
      create = false;
    }
    if (address === "") {
      setAddressError("Address is required.");
      create = false;
    }
    if (email === "") {
      setEmailError("Email is required.");
      create = false;
    } else if (!validateEmail(email)) {
      setEmailError("Invalid Email");
      create = false;
    }

    if (create) {
      const customerPayload = {
        first_name,
        email,
        phone_number,
        address,
      } as any;
      if (last_name) customerPayload.last_name = last_name;

      if (await createCustomer(customerPayload)) {
        handleClose();
      }
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Create Customer
      </Button>
      <Dialog open={isOpen} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Create Customer</DialogTitle>

        <Box
          component="form"
          onSubmit={handleSubmission}
          noValidate
          autoCapitalize="off"
        >
          <Stack spacing={2} sx={{ p: 2 }}>
            <Stack spacing={2} direction="row">
              <FormControl fullWidth>
                <FormLabel htmlFor="first_name">First Name*</FormLabel>
                <TextField
                  id="first_name"
                  name="first_name"
                  autoFocus
                  required
                  color={firstNameError ? "error" : "primary"}
                  error={!!firstNameError}
                  helperText={firstNameError}
                />
              </FormControl>
              <FormControl fullWidth>
                <FormLabel htmlFor="last_name">Last Name</FormLabel>
                <TextField id="last_name" name="last_name" />
              </FormControl>
            </Stack>
            <FormControl fullWidth>
              <FormLabel htmlFor="email">Email*</FormLabel>
              <TextField
                id="email"
                name="email"
                required
                type="email"
                color={emailError ? "error" : "primary"}
                error={!!emailError}
                helperText={emailError}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="phone_number">Phone Number*</FormLabel>
              <TextField
                id="phone_number"
                name="phone_number"
                required
                type="tel"
                color={phoneError ? "error" : "primary"}
                error={!!phoneError}
                helperText={phoneError}
              />
            </FormControl>
            <FormControl fullWidth>
              <FormLabel htmlFor="address">Address*</FormLabel>
              <TextField
                id="address"
                name="address"
                required
                color={addressError ? "error" : "primary"}
                error={!!addressError}
                helperText={addressError}
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
              disabled={isLoading}
              fullWidth
            >
              Submit
              {isLoading && (
                <CircularProgress size={24} sx={{ position: "absolute" }} />
              )}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    </>
  );
}

export default CreateCustomerForm;
