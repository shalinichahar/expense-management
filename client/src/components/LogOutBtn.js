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
      sx={{
        position: 'absolute',
        top: 16,
        right: 20,
        background: 'linear-gradient(45deg, #66bb6a 30%, #43a047 90%)', // Light-dark green gradient
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(45deg, #57a05a 30%, #2e7031 90%)', // Darker green gradient on hover
        },
      }}
    >
      Logout
    </Button>
  );
};

export default LogoutButton;
