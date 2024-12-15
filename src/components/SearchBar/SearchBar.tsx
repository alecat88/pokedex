import { useState } from 'react';
import { createUseStyles } from 'react-jss';

export const SearchBar = ({
  onChange,
  placeHolder = '',
}: {
  onChange: (s: string) => void;
  placeHolder?: string;
}) => {
  const classes = useStyles();
  const [value, setValue] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValue(value);
    onChange(value);
  };

  return (
    <input
      value={value}
      placeholder={placeHolder}
      onChange={handleInputChange}
      className={classes.root}
    ></input>
  );
};

const useStyles = createUseStyles(
  {
    root: {
      width: '100%',
      textAlign: 'left',
      padding: '2px',
      marginBottom: '10px',
      boxSizing: 'border-box',
      color: 'black',
    },
  },
  { name: 'SearchBar' }
);
