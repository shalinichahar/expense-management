import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid } from '@mui/material';

function ExpenseForm() {
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

  const handleSubmit = (event) => {
    event.preventDefault();

    let expenseData = JSON.parse(localStorage.getItem('expenseData')) || [];
    const formDataWithToken = { ...formData, token: userToken };
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
      </form>
    </Container>
  );
}

export default ExpenseForm;
