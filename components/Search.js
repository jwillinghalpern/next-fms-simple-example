import { useState } from 'react';
import Button from './Button';

export default function Search({ onSubmit, style, placeholder }) {
  const [value, setValue] = useState('');
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(value);
  }
  return (
    <form onSubmit={handleSubmit} style={style}>
      <input
        type={'text'}
        name={'search'}
        placeholder={`${placeholder || 'Search'}`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />{' '}
      <button color={'primary'} title={'Search'}>
        Search
      </button>
    </form>
  );
}
