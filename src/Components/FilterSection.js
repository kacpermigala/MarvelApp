import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  icon: {
    height: '1em',
  },
}));

const FilterSection = ({
  orderBy,
  setOrderBy,
  nameStartsWith,
  setNameStartsWith,
}) => {
  const classes = useStyles();

  return (
    <div id="filter-section">
      <TextField
        className={classes.formControl}
        id="standard-name"
        label="Name"
        value={nameStartsWith}
        onChange={ev => {
          setNameStartsWith(ev.target.value);
        }}
        margin="normal"
      />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor="sorting">Sort</InputLabel>
        <Select
          id="standard-order"
          value={orderBy}
          onChange={ev => {
            setOrderBy(ev.target.value);
          }}
        >
          <MenuItem value={'-name'}>Name &#x25B2;</MenuItem>
          <MenuItem value={'name'}>Name &#x25BC;</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
};

export default FilterSection;
