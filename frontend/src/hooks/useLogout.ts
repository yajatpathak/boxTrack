import { useDispatch } from "react-redux";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../services/constants";
import { logout } from "../store/authSlice";
import { sendAlert } from "../store/alertSlice";
import { clearUser } from "../store/userSlice";

function useLogout() {
  const dispatch = useDispatch();

  const logoutUser = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    dispatch(logout());
    dispatch(clearUser());
    dispatch(sendAlert({ message: "You have logged out.", severity: "info" }));
  };

  return logoutUser;
}

export default useLogout;
