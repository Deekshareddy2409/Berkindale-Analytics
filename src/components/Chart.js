import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import { IconButton, Tooltip, useTheme, Box, Typography, Paper } from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import PanToolIcon from '@mui/icons-material/PanTool';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import './Chart.css'; // Importing custom CSS for layout

const Chart = ({ data,title }) => {
    const chartContainerRef = useRef();
    const chartInstanceRef = useRef();
    const [isScrollEnabled, setIsScrollEnabled] = useState(false);
    const [isScaleEnabled, setIsScaleEnabled] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        const chartOptions = {
            layout: {
                textColor: theme.palette.text.secondary,
                background: { type: 'solid', color: theme.palette.background.default },
            },
            grid: {
                vertLines: {
                    visible: false,
                },
                horzLines: {
                    color: theme.palette.divider,
                },
            },
            leftPriceScale: {
                visible: true,
            },
            rightPriceScale: {
                visible: false,
            },
            timeScale: {
                borderVisible: true,
            },
            handleScroll: isScrollEnabled,
            handleScale: isScaleEnabled,
        };
        const chart = createChart(chartContainerRef.current, chartOptions);
        const areaSeries = chart.addAreaSeries({
            lineColor: theme.palette.primary.main,
            topColor: theme.palette.primary.main,
            bottomColor: theme.palette.primary.light,
        });

        areaSeries.setData(data);
        chart.timeScale().fitContent();

        chartInstanceRef.current = chart;

        return () => chart.remove();
    }, [data, isScrollEnabled, isScaleEnabled, theme]);

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
    };

    const toggleScale = () => {
        setIsScaleEnabled((prev) => !prev);
    };

    return (
        <Paper>

        <Box className="chart-container" p={2}>
                            <Typography variant="subtitle1">{title}</Typography>

            <Box display="flex" justifyContent="flex-end" alignItems="center" p={0}>
            <Box>
                    <Tooltip title="Zoom In">
                        <IconButton onClick={zoomIn} aria-label="Zoom In">
                            <AddCircleOutlineIcon style={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Zoom Out">
                        <IconButton onClick={zoomOut} aria-label="Zoom Out">
                            <RemoveCircleOutlineIcon style={{ fontSize: 16 }} />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={isScaleEnabled ? 'Disable Scale' : 'Enable Scale'}>
                        <IconButton onClick={toggleScale} aria-label="Toggle Scale">
                            {isScaleEnabled ? <ZoomInIcon style={{ fontSize: 16 }} /> : <ZoomInOutlinedIcon style={{ fontSize: 16 }} />}
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={isScrollEnabled ? 'Disable Scroll' : 'Enable Scroll'}>
                        <IconButton onClick={toggleScroll} aria-label="Toggle Scroll">
                            {isScrollEnabled ? <PanToolIcon style={{ fontSize: 16 }} /> : <PanToolOutlinedIcon style={{ fontSize: 16 }} />}
                        </IconButton>
                    </Tooltip>
                </Box>
            </Box>
            <div ref={chartContainerRef} style={{ height: '300px' }} />
        </Box>
        </Paper>

    );
};

export default Chart;
