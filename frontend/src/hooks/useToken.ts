import { useSelector } from "react-redux";

import type { RootState } from "../store/store";

function useToken() {
  const token = useSelector((state: RootState) => state.auth.token);

  return token;
}

export default useToken;
