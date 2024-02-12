import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Select, MenuItem , FormControl, InputLabel} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid'; 

function ExpenseForm({editData}) {
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '',
    description: ''
  });
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    if (editData) {
      setFormData(editData);
    }
  }, [editData]);

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
    const id = uuidv4();
    const formDataWithToken = { ...formData,id, token: userToken, decodedId: userId };
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
       <Typography variant="h4" gutterBottom sx={{
          textAlign: 'center',
          fontFamily: '"Roboto Condensed", sans-serif', 
        fontWeight: 700,
          marginBottom:"25px",
        }} >
        {editData ? 'Edit Expense' : 'Add Expense'}
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
              InputLabelProps={{
                shrink: true
              }}
              // sx={input[type=date]: { color: 'lightgrey' }}}
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
          <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
            <Select
              fullWidth
              
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              defaultValue="Select Category"
            >
              
              <MenuItem value="income source">Income Source</MenuItem>
              <MenuItem value="fixed expense">Fixed Expense</MenuItem>
              <MenuItem value="variable expense">Variable Expense</MenuItem>
              </Select>
              </FormControl>
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
        <Button type="submit" variant="text" sx={{ backgroundColor: '#1e453e' }} style={{ marginTop: '20px', width:'100px', height:'45px', }}>

        {editData ? 'Update' : 'Submit'}
        </Button>
      </form>
    </Container>
  );
}

export default ExpenseForm;