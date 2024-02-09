import React from "react";
import { Button } from "@mui/material";

const LogoutButton = ({ logout }) => {
  const buttonStyle = {
    position: "absolute",
    top: "20px",
    right: "20px",
  };

  return (
    <Button
      onClick={logout}
      variant="contained"
      color="primary"
      style={buttonStyle}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
