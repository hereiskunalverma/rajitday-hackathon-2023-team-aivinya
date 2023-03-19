import React from 'react';
import styled from 'styled-components';
import Lottie from 'lottie-react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const StyledOverlay = styled.div`
  z-index: 100;
  background-color: black;
  opacity: 0.4;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Loader = styled.div`
  z-index: 101;
  position: fixed;
  top: 30%;
  left: calc(50% - 100px);
  width: 200px;
  height: 200px;
  border-radius: 50%;
  perspective: 480px;
`;

const LoadingOverlay = ({ isLoading }) => {
  console.log(isLoading);
  return (
    <div>
      <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default LoadingOverlay;
