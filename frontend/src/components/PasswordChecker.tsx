import { useEffect, useRef, useState } from "react";
import { FormControl, FormLabel, TextField, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

interface PasswordCheckerProps {
  setSubmitDisabled: (submitDisabled: boolean) => void;
  passwordRef: React.RefObject<HTMLInputElement | null>;
}

function PasswordChecker({
  setSubmitDisabled,
  passwordRef,
}: PasswordCheckerProps) {
  const [length, setLength] = useState(false);
  const [lowerCase, setLowerCase] = useState(false);
  const [upperCase, setUpperCase] = useState(false);
  const [specialChar, setSpecialChar] = useState(false);
  const [number, setNumber] = useState(false);
  const [match, setMatch] = useState(false);

  const confPasswordRef = useRef<HTMLInputElement>(null);

  const validatePassword = () => {
    const password = passwordRef.current?.value.trim() || "";
    const confPassword = confPasswordRef.current?.value.trim() || "";

    setLength(password.length >= 8);
    setLowerCase(/[a-z]/.test(password));
    setUpperCase(/[A-Z]/.test(password));
    setSpecialChar(/[!@#$%^&*]/.test(password));
    setNumber(/[0-9]/.test(password));
    setMatch(password === confPassword);
  };

  useEffect(() => {
    setSubmitDisabled(
      !(length && lowerCase && upperCase && match && number && specialChar)
    );
  }, [length, upperCase, lowerCase, specialChar, number, match]);

  return (
    <>
      <FormControl fullWidth>
        <FormLabel htmlFor="password">Password*</FormLabel>
        <TextField
          placeholder="*****"
          type="password"
          id="password"
          name="password"
          inputRef={passwordRef}
          required
          sx={{ mb: 2 }}
          onChange={validatePassword}
        />
      </FormControl>
      <FormControl fullWidth>
        <FormLabel htmlFor="confPassword">Confirm Password*</FormLabel>
        <TextField
          placeholder="*****"
          type="password"
          id="confPassword"
          name="confPassword"
          inputRef={confPasswordRef}
          required
          sx={{ mb: 1 }}
          onChange={validatePassword}
        />
      </FormControl>
      <Typography variant="body2" sx={{ mb: 2 }}>
        <IconReturn check={length} /> Password should have at least 8 characters
        <br />
        <IconReturn check={lowerCase} /> Password should have at least one
        lower-case character
        <br />
        <IconReturn check={upperCase} /> Password should have at least one
        upper-case character
        <br />
        <IconReturn check={number} /> Password should have at least one number
        <br />
        <IconReturn check={specialChar} /> Password should have at least one
        special character
        <br />
        <IconReturn check={match} /> Password and Confirm Password should match
      </Typography>
    </>
  );
}

function IconReturn({ check }: { check: boolean }) {
  if (check)
    return (
      <CheckCircleIcon
        fontSize="small"
        color="success"
        sx={{ verticalAlign: "middle", marginRight: "4px" }}
      />
    );
  return (
    <CancelIcon
      fontSize="small"
      color="error"
      sx={{ verticalAlign: "middle", marginRight: "4px" }}
    />
  );
}

export default PasswordChecker;
