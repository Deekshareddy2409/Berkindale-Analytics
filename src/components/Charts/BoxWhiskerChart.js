import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { WhiskerBoxSeries } from './box-whisker-series/box-whisker-series.ts';
import { sampleWhiskerData } from './box-whisker-series/sample-data.ts';
import { Box, Typography, Paper, IconButton, Tooltip as MuiTooltip } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';

const BoxWhiskerChart = ({ title }) => {
  const chartRef = useRef();
  const chartInstanceRef = useRef();
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const [isScaleEnabled, setIsScaleEnabled] = useState(false);

  useEffect(() => {
    const chart = createChart(chartRef.current, {
      layout: {
        textColor: '#d1d4dc',
        background: { type: 'solid', color: '#131722' },
      },
      grid: {
        vertLines: {
          color: '#2c2e34',
        },
        horzLines: {
          color: '#2c2e34',
        },
      },
      width: chartRef.current.clientWidth,
      height: 300,
      autoSize: true,
    });

    const customSeriesView = new WhiskerBoxSeries();
    const myCustomSeries = chart.addCustomSeries(customSeriesView, {
      baseLineColor: '',
      priceLineVisible: false,
      lastValueVisible: false,
    });

    const data = sampleWhiskerData();
    myCustomSeries.setData(data);

    chart.timeScale().fitContent();

    chartInstanceRef.current = chart;

    return () => {
      chart.remove();
    };
  }, []);

  const zoomIn = () => {
    if (chartInstanceRef.current) {
      const timeScale = chartInstanceRef.current.timeScale();
      const logicalRange = timeScale.getVisibleLogicalRange();
      const zoomFactor = 0.5;
      const mid = (logicalRange.from + logicalRange.to) / 2;
      const newRange = {
        from: mid - (mid - logicalRange.from) * zoomFactor,
        to: mid + (logicalRange.to - mid) * zoomFactor,
      };
      timeScale.setVisibleLogicalRange(newRange);
    }
  };

  const zoomOut = () => {
    if (chartInstanceRef.current) {
      const timeScale = chartInstanceRef.current.timeScale();
      const logicalRange = timeScale.getVisibleLogicalRange();
      const zoomFactor = 0.5;
      const mid = (logicalRange.from + logicalRange.to) / 2;
      const newRange = {
        from: mid - (mid - logicalRange.from) / zoomFactor,
        to: mid + (logicalRange.to - mid) / zoomFactor,
      };
      timeScale.setVisibleLogicalRange(newRange);
    }
  };

  const toggleScroll = () => {
    setIsScrollEnabled((prev) => !prev);
    if (chartInstanceRef.current) {
      chartInstanceRef.current.applyOptions({
        handleScroll: {
          mouseWheel: !isScrollEnabled,
          pressedMouseMove: !isScrollEnabled,
        },
      });
    }
  };

  const toggleScale = () => {
    setIsScaleEnabled((prev) => !prev);
    if (chartInstanceRef.current) {
      chartInstanceRef.current.applyOptions({
        handleScale: {
          axisPressedMouseMove: !isScaleEnabled,
          pinch: !isScaleEnabled,
        },
      });
    }
  };

  return (
    <Paper>
      <Box p={2}>
        <Typography variant="subtitle1" gutterBottom>
          {title}
        </Typography>
        <Box display="flex" justifyContent="flex-end" alignItems="center" p={0}>
          <MuiTooltip title="Zoom In">
            <IconButton onClick={zoomIn} aria-label="Zoom In">
              <AddCircleOutlineIcon style={{ fontSize: 16 }} />
            </IconButton>
          </MuiTooltip>
          <MuiTooltip title="Zoom Out">
            <IconButton onClick={zoomOut} aria-label="Zoom Out">
              <RemoveCircleOutlineIcon style={{ fontSize: 16 }} />
            </IconButton>
          </MuiTooltip>
          <MuiTooltip title="Toggle Scale">
            <IconButton onClick={toggleScale} aria-label="Toggle Scale">
              <ZoomInIcon style={{ fontSize: 16 }} />
            </IconButton>
          </MuiTooltip>
          <MuiTooltip title="Toggle Scroll">
            <IconButton onClick={toggleScroll} aria-label="Toggle Scroll">
              <PanToolOutlinedIcon style={{ fontSize: 16 }} />
            </IconButton>
          </MuiTooltip>
        </Box>
        <div ref={chartRef} style={{ height: '300px' }}></div>
      </Box>
    </Paper>
  );
};

export default BoxWhiskerChart;
