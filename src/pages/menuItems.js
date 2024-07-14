import * as React from 'react';
import { Link } from 'react-router-dom';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export const mainListItems = (drawerOpen) => (
  <React.Fragment>
    <NestedListItem text="Reports" icon={<BarChartIcon />} drawerOpen={drawerOpen}>
      <ListItemButton component={Link} to="/trade-performance" sx={{ pl: 4 }}>
        <ListItemText primary="Trade Performance" />
      </ListItemButton>
      <ListItemButton component={Link} to="/reports#brokers" sx={{ pl: 4 }}>
        <ListItemText primary="Brokers" />
      </ListItemButton>
      <ListItemButton component={Link} to="/reports#venues" sx={{ pl: 4 }}>
        <ListItemText primary="Venues" />
      </ListItemButton>
      <ListItemButton component={Link} to="/reports#algos" sx={{ pl: 4 }}>
        <ListItemText primary="Algos" />
      </ListItemButton>
      {/* Add more ListItemButton as needed */}
    </NestedListItem>
    <ListItemButton component={Link} to="/broker-report-card" >
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Broker Report Card" />
    </ListItemButton>
  </React.Fragment>
);

function NestedListItem({ text, icon, children, drawerOpen }) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <React.Fragment>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {drawerOpen && (
        <Collapse in={open} timeout="auto" unmountOnExit>
          {children}
        </Collapse>
      )}
    </React.Fragment>
  );
}
