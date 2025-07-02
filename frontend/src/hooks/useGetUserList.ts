import { useState } from "react";
import api from "../services/api";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  is_active: boolean;
}

interface UserFilterProps {
  search?: string;
  is_active?: boolean;
  page?: number;
}

interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: User[];
}

function useGetUserList() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const [userList, setUserList] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const getUserList = async ({
    search,
    is_active,
    page = 1,
  }: UserFilterProps) => {
    setIsLoading(true);
    setError("");

    const params: any = {
      page,
    };
    if (search) params.search = search;
    if (is_active !== undefined) params.is_active = is_active;

    try {
      const res = await api.get<Response>("/api/user/list", { params });
      setUserList(res.data.results);
      setTotalCount(res.data.count);
    } catch (err: any) {
      setError(err.response?.data?.detail || "Failed to fetch Users.");
    } finally {
      setIsLoading(false);
    }
  };

  return { getUserList, isLoading, error, userList, totalCount };
}

export default useGetUserList;
