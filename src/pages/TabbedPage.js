import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation, Route, Routes } from 'react-router-dom';
import { Tabs, Tab, Box, Grid, Paper, Typography, Drawer, Divider, Button, FormControl, Select, MenuItem, InputLabel, TextField, InputAdornment } from '@mui/material';
import { styled } from '@mui/system';
import Brokers from './Brokers';
import Algo from './Algo';
import Venues from './Venues';
import Orders from './Orders';
import CustomDatePicker from '../components/CustomDatePicker';
import ComboBoxWithChips from '../components/ComboBoxWithChips';
import marketData from '../MarketStats/ah.json';

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
  const [tickers, setTickers] = useState([]);
  const [selectedTicker, setSelectedTicker] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [orderTypes, setOrderTypes] = useState('');
  const [valueTraded, setValueTraded] = useState('');
  const [commission, setCommission] = useState('');
  const [parentOrders, setParentOrders] = useState('');
  const [securities, setSecurities] = useState('');
  const [brokers, setBrokers] = useState('');
  const [algos, setAlgos] = useState('');
  const [arrivalPerformance, setArrivalPerformance] = useState('');
  const [vwapPerformance, setVwapPerformance] = useState('');

  useEffect(() => {
    const combinedTickers = marketData.results.quote;
    const uniqueTickers = Array.from(new Map(combinedTickers.map(item => [item?.key?.symbol, item])).values());

    console.log('Combined Tickers:', combinedTickers);
    console.log('Unique Tickers:', uniqueTickers);
    setTickers(uniqueTickers);
  }, []);

  const handleFieldChange = (field, value) => {
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }

    switch (field) {
      // case 'dateRange':
      //   setDateRange(value);
      //   break;
      case 'startDate':
        setStartDate(value);
        break;
      case 'endDate':
        setEndDate(value);
        break;
      case 'selectedTicker':
        setSelectedTicker(value);
        break;
      // case 'selectedDate':
      //   setSelectedDate(value);
      //   break;
      case 'orderTypes':
        setOrderTypes(value);
        break;
      // case 'valueTraded':
      //   setValueTraded(value);
      //   break;
      // case 'commission':
      //   setCommission(value);
      //   break;
      // case 'parentOrders':
      //   setParentOrders(value);
      //   break;
      // case 'securities':
      //   setSecurities(value);
      //   break;
      // case 'brokers':
      //   setBrokers(value);
      //   break;
      // case 'algos':
      //   setAlgos(value);
      //   break;
      // case 'arrivalPerformance':
      //   setArrivalPerformance(value);
      //   break;
      // case 'vwapPerformance':
      //   setVwapPerformance(value);
      //   break;
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

  const handleSubmit = () => {
    const newErrors = {};
    if (selectedTicker.length === 0) newErrors.selectedTicker = true;
    // if (!selectedDate) newErrors.selectedDate = true;
    if (!orderTypes) newErrors.orderTypes = true;
    // if (!valueTraded) newErrors.valueTraded = true;
    // if (!commission) newErrors.commission = true;
    // if (!parentOrders) newErrors.parentOrders = true;
    // if (!securities) newErrors.securities = true;
    // if (!brokers) newErrors.brokers = true;
    // if (!algos) newErrors.algos = true;
    // if (!arrivalPerformance) newErrors.arrivalPerformance = true;
    // if (!vwapPerformance) newErrors.vwapPerformance = true;

    setErrors(newErrors);
  };

  const handleReset = () => {
    setDateRange('');
    setStartDate('');
    setEndDate('');
    setSelectedTicker([]);
    setSelectedDate(null);
    setOrderTypes('');
    setValueTraded('');
    setCommission('');
    setParentOrders('');
    setSecurities('');
    setBrokers('');
    setAlgos('');
    setArrivalPerformance('');
    setVwapPerformance('');
    setErrors({});
  };
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
        <Tabs 
         value={currentTab}
         onChange={handleChange}
         variant="fullWidth"
         indicatorColor="primary"
         textColor="primary"
        >
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
            {/* <Typography variant="body1" sx={{ mb: 2 }}>This Dataset Includes</Typography> */}

            {/* <Box sx={{ mb: 2 }}>
              <FormControl variant="outlined" fullWidth error={!!errors.orderTypes}>
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
            </Box> */}

            

            <Box sx={{ mb: 2 }}>
              <ComboBoxWithChips
                value={selectedTicker}
                onChange={(event, newValue) => handleFieldChange('selectedTicker', newValue)}
                error={!!errors.selectedTicker}
                helperText={errors.selectedTicker ? 'Required' : ''}
                options={tickers}
              />
            </Box>
            
            {/* <Box sx={{ mb: 2 }}>
              <CustomDatePicker
                label="Select Date"
                value={selectedDate}
                onChange={(e) => handleFieldChange('selectedDate', e.target.value)}
                error={!!errors.selectedDate}
                helperText={errors.selectedDate ? 'Required' : ''}
              />
            </Box> */}

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

            <Box sx={{ mb: 2 }}>
              <FormControl variant="outlined" fullWidth error={!!errors.orderTypes}>
                <InputLabel>Order types</InputLabel>
                <Select
                  value={orderTypes}
                  onChange={(e) => handleFieldChange('orderTypes', e.target.value)}
                  label="Order types"
                >
                  <MenuItem value={'Buy'}>Buy</MenuItem>
                  <MenuItem value={'Sell'}>Sell</MenuItem>
                </Select>
                {errors.orderTypes && <p style={{ color: 'red' }}>Required</p>}
              </FormControl>
            </Box>

            {/* <Box sx={{ mb: 2 }}>
              <TextField
                label="Value Traded (mm)"
                variant="outlined"
                type="number"
                fullWidth
                value={valueTraded}
                onChange={(e) => handleFieldChange('valueTraded', e.target.value)}
                error={!!errors.valueTraded}
                helperText={errors.valueTraded ? 'Required' : ''}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Commission ('000s)"
                variant="outlined"
                fullWidth
                type="number"
                value={commission}
                onChange={(e) => handleFieldChange('commission', e.target.value)}
                error={!!errors.commission}
                helperText={errors.commission ? 'Required' : ''}
                InputProps={{
                  startAdornment: <InputAdornment position="start">$</InputAdornment>,
                  endAdornment: <InputAdornment position="end">USD</InputAdornment>,
                }}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Parent Orders"
                variant="outlined"
                fullWidth
                type="number"
                value={parentOrders}
                onChange={(e) => handleFieldChange('parentOrders', e.target.value)}
                error={!!errors.parentOrders}
                helperText={errors.parentOrders ? 'Required' : ''}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Securities"
                variant="outlined"
                type="number"
                fullWidth
                value={securities}
                onChange={(e) => handleFieldChange('securities', e.target.value)}
                error={!!errors.securities}
                helperText={errors.securities ? 'Required' : ''}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Arrival Performance"
                variant="outlined"
                type="number"
                fullWidth
                value={arrivalPerformance}
                onChange={(e) => handleFieldChange('arrivalPerformance', e.target.value)}
                error={!!errors.arrivalPerformance}
                helperText={errors.arrivalPerformance ? 'Required' : ''}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="VWAP Performance"
                variant="outlined"
                type="number"
                fullWidth
                value={vwapPerformance}
                onChange={(e) => handleFieldChange('vwapPerformance', e.target.value)}
                error={!!errors.vwapPerformance}
                helperText={errors.vwapPerformance ? 'Required' : ''}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Brokers"
                variant="outlined"
                fullWidth
                type="number"
                value={brokers}
                onChange={(e) => handleFieldChange('brokers', e.target.value)}
                error={!!errors.brokers}
                helperText={errors.brokers ? 'Required' : ''}
              />
            </Box>

            <Box sx={{ mb: 2 }}>
              <TextField
                label="Algos"
                type="number"
                variant="outlined"
                fullWidth
                value={algos}
                onChange={(e) => handleFieldChange('algos', e.target.value)}
                error={!!errors.algos}
                helperText={errors.algos ? 'Required' : ''}
              />
            </Box> */}

            <Button 
              variant="contained" 
              sx={{ mt: 2, width: '100%' }} 
              onClick={handleSubmit}
            >
            View Data
            </Button>
          </Box>
          <Divider sx={{ mt: 2 }} />
          <Typography variant="body2" sx={{ mt: 2 }}>Explore this Dataset</Typography>
          <Button variant="outlined" sx={{ mt: 2, width: '100%' }} onClick={handleReset}
          >Reset all Filters</Button>
        </Box>
      </Drawer>
    </Box>
  );
}
