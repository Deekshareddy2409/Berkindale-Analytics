import * as React from 'react';
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
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="Trade Performance" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="Orders" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="Brokers" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="Venues" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="Algos" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="Best Execution Report" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="Broker Report Card" />
      </ListItemButton>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary="Order Search" />
      </ListItemButton>
    </NestedListItem>
   
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
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
