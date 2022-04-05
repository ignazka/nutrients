import React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

function Searchbar({ onChange }) {
  const initialValue = '';

  const [input, setInput] = React.useState(initialValue);

  const handleChange = ({ target }) => {
    const inputValue = target.value;
    setInput({ ...input, inputValue });
  };

  return (
    <Paper
      sx={{
        // bgcolor: '#545454',
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        mode: 'dark',
      }}
      onSubmit={event => {
        event.preventDefault();
        onChange(event.target[0].value);
        setInput(initialValue);
      }}
      component='form'
    >
      <InputBase
        name='search'
        value={input.inputValue || ''}
        onChange={handleChange}
        type='text'
        placeholder='Potato'
        variant='outlined'
        label='search'
        width='100%'
        color='white'
      />

      <IconButton color='white' type='submit'>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default Searchbar;
