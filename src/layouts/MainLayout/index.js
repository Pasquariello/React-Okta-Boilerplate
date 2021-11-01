import React from 'react';
import {Box, Container} from '@mui/material';

const MainLayout = ({children}) => {
    
    return (
        <Container>
             {/* Add global nav bar here! */}
            {/* <Navigation /> */}
            <Box>
                {children}
            </Box>
        </Container>
    )
}

export default MainLayout;