import { Box, Grid, Paper } from '@mui/material';
import React from 'react';
import Bar from '../components/Charts/Bar';
import MultiLineChart from '../components/Charts/MultiLineChart';
import Donut from '../components/Charts/Donut';

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

export default function Venues() {
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Paper>
            
          <Donut data={exampleData} title="Value By Venue (CA)" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            
          <Donut data={exampleData} title="Value By Venue (CA)" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            
          <Donut data={exampleData} title="Value By Venue (US)" /> 
          </Paper>
        </Grid>
        <Grid item xs={12} md={3}>
          <Paper>
            
          <Donut data={exampleData} title="Volume By Venue (US)" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
           
            <Bar data={data} title="Spread Cross By Venue" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            
          <MultiLineChart data={multiLineData.slice(0, 4)} title="Adverse Selection by Venue" />
          </Paper>
        </Grid>
       
      </Grid>
    </Box>
  );
}
