// LocalManagement.js (Parent Component)
import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

const LocalManagement = ({ name }) => {
  
    const [expenseData, setExpenseData] = useState([]);
    const [editData, setEditData] = useState(null);

  const [userId, setUserId] = useState("");

  useEffect(() => {
    // Retrieve user token from local storage
      const userToken = localStorage.getItem('token');
      console.log(userToken)
    if (userToken) {
      // Decode the token to access its payload
        const decodedToken = jwtDecode(userToken);
        // console.log(decodedToken.user)
      // Extract userId from the decoded token
      const userIdFromToken = decodedToken.user;
      setUserId(userIdFromToken);
    }
  }, []);
  

  useEffect(() => {
    // Fetch expense data from local storage and update state
    const storedData = JSON.parse(localStorage.getItem('expenseData')) || [];
    setExpenseData(storedData);
  }, []); 

  const addExpense = (newExpense) => {
    // Add new expense to state and local storage
    setExpenseData(prevData => [...prevData, newExpense]);
    localStorage.setItem('expenseData', JSON.stringify([...expenseData, newExpense]));
  };

  const deleteExpense = (uuid) => {
    console.log(uuid)
    // console.log(expenseData)
    // Delete expense from state and local storage
    const updatedData = expenseData.filter(expense => expense.id !== uuid);
    // console.log(updatedData)
    setExpenseData(updatedData);
    localStorage.setItem('expenseData', JSON.stringify(updatedData));
  };

  const updateExpense = (updatedExpense) => {
    const updatedData = expenseData.map(expense => {
      if (expense.id === updatedExpense.id) {
        return updatedExpense;
      }
      return expense;
    });
    setExpenseData(updatedData);
    localStorage.setItem('expenseData', JSON.stringify(updatedData));
    setEditData(null); // Clear edit data after updating
  };

  const editExpense = (expenseId) => {
    const expenseToEdit = expenseData.find(expense => expense.id === expenseId);
    setEditData(expenseToEdit);
  };

  return (
    <div>
      <ExpenseForm onSubmit={addExpense} editData={editData}/>
      <ExpenseTable  expenseData={expenseData} onDeleteExpense={deleteExpense} onUpdateExpense={updateExpense}  onEditExpense={editExpense} name={name} />
    </div>
  );
};

export default LocalManagement;
