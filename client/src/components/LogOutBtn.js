import React from "react";
import { Button } from "@mui/material";

const LogoutButton = ({ setAuth }) => {
  const logout = async (e) => {
    e.preventDefault();
    try {
      localStorage.removeItem("token");
      setAuth(false);
      // toast.success("Logout successfully");
    } catch (err) {
      console.error(err.message);
    }
  };

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
