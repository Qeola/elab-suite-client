import {
  Alert,
  AlertProps,
  Button,
  Snackbar as MuiSnackbar,
  Typography,
} from "@mui/material";
import React, { forwardRef, useState } from "react";

const SnackbarAlert = forwardRef<HTMLDivElement, AlertProps>(
  function SnackbarAlert(props, ref) {
    return <Alert elevation={6} ref={ref} {...props} />;
  },
);

const CustomSnackbar = ({ response }: any) => {
  const [open, setOpen] = useState(true);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  console.log("SnackResponse:", response);

  return (
    <>
      <MuiSnackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <SnackbarAlert
          onClose={handleClose}
          severity={response.status || "error"}
        >
          <Typography variant="body1" color="textPrimary">
            {response.msg || response[0].message}
          </Typography>
        </SnackbarAlert>
      </MuiSnackbar>
    </>
  );
};

export default CustomSnackbar;
