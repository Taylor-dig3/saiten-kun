import React from 'react'
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  
export default function StatusSnackbar({isSnackbar,setIsSnackbar,isSuccessFlag,successWord}) {
  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setIsSnackbar(false);
  };
 
  return (
    <Snackbar
        open={isSnackbar}
        autoHideDuration={6000}
        onClose={closeSnackbar}
     
      >
        {isSuccessFlag ? (
          <Alert
            onClose={closeSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {successWord}
          </Alert>
        ) : (
          <Alert
            onClose={closeSnackbar}
            severity="error"
            sx={{ width: "100%" }}
          >
            パスワードは英数字4桁以上15桁以下にしてください
          </Alert>
        )}
      </Snackbar>
  )
}
