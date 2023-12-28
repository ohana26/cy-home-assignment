import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useLocation } from 'react-router-dom';
import { Route as pageRoute } from '../types/route';

export function getRouteName(route: string): string | undefined {
  return Object.keys(pageRoute).find((routeKey) => (pageRoute as any)[routeKey].indexOf(route) === 0);
}

export const MUIAppBar: React.FC = () => {
  const location = useLocation();
  const routeName = getRouteName(location.pathname);

  return (<Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {routeName}
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
  )
}
