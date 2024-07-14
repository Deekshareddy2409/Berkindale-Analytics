import React, { useState } from 'react';
import { Box, Grid, Paper, Typography, Drawer, Divider, Button,  FormControl, Select, MenuItem, InputLabel  } from '@mui/material';
import { styled } from '@mui/system';
import CustomDatePicker from '../components/CustomDatePicker';
import Bar from '../components/Charts/Bar';
import MultiLineChart from '../components/Charts/MultiLineChart';
import Donut from '../components/Charts/Donut'; // Import the DonutChart component
import BoxWhiskerChart from '../components/Charts/BoxWhiskerChart';

const generateRandomValues = (min, max) => Array.from({ length: 10 }, () => Math.floor(Math.random() * (max - min + 1)) + min);

const data = [
  { time: '2023-01-01', open: 0, high: 5, low: 0, close: 5 },
  { time: '2023-01-02', open: 0, high: 0, low: -3, close: -3 },
  { time: '2023-01-03', open: 0, high: 2, low: 0, close: 2 },
  { time: '2023-01-04', open: 0, high: 4, low: 0, close: 4 },
  { time: '2023-01-05', open: 0, high: 0, low: -1, close: -1 },
];

const exampleData = [
    { label: 'Broker 1', value: 30, color: 'rgba(255, 99, 132, 0.6)' },
    { label: 'Broker 2', value: 20, color: 'rgba(54, 162, 235, 0.6)' },
    { label: 'Broker 3', value: 25, color: 'rgba(75, 192, 192, 0.6)' },
    { label: 'Broker 4', value: 20, color: 'rgba(153, 102, 255, 0.6)' },
    { label: 'Broker 5', value: 20, color: 'rgba(255, 159, 64, 0.6)' },
    { label: 'Broker 6', value: 20, color: 'rgba(255, 205, 86, 0.6)' },
    { label: 'Broker 7', value: 20, color: 'rgba(75, 192, 192, 0.6)' },
    { label: 'Broker 8', value: 20, color: 'rgba(54, 162, 235, 0.6)' },
    { label: 'Broker 9', value: 20, color: 'rgba(255, 99, 132, 0.6)' },
    { label: 'Broker 10', value: 20, color: 'rgba(153, 102, 255, 0.6)' },
  ];

const multiLineData = [
  {
    label: 'Algo1',
    color: 'blue',
    data: [
      { value: generateRandomValues(0, 60)[0], time: 1642425322 },
      { value: generateRandomValues(0, 60)[1], time: 1642511722 },
      { value: generateRandomValues(0, 60)[2], time: 1642598122 },
      { value: generateRandomValues(0, 60)[3], time: 1642684522 },
      { value: generateRandomValues(0, 60)[4], time: 1642770922 },
      { value: generateRandomValues(0, 60)[5], time: 1642857322 },
      { value: generateRandomValues(0, 60)[6], time: 1642943722 },
      { value: generateRandomValues(0, 60)[7], time: 1643030122 },
      { value: generateRandomValues(0, 60)[8], time: 1643116522 },
      { value: generateRandomValues(0, 60)[9], time: 1643202922 },
    ],
  },
  {
    label: 'Algo2',
    color: 'red',
    data: [
      { value: generateRandomValues(0, 60)[0], time: 1642425322 },
      { value: generateRandomValues(0, 60)[1], time: 1642511722 },
      { value: generateRandomValues(0, 60)[2], time: 1642598122 },
      { value: generateRandomValues(0, 60)[3], time: 1642684522 },
      { value: generateRandomValues(0, 60)[4], time: 1642770922 },
      { value: generateRandomValues(0, 60)[5], time: 1642857322 },
      { value: generateRandomValues(0, 60)[6], time: 1642943722 },
      { value: generateRandomValues(0, 60)[7], time: 1643030122 },
      { value: generateRandomValues(0, 60)[8], time: 1643116522 },
      { value: generateRandomValues(0, 60)[9], time: 1643202922 },
    ],
  },
  {
    label: 'Algo3',
    color: 'green',
    data: [
      { value: generateRandomValues(0, 60)[0], time: 1642425322 },
      { value: generateRandomValues(0, 60)[1], time: 1642511722 },
      { value: generateRandomValues(0, 60)[2], time: 1642598122 },
      { value: generateRandomValues(0, 60)[3], time: 1642684522 },
      { value: generateRandomValues(0, 60)[4], time: 1642770922 },
      { value: generateRandomValues(0, 60)[5], time: 1642857322 },
      { value: generateRandomValues(0, 60)[6], time: 1642943722 },
      { value: generateRandomValues(0, 60)[7], time: 1643030122 },
      { value: generateRandomValues(0, 60)[8], time: 1643116522 },
      { value: generateRandomValues(0, 60)[9], time: 1643202922 },
    ],
  },
  {
    label: 'Algo4',
    color: 'orange',
    data: [
      { value: generateRandomValues(0, 60)[0], time: 1642425322 },
      { value: generateRandomValues(0, 60)[1], time: 1642511722 },
      { value: generateRandomValues(0, 60)[2], time: 1642598122 },
      { value: generateRandomValues(0, 60)[3], time: 1642684522 },
      { value: generateRandomValues(0, 60)[4], time: 1642770922 },
      { value: generateRandomValues(0, 60)[5], time: 1642857322 },
      { value: generateRandomValues(0, 60)[6], time: 1642943722 },
      { value: generateRandomValues(0, 60)[7], time: 1643030122 },
      { value: generateRandomValues(0, 60)[8], time: 1643116522 },
      { value: generateRandomValues(0, 60)[9], time: 1643202922 },
    ],
  },
  {
    label: 'Algo5',
    color: 'purple',
    data: [
      { value: generateRandomValues(0, 60)[0], time: 1642425322 },
      { value: generateRandomValues(0, 60)[1], time: 1642511722 },
      { value: generateRandomValues(0, 60)[2], time: 1642598122 },
      { value: generateRandomValues(0, 60)[3], time: 1642684522 },
      { value: generateRandomValues(0, 60)[4], time: 1642770922 },
      { value: generateRandomValues(0, 60)[5], time: 1642857322 },
      { value: generateRandomValues(0, 60)[6], time: 1642943722 },
      { value: generateRandomValues(0, 60)[7], time: 1643030122 },
      { value: generateRandomValues(0, 60)[8], time: 1643116522 },
      { value: generateRandomValues(0, 60)[9], time: 1643202922 },
    ],
  },
];


const StatisticBox = styled(Paper)(({ theme, negative }) => ({
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: theme.palette.background.paper,
    color: negative ? theme.palette.error.main : theme.palette.text.primary,
  }));
  
  const rightDrawerWidth = 300;

  const stats = [
    { label: "Value Traded (mm)", value: "$546.8 USD" },
    { label: "Commission ('000s)", value: "$185.5 USD" },
    { label: "Parent Orders", value: "1,132" },
    { label: "Securities", value: "202" },
    { label: "Arrival Performance", value: "0.07" },
    { label: "VWAP Performance", value: "0.14" },
    { label: "Brokers", value: "51" },
    { label: "Algos", value: "11" },
  ];

  
export default function BrokerReportCard() {

    const [errors, setErrors] = useState({});

    const [startDate, setStartDate] = useState('');
    const [endDate, setendDate] = useState('');
  
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
    
        case 'startDate':
          setStartDate(value);
          break;
        case 'endDate':
          setendDate(value);
          break;
        default:
          break;
      }
    };

  return (
    <Box sx={{ display: 'flex' }}>

    <Box component="main" sx={{ flexGrow: 1, p: 3, display: 'flex', flexDirection: 'column' }}>
    <Typography variant="h5" sx={{mb:2}}>Broker Report Card</Typography>

      <Grid container spacing={2} sx={{ mb: 2 }}>
        {stats.map((stat, index) => {
          const isNegative = parseFloat(stat.value) < 0;
          return (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <StatisticBox negative={isNegative}>
                <Typography variant="subtitle2">{stat.label}</Typography>
                <Typography variant="h6">{stat.value}</Typography>
              </StatisticBox>
            </Grid>
          );
        })}
      </Grid>


      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper>
                <BoxWhiskerChart title="Broker Cost Distribution"/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
          <BoxWhiskerChart title="VWAP Cost"/>

          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
          <BoxWhiskerChart title="Reversion 1 Minute Cost"/>
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            
          <MultiLineChart data={multiLineData.slice(0, 1)} title="Active Ratio" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
           
            <Bar data={data} title="Orders Traded" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            
          <Donut data={exampleData} title="Value Traded" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            
          <MultiLineChart data={multiLineData.slice(1, 2)} title="Spread Cross(wt avg)" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            
          <MultiLineChart data={multiLineData.slice(2, 3)} title="Liquidity Capture" />
          </Paper>
        </Grid>
       
      </Grid>

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
          <Typography variant="body1" sx={{mb: 2}}>Search</Typography>
          <Box sx={{mb: 2}}>
          <CustomDatePicker
            label="Start Date"
            value={startDate}
            onChange={(e) => handleFieldChange('startDate', e.target.value)}
            error={!!errors.startDate}
            helperText={errors.startDate ? 'Required' : ''}
          />
          </Box>
          <Box sx={{mb: 2}}>
          <CustomDatePicker
            label="End Date"
            value={endDate}
            onChange={(e) => handleFieldChange('endDate', e.target.value)}
            error={!!errors.endDate}
            helperText={errors.endDate ? 'Required' : ''}
          />
              </Box>
          
          
          <Button variant="contained" sx={{ mt: 2, width: '100%' }}>Search</Button>
        </Box>
        <Divider sx={{ mt: 2 }} />
        <Typography variant="body2" sx={{ mt: 2,mb: 2 }}>Interactive filters</Typography>
        <FormControl sx={{mb: 2}} variant="outlined" fullWidth >
              <InputLabel>Broker</InputLabel>
              <Select
                label="Broker"
              >
                <MenuItem value={'Test'}>Test</MenuItem>
              </Select>
            </FormControl>
      </Box>
    </Drawer>
  </Box>
  )
}
