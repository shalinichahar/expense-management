import React, { useEffect, useState } from "react";
import LocalManagement from "./LocalManagement";
import Header from "./Header";

import NavBar from "./NavBar";
import HighChart from "./HighChart";
// import ExpenseChart from "./ExpenseChart";
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

  useEffect(() => {
    getName();
  }, []);

  
const AppLayout = () => {
    
  return(
      <>
      <Header name={name} setAuth={setAuth} />
      <NavBar/>
      <LocalManagement name={name} />
      {/* <HighChart/> */}
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