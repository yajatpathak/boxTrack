import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { sendAlert } from "../store/alertSlice";

interface registerUserProps {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

function useRegister() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = async ({
    firstName,
    lastName,
    email,
    password,
  }: registerUserProps) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/api/user/register/", {
        first_name: firstName,
        ...(lastName && { last_name: lastName }),
        email,
        password,
      });
      navigate("/login");
      dispatch(
        sendAlert({ message: "Registered Successfully!", severity: "success" })
      );
    } catch (err: any) {
      let newError = "Registeration Failed.";
      const errorObject = err.response.data;

      const firstKey = Object.keys(errorObject)[0];
      const firstMessage = errorObject[firstKey];

      if (firstMessage) newError = firstMessage;

      setError(newError);
    } finally {
      setIsLoading(false);
    }
  };

  return { registerUser, error, isLoading };
}

export default useRegister;
