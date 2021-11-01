import React, { useEffect } from 'react';
import NProgress from 'nprogress';
import { Box, LinearProgress } from '@mui/material';

function LoadingScreen() {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);
  return (
      <Box width={400}>
        <LinearProgress />
      </Box>
  );
}
export default LoadingScreen;