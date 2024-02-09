import React, { useEffect, useState } from "react";
import LocalManagement from "./LocalManagement";
import Header from "./Header";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import ExpenseChart from "./ExpenseChart";
// import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");

  const getName = async () => {
    try {
      const res = await fetch("http://localhost:5000/dashboard/", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      console.log(parseData.user_name);
      setName(parseData.user_name);
    } catch (err) {
      console.error(err.message);
    }
  };

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

  useEffect(() => {
    getName();
  }, []);


  
const AppLayout = () => {
    
  return(
      <>
      <Header name={name} />
      <button onClick={e => logout(e)} className="btn btn-primary">
        Logout
      </button>
      <nav>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li>
            <Typography variant="body1">
              <Link
                to="/link1"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Dashboard
              </Link>
            </Typography>
          </li>
          <li>
            <Typography variant="body1">
              <Link
                to="/link2"
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                }}
              >
                Expense Form
              </Link>
            </Typography>
          </li>
        </ul>
      </nav>
      <LocalManagement />
    
      {/* <HighchartsReact
	      highcharts={Highcharts}
	      options={options}
      /> */}
      </>    
  );
};
  

  return (
    <div>
      {/* <h1 className="mt-5">Dashboard</h1> */}
      {/* <Typography>Welcome {name}</Typography> */}
      
      <AppLayout />
    </div>
  );
};

export default Dashboard;