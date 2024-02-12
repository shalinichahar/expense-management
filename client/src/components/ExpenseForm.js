import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Select, MenuItem } from '@mui/material';
import { jwtDecode } from 'jwt-decode';

function ExpenseForm() {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '',
    description: ''
  });
  const [userToken, setUserToken] = useState('');

  // Effect to retrieve user token from local storage
  useEffect(() => {
    const token = localStorage.getItem('token');
    setUserToken(token);
  }, []);

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

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.date || !formData.amount || !formData.category || !formData.description) {
      alert('Please fill out all fields.');
      return;
    }

    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    let expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
    const formDataWithToken = { ...formData, token: userToken, decodedId: userId };
    expenseData.push(formDataWithToken);
    localStorage.setItem('expenseData', JSON.stringify(expenseData));

    // Optionally, you can display a success message or perform other actions here
    console.log('Form data submitted and stored for the user.');
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
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
            {/* Replace TextField with Select */}
            <Select
              fullWidth
              select
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
             
            >
              
              <MenuItem value="income source">Income Source</MenuItem>
              <MenuItem value="fixed expense">Fixed Expense</MenuItem>
              <MenuItem value="variable expense">Variable Expense</MenuItem>
            </Select>
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
      </form>
    </Container>
  );
}

export default ExpenseForm;