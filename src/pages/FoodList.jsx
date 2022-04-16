import React from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import useMediaQuery from '@mui/material/useMediaQuery';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function FoodList() {
  const breakpoint = useMediaQuery('(min-width: 960px');
  const [list, setList] = React.useState(null);

  const { user } = useAuth();

  const date = new Date();
  const today = date.toISOString().substring(0, 10);

  const [thisDate, setThisDate] = React.useState(today);
  const getFood = async () => {
    try {
      const { data } = await axios.get('http://localhost:4000/api/food', {
        withCredentials: true,
      });
      setList(data);
    } catch (error) {}
  };

  const handleChange = ({ target }) => {
    setThisDate(target.value);
  };
  const handleDelete = async ({ target }) => {
    console.log(target.id);
    const { data } = await axios.delete(
      `http://localhost:4000/api/food/${target.id}`
    );
    getFood();
  };
  React.useEffect(() => {
    getFood();
  }, []);

  let amountSum = 0;
  let kcalSum = 0;
  let carbSum = 0;
  let proteinSum = 0;
  let fatSum = 0;
  let fiberSum = 0;
  return (
    <div className='FoodList'>
      <input
        type='date'
        id='start'
        name='trip-start'
        value={thisDate}
        onChange={handleChange}
      ></input>
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
      {/* <DatePicker
        views={['day']}
        label='Just date'
        value={thisDate}
        onChange={newValue => {
          setThisDate(newValue);
        }}
        renderInput={params => <TextField {...params} helperText={null} />}
      /> */}
      {/* </LocalizationProvider> */}

      <TableContainer component={Paper}>
        <Table
          sx={{ minWidth: 650 }}
          size='small'
          aria-label='a dense table'
          className='FoodList-table'
        >
          <TableHead stickyHeader>
            <TableRow>
              <TableCell>Food</TableCell>
              <TableCell align='right'>Amount&nbsp;(g)</TableCell>

              <TableCell align='right'>Calories&nbsp;(kcal)</TableCell>
              <TableCell align='right'>Fat&nbsp;(g)</TableCell>
              <TableCell align='right'>Carbs&nbsp;(g)</TableCell>
              <TableCell align='right'>Protein&nbsp;(g)</TableCell>
              <TableCell align='right'>Fiber&nbsp;(g)</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {list
              ?.filter(food => food.createdAt?.substring(0, 10) === thisDate)
              .map(food => {
                amountSum += food.amount;
                kcalSum += food.kcal;
                fatSum += food.fat;
                carbSum += food.carb;
                proteinSum += food.protein;
                fiberSum += food.fiber;
                return (
                  <TableRow
                    key={food.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component='th' scope='food'>
                      {food.name}
                    </TableCell>
                    <TableCell align='right'>{food.amount}</TableCell>

                    <TableCell align='right'>{Math.floor(food.kcal)}</TableCell>
                    <TableCell align='right'>{Math.floor(food.fat)}</TableCell>
                    <TableCell align='right'>{Math.floor(food.carb)}</TableCell>
                    <TableCell align='right'>
                      {Math.floor(food.protein)}
                    </TableCell>
                    <TableCell align='right'>
                      {Math.floor(food.fiber)}
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
          <TableRow
            sx={{ bgcolor: 'gray', color: 'white', fontWeight: 'bold' }}
          >
            {' '}
            <TableCell component='th' scope='food'>
              Total
            </TableCell>
            <TableCell align='right'>{amountSum}</TableCell>
            <TableCell align='right'>{Math.floor(kcalSum)}</TableCell>
            <TableCell align='right'>{Math.floor(fatSum)}</TableCell>
            <TableCell align='right'>{Math.floor(carbSum)}</TableCell>
            <TableCell align='right'>{Math.floor(proteinSum)}</TableCell>
            <TableCell align='right'>{Math.floor(fiberSum)}</TableCell>
          </TableRow>
        </Table>
      </TableContainer>
    </div>
  );
}

export default FoodList;
