import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function StatusSnackbar({
  isSnackbar,
  setIsSnackbar,
  errorWord,
}) {
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbar(false);
  };

  return (
    <Snackbar open={isSnackbar} autoHideDuration={6000} onClose={closeSnackbar}>
      <Alert onClose={closeSnackbar} severity="error" sx={{ width: "100%" }}>
        {errorWord}
      </Alert>
    </Snackbar>
  );
}
