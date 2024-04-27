import React, { useState, useEffect } from 'react';
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  TablePagination,
  Box,
  useTheme,
  Alert,
  AlertTitle
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { jwtDecode } from 'jwt-decode';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied'; // Importing an icon for visual effect

function ExpenseTable({ expenseData, onDeleteExpense, onUpdateExpense, onEditExpense, name }) {
  
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const theme = useTheme();

  const [userExpenses, setUserExpenses] = useState([])
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    setUserToken(decodedToken);
  }, [expenseData]);

  useEffect(() => {
    const data = expenseData.filter((expense) => expense.decodedId === userToken.user);
    setUserExpenses(data);
  }, [expenseData, userToken])

  const handleDelete = (id) => {
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

  const capitalizeFirstLetter = (string) => {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div>
      <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column" sx={{ m: '1rem' }} >
      <Typography variant="h5" style={{ margin: theme.spacing(3), fontWeight: 'bold' }}>
          {capitalizeFirstLetter(name)}'s Expense Table
        </Typography>
        {userExpenses.length > 0 ? (
          <TableContainer component={Paper} style={{ maxWidth: '90%', boxShadow: 4, marginBottom: '50px' }}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: theme.palette.primary.main }}>
                  <TableCell sx={{ color: theme.palette.primary.contrastText }}>Date</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.contrastText }}>Amount</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.contrastText }}>Category</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.contrastText }}>Description</TableCell>
                  <TableCell sx={{ color: theme.palette.primary.contrastText }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {userExpenses.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((expense, index) => (
                  <TableRow key={index} hover sx={{
                    '&:nth-of-type(odd)': { backgroundColor: '#b3cbb9' },
                    '&:nth-of-type(even)': { backgroundColor: '#9fb9a8' },
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
            />
          </TableContainer>
        ) : (
          <Alert severity="info" icon={<SentimentDissatisfiedIcon fontSize="large" />}>
            <AlertTitle>No Expenses Recorded</AlertTitle>
            It looks like there are no expense records available for {name}. Start adding some to see them here!
          </Alert>
        )}
      </Box>
    </div>
  );
}

export default ExpenseTable;
