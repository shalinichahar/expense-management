import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';

function ExpenseTable() {
//   const [formData, setFormData] = useState({
//     date: '',
//     amount: '',
//     category: '',
//     description: ''
//   });
//   const [userToken, setUserToken] = useState('');
  const [userExpenseData, setUserExpenseData] = useState([]);

//   // Effect to retrieve user token from local storage
//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     setUserToken(token);

//     // Retrieve user's expense data from local storage and filter it based on user's token
//     const expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
//     const userExpenseData = expenseData.filter(expense => expense.token === token);
//     setUserExpenseData(userExpenseData);
//   }, []);

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     let expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
//     const formDataWithToken = { ...formData, token: userToken };
//     expenseData.push(formDataWithToken);
//     localStorage.setItem('expenseData', JSON.stringify(expenseData));

//     // Retrieve user's expense data from local storage and filter it based on user's token
//     const userExpenseData = expenseData.filter(expense => expense.token === userToken);
//     setUserExpenseData(userExpenseData);

//     // Optionally, you can display a success message or perform other actions here
//     console.log('Form data submitted and stored for the user.');
//   };

//   const handleInputChange = (event) => {
//     const { name, value } = event.target;
//     setFormData(prevFormData => ({
//       ...prevFormData,
//       [name]: value
//     }));
//   };

  return (
    <Container maxWidth="sm">
      {/* <Typography variant="h4" gutterBottom>
        Expense Tracker
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Submit
        </Button>
      </form> */}

      <Typography variant="h5" style={{ marginTop: '30px' }}>
        User's Expense Data
      </Typography>
      <TableContainer component={Paper} style={{ marginTop: '10px' }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userExpenseData.map((expense, index) => (
              <TableRow key={index}>
                <TableCell>{expense.date}</TableCell>
                <TableCell>{expense.amount}</TableCell>
                <TableCell>{expense.category}</TableCell>
                <TableCell>{expense.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default ExpenseTable;
