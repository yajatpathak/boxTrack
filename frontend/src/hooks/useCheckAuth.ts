import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function useCheckAuth() {
  const isAutharized = useSelector(
    (state: RootState) => state.auth.isAutharized
  );

  return isAutharized;
}

export default useCheckAuth;
