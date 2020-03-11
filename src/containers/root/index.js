import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import React from 'react';
import ToDo from 'components/to-do';

const theme = createMuiTheme();

const Root = () => {
  return (
    <ThemeProvider theme={theme}>
      <ToDo />
    </ThemeProvider>
  );
};

export default Root;
