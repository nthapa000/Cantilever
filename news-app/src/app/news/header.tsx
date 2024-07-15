import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const NewsHeader = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6">
        News App
      </Typography>
    </Toolbar>
  </AppBar>
);

export default NewsHeader;
