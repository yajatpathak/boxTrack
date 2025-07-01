import { useState } from "react";
import { useDispatch } from "react-redux";

import { ACCESS_TOKEN, REFRESH_TOKEN } from "../services/constants";
import api from "../services/api";
import { login } from "../store/authSlice";
import { sendAlert } from "../store/alertSlice";

interface loginUserProps {
  email: string;
  password: string;
}

function useLogin() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();

  const loginUser = async ({ email, password }: loginUserProps) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/api/token/", {
        username: email,
        password,
      });

      const { access, refresh } = res.data;
      localStorage.setItem(ACCESS_TOKEN, access);
      localStorage.setItem(REFRESH_TOKEN, refresh);

      dispatch(login());
      dispatch(
        sendAlert({ message: "Logged In Successfully!", severity: "success" })
      );
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { loginUser, error, isLoading };
}

export default useLogin;
