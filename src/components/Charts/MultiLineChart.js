import React, { useEffect, useRef } from 'react';
import { createChart } from 'lightweight-charts';
import { IconButton, Tooltip as MuiTooltip, useTheme, Box, Typography, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import './Area.css'; 

const MultiLineChart = ({ data, title }) => {
  const chartRef = useRef();
  const theme = useTheme();
  const chartInstanceRef = useRef();

  useEffect(() => {
    const chartOptions = {
      layout: {
        textColor: theme.palette.text.secondary,
        background: { type: 'solid', color: theme.palette.background.default },
      },
      grid: {
        vertLines: {
          color: theme.palette.divider,
        },
        horzLines: {
          color: theme.palette.divider,
        },
      },
      width: chartRef.current.clientWidth,
      height: 300,
      autoSize: true,
      leftPriceScale: {
        visible: true,
      },
      rightPriceScale: {
        visible: false,
      },
      timeScale: {
        borderVisible: true,
      },
    };

    const chart = createChart(chartRef.current, chartOptions);

    data.forEach((seriesData) => {
      const lineSeries = chart.addLineSeries({
        color: seriesData.color,
        lineWidth: 2,
        title: seriesData.label,
      });
      lineSeries.setData(seriesData.data);
    });

    chart.timeScale().fitContent();
    chartInstanceRef.current = chart;

    return () => {
      chart.remove();
    };
  }, [data, theme]);

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
    const scrollEnabled = chartInstanceRef.current.options().handleScroll;
    chartInstanceRef.current.applyOptions({ handleScroll: !scrollEnabled });
  };

  const toggleScale = () => {
    const scaleEnabled = chartInstanceRef.current.options().handleScale;
    chartInstanceRef.current.applyOptions({ handleScale: !scaleEnabled });
  };

  return (
    <Paper>
      <Box className="chart-container" p={2}>
        <Typography variant="subtitle1">{title}</Typography>
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

export default MultiLineChart;
