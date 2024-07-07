import React, { useRef } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import './CustomDatePicker.css';

const CustomDatePicker = ({ label, value, onChange, error, helperText }) => {
  const dateInputRef = useRef(null);

  const handleIconClick = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker();
    }
  };

  return (
    <TextField
      className="custom-date-picker"
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth
      error={error}
      helperText={helperText}
      InputLabelProps={{
        shrink: true,
      }}
      inputRef={dateInputRef}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleIconClick}>
              <CalendarTodayIcon style={{ color: 'white' }} />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default CustomDatePicker;
