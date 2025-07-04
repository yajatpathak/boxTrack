import { useState } from "react";
import { isAxiosError } from "axios";

import api from "../services/api";

export interface Customer {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  phone_number: string;
  is_active: boolean;
}

interface CustomerFilterProps {
  search?: string;
  is_active?: boolean;
  page?: number;
}

interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: Customer[];
}

function useGetCustomerList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [customerList, setCustomerList] = useState<Customer[]>([]);
  const [count, setCount] = useState(0);

  const getCustomerList = async ({
    search,
    is_active,
    page = 1,
  }: CustomerFilterProps) => {
    setIsLoading(true);
    setError("");

    const params: any = {
      page,
    };
    if (search) params.search = search;
    if (is_active !== undefined) params.is_active = is_active;

    try {
      const res = await api.get<Response>("/api/customers/list/", { params });
      setCustomerList(res.data.results);
      setCount(res.data.count);
    } catch (err: unknown) {
      let newErr = "Failed to fetch Customers.";

      if (isAxiosError(err) && err.response && err.response.data) {
        newErr = err.response.data.detail;
      }
      setError(newErr);
    } finally {
      setIsLoading(false);
    }
  };

  return { getCustomerList, isLoading, error, customerList, count };
}

export default useGetCustomerList;
