import React, { useState,useEffect }  from 'react';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { jwtDecode } from 'jwt-decode';

function ExpenseTable({ expenseData, onDeleteExpense, onUpdateExpense, name }) {
  console.log(expenseData)
  // Retrieve token from local storage
  // const userToken = (localStorage.getItem('token'));
  const [userExpenses, setUserExpenses] = useState([])
  const [userToken, setUserToken] = useState('');

  // Effect to retrieve user token from local storage
  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    setUserToken(decodedToken);
    console.log(userToken)
  }, [expenseData]);

  useEffect(() => {
    const data = expenseData.filter((expense, i) => {
      return expense.decodedId === userToken.user 
    });
    setUserExpenses(data);
    // console.log(userExpenses)
  }, [expenseData])

  // console.log(userToken.user)
  // const expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
//  console.log(expenseData[6].token === userToken)
  // console.log(typeof (expenseData[4].token))
  // console.log((expenseData[4].token) , userToken)
  // Filter expense data based on the user's token
  // const userExpenses = expenseData.filter((expense, i) => {
  //   return expense.token === userToken
  // });
  console.log(userExpenses)
  const handleDelete = (id) => {
    onDeleteExpense(id);
  };

  const handleEdit = (expense) => {
    onUpdateExpense(expense);
  };

  return (
    <div>
      <Typography variant="h5" style={{ marginTop: '30px' }}>
        {name}'s Expense Table
      </Typography>
      {userExpenses.length > 0 ? (
        <TableContainer component={Paper} style={{ marginTop: '10px' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userExpenses.map((expense, index) => (
                <TableRow key={index}>
                  <TableCell>{expense.date}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <IconButton color="primary" onClick={() => handleEdit(expense)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton color="error" onClick={() => handleDelete(expense.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body1" style={{ marginTop: '10px' }}>No expense data available for the current user.</Typography>
      )}
    </div>
  );
}

export default ExpenseTable;