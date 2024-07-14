import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { IconButton, Tooltip as MuiTooltip, useTheme, Box, Typography, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PanToolIcon from '@mui/icons-material/PanTool';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import './Area.css';

const Donut = ({ data, title }) => {
  const chartRef = useRef();
  const theme = useTheme();
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const [isScaleEnabled, setIsScaleEnabled] = useState(false);

  useEffect(() => {
    const container = chartRef.current.parentNode;
    const width = container.clientWidth;
    const height = 300;
    const margin = 80;

    const radius = Math.min(width, height) / 2 - margin;

    const svg = d3.select(chartRef.current)
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`);

    const color = d3.scaleOrdinal()
      .domain(data.map(d => d.label))
      .range(data.map(d => d.color));

    const pie = d3.pie()
      .value(d => d.value);

    const data_ready = pie(data);

    const arc = d3.arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius);

    const outerArc = d3.arc()
      .innerRadius(radius * 0.9)
      .outerRadius(radius * 0.9);

    svg.selectAll('path')
      .data(data_ready)
      .enter()
      .append('path')
      .attr('d', arc)
      .attr('fill', d => color(d.data.label))
      .attr('stroke', theme.palette.background.default)
      .style('stroke-width', '2px')
      .style('opacity', 1);

    svg.selectAll('text')
      .data(data_ready)
      .enter()
      .append('text')
      .text(d => d.data.label)
      .attr('transform', d => {
        const pos = outerArc.centroid(d);
        const midAngle = (d.startAngle + d.endAngle) / 2;
        pos[0] = radius * 1.1 * (midAngle < Math.PI ? 1 : -1);
        return `translate(${pos})`;
      })
      .style('text-anchor', d => (d.endAngle + d.startAngle) / 2 < Math.PI ? 'start' : 'end')
      .style('font-size', '12px')
      .style('fill', theme.palette.text.secondary);

    svg.selectAll('polyline')
      .data(data_ready)
      .enter()
      .append('polyline')
      .attr('points', d => {
        const posA = arc.centroid(d);
        const posB = outerArc.centroid(d);
        const posC = outerArc.centroid(d);
        const midAngle = (d.startAngle + d.endAngle) / 2;
        posC[0] = radius * 1.05 * (midAngle < Math.PI ? 1 : -1);
        return [posA, posB, posC];
      })
      .style('fill', 'none')
      .attr('stroke', theme.palette.text.secondary)
      .style('stroke-width', '1px');

    const zoom = d3.zoom()
      .scaleExtent([1, 4])
      .on('zoom', null);

    const zoomHandler = d3.select(chartRef.current).call(zoom);
    zoomHandler.on('.zoom', null);

    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width } = entry.contentRect;
        svg.attr('width', width);
        svg.attr('height', height);
        svg.attr('transform', `translate(${width / 2}, ${height / 2})`);
      }
    });

    resizeObserver.observe(container);

    return () => {
      d3.select(chartRef.current).selectAll('*').remove();
      resizeObserver.disconnect();
    };
  }, [data, theme]);

  const zoomIn = () => {
    setZoomLevel(prevZoomLevel => {
      const newZoomLevel = prevZoomLevel * 1.2;
      d3.select(chartRef.current)
        .transition()
        .call(d3.zoom().scaleTo, newZoomLevel);
      return newZoomLevel;
    });
  };

  const zoomOut = () => {
    setZoomLevel(prevZoomLevel => {
      const newZoomLevel = prevZoomLevel / 1.2;
      d3.select(chartRef.current)
        .transition()
        .call(d3.zoom().scaleTo, newZoomLevel);
      return newZoomLevel;
    });
  };

  const toggleScroll = () => {
    setIsScrollEnabled(prev => !prev);
    const zoom = d3.zoom()
      .scaleExtent([1, 4])
      .on('zoom', isScrollEnabled ? null : (event) => {
        d3.select(chartRef.current).select('g').attr('transform', event.transform);
      });

    d3.select(chartRef.current).call(zoom);
  };

  const toggleScale = () => {
    setIsScaleEnabled(prev => !prev);
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
          <MuiTooltip title={isScaleEnabled ? 'Disable Scale' : 'Enable Scale'}>
            <IconButton onClick={toggleScale} aria-label="Toggle Scale">
              {isScaleEnabled ? <ZoomInIcon style={{ fontSize: 16 }} /> : <ZoomInOutlinedIcon style={{ fontSize: 16 }} />}
            </IconButton>
          </MuiTooltip>
          <MuiTooltip title={isScrollEnabled ? 'Disable Scroll' : 'Enable Scroll'}>
            <IconButton onClick={toggleScroll} aria-label="Toggle Scroll">
              {isScrollEnabled ? <PanToolIcon style={{ fontSize: 16 }} /> : <PanToolOutlinedIcon style={{ fontSize: 16 }} />}
            </IconButton>
          </MuiTooltip>
        </Box>
        <svg ref={chartRef}></svg>
      </Box>
    </Paper>
  );
};

export default Donut;
