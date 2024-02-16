import React, { useState, useEffect, useRef } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseTable from './ExpenseTable';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';

const LocalManagement = ({ name, displayTable, displayForm }) => {
  
  const [expenseData, setExpenseData] = useState([]);
  const [editData, setEditData] = useState(null);

  const [userId, setUserId] = useState("");
  const tableRef = useRef(null);

  useEffect(() => {
    
    const userToken = localStorage.getItem('token');
   
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
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
    const newExpensesArray = [...expenseData, { ...newExpense, id: uuidv4() }];
    setExpenseData(newExpensesArray);
    localStorage.setItem('expenseData', JSON.stringify(newExpensesArray));
  };

  const deleteExpense = (uuid) => {
    const updatedData = expenseData.filter(expense => expense.id !== uuid);
    setExpenseData(updatedData);
    localStorage.setItem('expenseData', JSON.stringify(updatedData));
  };

  const updateExpense = (updatedExpense) => {
    const updatedData = expenseData.map(expense =>
      expense.id === updatedExpense.id ? updatedExpense : expense
    );
    setExpenseData(updatedData);
    localStorage.setItem('expenseData', JSON.stringify(updatedData));
    setEditData(null); // Clear edit data after updating
  };

  const editExpense = (expenseId) => {
    const expenseToEdit = expenseData.find(expense => expense.id === expenseId);
    setEditData(expenseToEdit);
  };
  
    return (
      <>
        {displayForm && <ExpenseForm onSubmit={addExpense} editData={editData} onUpdateExpense={updateExpense} onAddExpense={addExpense} />}
        {!displayForm && editData && <div>
          <ExpenseForm onSubmit={addExpense} editData={editData} onUpdateExpense={updateExpense} onAddExpense={addExpense} />
        </div>}
        {displayTable && <div>
          <ExpenseTable expenseData={expenseData} onDeleteExpense={deleteExpense} onUpdateExpense={updateExpense} onEditExpense={editExpense} name={name} />
        </div>}
      </>
    );
}

export default LocalManagement;
