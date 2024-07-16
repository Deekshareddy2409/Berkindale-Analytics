import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Route, Routes } from 'react-router-dom';
import { Tabs, Tab, Box, Grid, Paper, Typography, Drawer, Divider, Button, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import Brokers from './Brokers';
import Algo from './Algo';
import Venues from './Venues';
import Orders from './Orders';
import CustomDatePicker from '../components/CustomDatePicker';

const rightDrawerWidth = 300;

const stats = [
  { label: "Value Traded (mm)", value: "$546.8 USD" },
  { label: "Commission ('000s)", value: "$185.5 USD" },
  { label: "Parent Orders", value: "1,132" },
  { label: "Securities", value: "202" },
  { label: "Arrival Performance", value: "-43.01" },
  { label: "VWAP Performance", value: "-1.28" },
  { label: "Brokers", value: "12" },
  { label: "Algos", value: "5" },
  { label: "Intra Order Volatility", value: "$0.3134 USD" },
  { label: "Intra Order Spread", value: "7.39" },
];

const StatisticBox = styled(Paper)(({ theme, negative }) => ({
  padding: theme.spacing(2),
  textAlign: 'center',
  backgroundColor: theme.palette.background.paper,
  color: negative ? theme.palette.error.main : theme.palette.text.primary,
}));

export default function TabbedPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTab = location.pathname.split('/')[2] || 'orders';

  const handleChange = (event, newValue) => {
    navigate(`/trade-performance/${newValue}`);
  };

  const [errors, setErrors] = useState({});
  const [dateRange, setDateRange] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleFieldChange = (field, value) => {
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }

    switch (field) {
      case 'dateRange':
        setDateRange(value);
        break;
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    const tab = location.pathname.split('/')[2] || 'orders';
    if (currentTab !== tab) {
      navigate(`/trade-performance/${tab}`);
    }
  }, [location.pathname, navigate, currentTab]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
        <Typography variant="h5" gutterBottom>Trade Performance</Typography>
        <Grid container spacing={2} sx={{ mb: 2 }}>
          {stats.map((stat, index) => {
            const isNegative = parseFloat(stat.value) < 0;
            return (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <StatisticBox negative={isNegative ? 'true' : undefined}>
                <Typography variant="subtitle2">{stat.label}</Typography>
                  <Typography variant="h6">{stat.value}</Typography>
                </StatisticBox>
              </Grid>
            );
          })}
        </Grid>
        <Tabs value={currentTab} onChange={handleChange}>
          <Tab label="Orders" value="orders" />
          <Tab label="Brokers" value="brokers" />
          <Tab label="Venues" value="venues" />
          <Tab label="Algos" value="algos" />
        </Tabs>
        <Box sx={{ padding: 2, flexGrow: 1 }}>
          <Routes>
            <Route path="orders" element={<Orders />} />
            <Route path="brokers" element={<Brokers />} />
            <Route path="venues" element={<Venues />} />
            <Route path="algos" element={<Algo />} />
          </Routes>
        </Box>
      </Box>

      <Drawer
        sx={{
          width: rightDrawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: rightDrawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="right"
      >
        <Box sx={{ p: 2 }}>
          <Typography variant="h6" gutterBottom>Data Explorer</Typography>
          <Divider />
          <Box sx={{ mt: 2 }}>
            <Typography variant="body1" sx={{ mb: 2 }}>This Dataset Includes</Typography>

            <FormControl sx={{ mb: 2 }} variant="outlined" fullWidth error={!!errors.orderTypes}>
              <InputLabel>Date Range</InputLabel>
              <Select
                value={dateRange}
                onChange={(e) => handleFieldChange('dateRange', e.target.value)}
                label="Date Range"
              >
                <MenuItem value={'15days'}>Last 15 Days</MenuItem>
                <MenuItem value={'25days'}>Last 25 Days</MenuItem>
              </Select>
              {errors.dateRange && <p style={{ color: 'red' }}>Required</p>}
            </FormControl>
            <Box sx={{ mb: 2 }}>
              <CustomDatePicker
                label="Start Date"
                value={startDate}
                onChange={(e) => handleFieldChange('startDate', e.target.value)}
                error={!!errors.startDate}
                helperText={errors.startDate ? 'Required' : ''}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <CustomDatePicker
                label="End Date"
                value={endDate}
                onChange={(e) => handleFieldChange('endDate', e.target.value)}
                error={!!errors.endDate}
                helperText={errors.endDate ? 'Required' : ''}
              />
            </Box>
            <Button variant="contained" sx={{ mt: 2, width: '100%' }}>Load New Dataset</Button>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Typography variant="body2" sx={{ mt: 2 }}>Explore this Dataset</Typography>
          <Button variant="outlined" sx={{ mt: 2, width: '100%' }}>Reset all Filters</Button>
        </Box>
      </Drawer>
    </Box>
  );
}
