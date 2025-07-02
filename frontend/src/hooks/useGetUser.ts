import { useState } from "react";
import api from "../services/api";
import { useDispatch } from "react-redux";
import { setUser } from "../store/userSlice";
import { sendAlert } from "../store/alertSlice";

function useGetUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const getUserDetails = async () => {
    setIsLoading(true);

    try {
      const res = await api.get("/api/user/details");
      dispatch(
        setUser({
          firstName: res.data.first_name,
          lastName: res.data.last_name,
          email: res.data.email,
        })
      );
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to fetch user details.");
      dispatch(
        sendAlert({
          message: "Failed to fetch user details.",
          severity: "error",
        })
      );
    } finally {
      setIsLoading(false);
    }
  };

  return { getUserDetails, isLoading, error };
}

export default useGetUser;
