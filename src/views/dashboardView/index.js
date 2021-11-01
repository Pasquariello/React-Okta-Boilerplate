import React from 'react';
import {Box, Typography} from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';


function DashboardView({ className, onSubmitSuccess, ...rest }) {
  const { oktaAuth } = useOktaAuth();

  return (
    <Box>  
        <button onClick={() => {oktaAuth.signOut()}}>Logout</button> :
        <Typography variant="h6">Hello!</Typography>
    </Box>

  );
}

export default DashboardView;