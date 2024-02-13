import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsPie from 'highcharts/modules/variable-pie'; // Import pie chart module
import { jwtDecode } from 'jwt-decode';
highchartsPie(Highcharts); // Initialize pie chart module



const HighChart = () => {
  const [chartData, setChartData] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem('token');
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      const userIdFromToken = decodedToken.user;
      setUserId(userIdFromToken);
    }
  }, []);

  useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('expenseData'));
      console.log(storedData, userId)
    if (storedData && userId) {
      const filteredData = storedData.filter(item => item.decodedId === userId);
      const data = filteredData.reduce((acc, curr) => {
        const index = acc.findIndex(item => item.name === curr.category);
        if (index === -1) {
          acc.push({
            name: curr.category,
            y: parseFloat(curr.amount)
          });
        } else {
          acc[index].y += parseFloat(curr.amount);
        }
        return acc;
      }, []);
      setChartData(data);
      }
      console.log(chartData)
  }, [userId]);

  const options = {
    chart: {
      type: 'pie'
    },
    title: {
      text: 'Expense Distribution by Category'
    },
    series: [{
      name: 'Expenses',
      data: chartData
    }]
  };

  return (
    <div id='highChart'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighChart;
