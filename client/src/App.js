import React, { useState, useEffect } from "react";
import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

// Components
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Error from "./components/Error";
import LocalManagement from "./components/LocalManagement";
import HighChart from "./components/HighChart";

// Function to check if user is authenticated


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const checkAuth = async () => {
    try {
      const res = await fetch("http://localhost:5000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });
  
      const parseRes = await res.json();
  
      console.log(`parseRes ${parseRes}`);  //jwt token is valid
  
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <>
      <RouterProvider router={createBrowserRouter(
        [
          {
            path: "/",
            element: isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          },
          {
            path: "/login",
            element: !isAuthenticated ? <Login setAuth={setAuth } /> : <Navigate to="/dashboard" />,
            errorElement: <Error/>
          },
          {
            path: "/register",
            element: !isAuthenticated ? <Register setAuth={setAuth } /> : <Navigate to="/login" />,
          },
          {
            path: "/dashboard",
            element: isAuthenticated ? <Dashboard setAuth={setAuth }/> : <Navigate to="/login" />,
            errorElement: <Error/>
          },
        ]
      )} />
    </>
  );
};

export default App;
