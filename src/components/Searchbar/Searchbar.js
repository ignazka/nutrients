import React from 'react';

function Searchbar({ onChange }) {
  const initialValue = '';

  const [input, setInput] = React.useState(initialValue);

  const handleChange = ({ target }) => {
    const inputValue = target.value;
    setInput({ ...input, inputValue });
  };

  return (
    <form
      onSubmit={event => {
        event.preventDefault();
        onChange(event.target[0].value);
        setInput(initialValue);
      }}
    >
      <label className='label' htmlFor='search'>
        {' '}
        Search Food
      </label>
      <input
        name='search'
        className='input is-dark'
        value={input.inputValue || ''}
        onChange={handleChange}
        type='text'
        placeholder='Potato'
      />

      <button className='button is-dark' type='submit'>
        search
      </button>
    </form>
  );
}

export default Searchbar;
