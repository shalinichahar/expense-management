import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsPie from 'highcharts/modules/variable-pie';
import { jwtDecode } from 'jwt-decode';
import NoDataToDisplay from 'highcharts/modules/no-data-to-display';

highchartsPie(Highcharts); // Initialize pie chart module
NoDataToDisplay(Highcharts); // Initialize the no-data module

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
    if (storedData && userId) {
      const filteredData = storedData.filter(item => item.decodedId === userId);
      const data = filteredData.reduce((acc, curr) => {
        const index = acc.findIndex(item => item.name === curr.category);
        if (index === -1) {
          acc.push({ name: curr.category, y: parseFloat(curr.amount) });
        } else {
          acc[index].y += parseFloat(curr.amount);
        }
        return acc;
      }, []);
      setChartData(data);
    }
    if (!storedData) {
      // Add dummy data to show no data placeholder
      setChartData([{
        name: 'No data',
        y: 1,
        color: '#004d40' // Dark green color
      }]);
    }
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
      data: chartData.length && chartData[0].name !== 'No data' ? chartData : [{
        name: 'No data',
        y: 1,
        color: '#004d40', // Dark green color
        dataLabels: {
          enabled: false // Disable data labels for dummy data
        }
      }],
      dataLabels: {
        enabled: true
      }
    }],
    noData: {
      text: 'No data recorded for this user',
      style: {
        fontWeight: 'bold',
        fontSize: '15px',
        color: '#FFFFFF'
      }
    }
  };

  return (
    <div id='highChart'>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default HighChart;
