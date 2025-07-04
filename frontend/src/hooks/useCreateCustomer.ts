import { useState } from "react";
import { useDispatch } from "react-redux";
import { isAxiosError } from "axios";

import api from "../services/api";
import { sendAlert } from "../store/alertSlice";

interface CreateCustomerProps {
  first_name: string;
  last_name?: string;
  phone_number: string;
  email: string;
  address: string;
}

function useCreateCustomer() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();

  const createCustomer = async ({
    first_name,
    last_name,
    email,
    phone_number,
    address,
  }: CreateCustomerProps) => {
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/api/customers/create/", {
        first_name,
        email,
        phone_number,
        address,
        ...(last_name && { last_name }),
      });
      dispatch(
        sendAlert({
          message: "Customer Created Successfully!",
          severity: "success",
        })
      );
      return true;
    } catch (err: unknown) {
      let newError = "Customer Creation Failed.";

      if (isAxiosError(err) && err.response && err.response.data) {
        const errorObject = err.response.data;
        const firstKey = Object.keys(errorObject)[0];
        const firstMessage = errorObject[firstKey];
        if (firstMessage) newError = firstMessage;
      }

      setError(newError);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { createCustomer, isLoading, error };
}

export default useCreateCustomer;
