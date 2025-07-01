import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";

import type { RootState } from "../store/store";
import { clearAlert } from "../store/alertSlice";

function GenerateAlert() {
  const [isOpen, setIsOpen] = useState(false);

  const { message, severity } = useSelector((state: RootState) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!!message) setIsOpen(true);
  }, [message]);

  const handleClose = () => {
    setIsOpen(false);
    dispatch(clearAlert());
  };

  return (
    <>
      {message && (
        <Snackbar
          open={isOpen}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert severity={severity} sx={{ width: "100%" }}>
            {message}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default GenerateAlert;
