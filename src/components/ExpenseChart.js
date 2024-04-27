import React, { useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const ExpenseChart = ({ expenseData }) => {
  useEffect(() => {
    // Create chart configuration
    const options = {
      title: {
        text: "Expense Chart"
      },
      xAxis: {
        categories: expenseData.map(expense => expense.date)
      },
      yAxis: {
        title: {
          text: "Amount"
        }
      },
      series: [{
        name: "Expenses",
        data: expenseData.map(expense => expense.amount)
      }]
    };

    // Render chart using Highcharts
    Highcharts.chart("expense-chart", options);
  }, [expenseData]);

  return (
    <div id="expense-chart">
      <HighchartsReact highcharts={Highcharts} />
    </div>
  );
};

export default ExpenseChart;
