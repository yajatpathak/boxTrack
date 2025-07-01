import { useState } from "react";
import api from "../services/api";

function useGetUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const getUserDetails = async () => {
    setIsLoading(true);

    try {
      const res = await api.get("/api/user/data");
    } catch (err: any) {
      setError(err.response?.data?.detail || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { getUserDetails, isLoading, error };
}

export default useGetUser;
