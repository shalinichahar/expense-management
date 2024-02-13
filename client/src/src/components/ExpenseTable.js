import React, { useState,useEffect }  from 'react';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, TablePagination, Box , useTheme, Card} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { jwtDecode } from 'jwt-decode';

function ExpenseTable({ expenseData, onDeleteExpense, onUpdateExpense, onEditExpense, name }) {
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();


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
  }, []);

  useEffect(() => {
    const data = expenseData.filter((expense, i) => {
      return expense.decodedId === userToken.user 
    });
    setUserExpenses(data);
    // console.log(userExpenses)
  }, [expenseData, userToken])

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
    
    console.log(id)
    onDeleteExpense(id);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleEdit = (id) => {

    const expense = expenseData.find(expense => expense.id === id);
    onEditExpense(expense.id);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" mt={4} >
      <Typography variant="h5" style={{ margin: theme.spacing(3), fontWeight: 'bold' }}>
        {name}'s Expense Table
      </Typography>
      {userExpenses.length > 0 ? (
          <TableContainer component={Paper} style={{ maxWidth: '90%', boxShadow: 4, marginBottom: '50px', alignItems: 'center', justifyItems:'center', }}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table" style={{justifyItems:'center'}}>
          <TableHead >
                <TableRow sx={{ backgroundColor: theme.palette.primary.main, justifyItems: 'center', }}>
                <TableCell sx={{ color: theme.palette.primary.contrastText }}>Date</TableCell>
                <TableCell sx={{ color: theme.palette.primary.contrastText }}>Amount</TableCell>
                <TableCell sx={{ color: theme.palette.primary.contrastText }}>Category</TableCell>
                <TableCell sx={{ color: theme.palette.primary.contrastText }}>Description</TableCell>
                <TableCell sx={{ color: theme.palette.primary.contrastText }}>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 4 ? userExpenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) : userExpenses)
              .map((expense, index) => (
                <TableRow key={index} hover sx={{
                  '&:nth-of-type(odd)': {
                    backgroundColor: '#b3cbb9',
                  },
                  '&:nth-of-type(even)': {
                    backgroundColor: '#9fb9a8',
                  },
                  '&:last-child td, &:last-child th': { border: 0 },
                }}>
                  <TableCell component="th" scope="row">{expense.date}</TableCell>
                  <TableCell>{expense.amount}</TableCell>
                  <TableCell>{expense.category}</TableCell>
                  <TableCell>{expense.description}</TableCell>
                  <TableCell>
                    <IconButton aria-label="edit" onClick={() => handleEdit(expense.id)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => handleDelete(expense.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            </Table>
            
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={userExpenses.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{
                '.MuiTablePagination-toolbar': {
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  backgroundColor: '#2c4c3b',
                },
                '.MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
                  color: '#f1f8e9',
                  marginTop: '10px',
                  marginRight:'20px',
                  lineHeight: 'inherit', // Ensures text aligns properly without altering line height
                },
                '.MuiTablePagination-selectRoot, .MuiTablePagination-input': {
                  color: '#f1f8e9',
                  border: '1px solid #f1f8e9',
                  borderRadius: '4px',
                  padding: '4px 24px 4px 8px', // Adjusted padding to ensure consistent height
                  marginRight: '25px',
                   // Match line height with other elements
                },
                '.MuiTablePagination-actions': {
                  color: '#f1f8e9',
                  
                  marginLeft: '8px', // Ensures spacing between elements
                  '.MuiIconButton-root': {
                    padding: '8px', // Standardizes padding to ensure alignment
                  },
                },
              }}
            />

              

        </TableContainer>
        
      ) : (
        <Typography variant="body1" style={{mt:2}}>No expense data available for the current user.</Typography>
        )}
        </Box>
    </div>
    
  );
}

export default ExpenseTable;