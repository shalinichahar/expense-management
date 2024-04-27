import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Grid, Select, MenuItem , FormControl, InputLabel} from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid'; 

function ExpenseForm({ editData, onUpdateExpense, onAddExpense }) {
  // console.log(editData)
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    date: '',
    amount: '',
    category: '',
    description: ''
  });
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    console.log(editData)
    if (editData) {
      console.log(editData)
      setFormData(editData);
    }
  }, [editData]);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    setUserToken(token);
  }, []);

  useEffect(() => {
     const userToken = localStorage.getItem('token');
    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      const userIdFromToken = decodedToken.user;
      setUserId(userIdFromToken);
    }
  }, []);

  const handleSubmit = (event) => {
    // event.preventDefault();

    if (!formData.date || !formData.amount || !formData.category || !formData.description) {
      alert('Please fill out all fields.');
      return;
    }

    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      alert('Please enter a valid amount.');
      return;
    }

    if (editData) {
      onUpdateExpense({ ...formData, id: editData.id, token: userToken, decodedId: userId }); // Assuming onUpdateExpense is passed as prop
    } else {
      const newExpense = { ...formData, id: uuidv4(), token: userToken, decodedId: userId };
    onAddExpense(newExpense);  
    }
    setFormData({ date: '', amount: '', category: '', description: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  //CATEGORIES
 
    const [categories, setCategories] = useState([
      'Income Source',
      'Fixed Expense',
      'Variable Expense',
    ]);

    const handleAddCategory = () => {
      const newCategory = prompt('Enter a new category:');
      if (newCategory) {
        setCategories([...categories, newCategory]);
      }
    };
  
  return (
    <Container maxWidth="sm">
       <Typography variant="h5" gutterBottom sx={{
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
          {categories.map((category, index) => (
            <MenuItem key={index} value={category}>
              {category}
            </MenuItem>
          ))}
        </Select>
        <Button onClick={handleAddCategory}>Add Category</Button>
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