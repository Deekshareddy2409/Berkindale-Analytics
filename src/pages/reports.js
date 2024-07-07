import React, { useEffect, useState } from 'react';
import { Box, Paper, Grid, TextField, Button, InputAdornment, FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import ComboBoxWithChips from '../components/ComboBoxWithChips';
import Chart from '../components/Chart';
import CustomDatePicker
 from '../components/CustomDatePicker';
export default function Reports({tickers}) {
    console.log('in in report',tickers)
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
  const [chartData, setChartData] = useState([]);
  const [showChart, setShowChart] = useState(false);
  useEffect(()=>{
    const marketData = [{ value: 0, time: 1642425322 }, { value: 8, time: 1642511722 }, { value: 10, time: 1642598122 }, { value: 20, time: 1642684522 }, { value: 3, time: 1642770922 }, { value: 43, time: 1642857322 }, { value: 41, time: 1642943722 }, { value: 43, time: 1643030122 }, { value: 56, time: 1643116522 }, { value: 46, time: 1643202922 }];
    setChartData(marketData);
  },[])
  const [errors, setErrors] = useState({});

  const handleFieldChange = (field, value) => {
    console.log('im error to be included')
    if (errors[field]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[field];
        return newErrors;
      });
    }

    switch (field) {
      case 'selectedTicker':
        setSelectedTicker(value);
        break;
      case 'selectedDate':
        setSelectedDate(value);
        break;
      case 'orderTypes':
        setOrderTypes(value);
        break;
      case 'valueTraded':
        setValueTraded(value);
        break;
      case 'commission':
        setCommission(value);
        break;
      case 'parentOrders':
        setParentOrders(value);
        break;
      case 'securities':
        setSecurities(value);
        break;
      case 'brokers':
        setBrokers(value);
        break;
      case 'algos':
        setAlgos(value);
        break;
      case 'arrivalPerformance':
        setArrivalPerformance(value);
        break;
      case 'vwapPerformance':
        setVwapPerformance(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    if (selectedTicker.length === 0) newErrors.selectedTicker = true;
    if (!selectedDate) newErrors.selectedDate = true;
    if (!orderTypes) newErrors.orderTypes = true;
    if (!valueTraded) newErrors.valueTraded = true;
    if (!commission) newErrors.commission = true;
    if (!parentOrders) newErrors.parentOrders = true;
    if (!securities) newErrors.securities = true;
    if (!brokers) newErrors.brokers = true;
    if (!algos) newErrors.algos = true;
    if (!arrivalPerformance) newErrors.arrivalPerformance = true;
    if (!vwapPerformance) newErrors.vwapPerformance = true;

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
        setShowChart(true);
      console.log('Success: All fields are filled.');
    } else {
        setShowChart(false);

      console.error('Error: Please fill in all required fields.');
    }
  };

  console.log('error', errors)
  return (
    <Box p={3}>
      <Paper>
        <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={5}>
            <ComboBoxWithChips
              value={selectedTicker}
              onChange={(event, newValue) => handleFieldChange('selectedTicker', newValue)}
              error={!!errors.selectedTicker}
              helperText={errors.selectedTicker ? 'Required' : ''}
              options={tickers}
            />
           
          </Grid>
          <Grid item xs={12} sm={4}>
          <CustomDatePicker
              label="Select Date"
              value={selectedDate}
              onChange={(e) => handleFieldChange('selectedDate', e.target.value)}
              error={!!errors.selectedDate}
              helperText={errors.selectedDate ? 'Required' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
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
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
       
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
             <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
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
          </Grid>
        </Grid>

        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSubmit}
          >
            View Data
          </Button>
        </Box>
      </Paper>

{showChart && (
    <Grid container spacing={2} p={2}>
          <Grid item xs={12} sm={6}>
          <Chart data={chartData} title="PricePath"/>

            </Grid>

            <Grid item xs={12} sm={6}>
          <Chart data={chartData} title="Adverse selection by side"/>

            </Grid>

            <Grid item xs={12} sm={4}>
          <Chart data={chartData} title="Arrival Cost by Side"/>

            </Grid>
            <Grid item xs={12} sm={4}>
          <Chart data={chartData} title="Arrival Cost by Broker"/>

            </Grid>
            <Grid item xs={12} sm={4}>
          <Chart data={chartData} title="Arrival Cost by Algo"/>

            </Grid>

            <Grid item xs={12} sm={4}>
          <Chart data={chartData} title="VWAP Cost by Side"/>

            </Grid>
            <Grid item xs={12} sm={4}>
          <Chart data={chartData} title="VWAP Cost by Broker"/>

            </Grid>
            <Grid item xs={12} sm={4}>
          <Chart data={chartData} title="VWAP Cost by Algo"/>

            </Grid>
            </Grid>
)}
      
          </Box>
  );
}
