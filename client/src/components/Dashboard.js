import React, { useEffect, useState, useRef } from "react";
import LocalManagement from "./LocalManagement";
import Header from "./Header";

import NavBar from "./NavBar";
import HighChart from "./HighChart";
import { theme } from "../helper/Theme";
import { ThemeProvider } from '@mui/material/styles';

// import ExpenseChart from "./ExpenseChart";
// import { toast } from "react-toastify";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const localManagementRef = useRef(null);
  const highChartRef = useRef(null);

  // const [scrollToSection, setScrollToSection] = useState('');

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


  const handleScrollToSection = (sectionRef) => {
    if (sectionRef && sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  
const AppLayout = () => {
    
  return(
      <ThemeProvider theme={theme}>
      <div>
        <Header name={name} setAuth={setAuth} />
        <NavBar onScrollToSection={handleScrollToSection} localManagementRef={localManagementRef} highChartRef={highChartRef} />
        <div ref={localManagementRef}>
          <LocalManagement name={name} />
        </div>
        <div ref={highChartRef}>
          <HighChart />
        </div>
      </div>
    </ThemeProvider>  
  );
};
  

  return (
    <ThemeProvider theme={theme}>
    <div>
      <AppLayout />
    </div>
  </ThemeProvider>
  );
};

export default Dashboard;