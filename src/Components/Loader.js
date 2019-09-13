import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

const Loader = ({ show, children }) => {
  return !show ? (
    children
  ) : (
    <div className="loader-wrapper">
      <CircularProgress />
    </div>
  );
};

export default Loader;
