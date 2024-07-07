import React, { useState } from 'react';
import { TextField, Autocomplete, Chip, Box, IconButton, Tooltip } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function ComboBoxWithChips({ options, value, onChange, error, helperText }) {
  const [selectedTickers, setSelectedTickers] = useState([]);
    const [inputValue, setInputValue] = useState('');

    const handleDelete = (tickerToDelete) => () => {
        setSelectedTickers((tickers) => tickers.filter((ticker) => ticker !== tickerToDelete));
    };

    return (
        <Box>
            <Autocomplete
                multiple
                id="ticker-combo-box"
                options={options}
                getOptionLabel={(option) => option.equityinfo?.longname || 'Unknown'}
                value={selectedTickers}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => setInputValue(newInputValue)}
                onChange={(event, newValue) => {
                  onChange(event, newValue)
                    setSelectedTickers(newValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="outlined"
                        label="Tickers"
                        error={error}
                        placeholder="Select tickers"
                        helperText={helperText}
                    />
                )}
                renderTags={(selectedTickers, getTagProps) =>
                    selectedTickers.map((option, index) => {
                        const { key, ...tagProps } = getTagProps({ index });
                        return (
                            <Chip
                                key={`${option.equityinfo?.shortname}-${index}`}
                                label={option.equityinfo?.shortname || 'Unknown'}
                                deleteIcon={
                                    <Tooltip title="Remove">
                                        <IconButton size="small">
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    </Tooltip>
                                }
                                onDelete={handleDelete(option)}
                                {...tagProps}
                            />
                        );
                    })
                }
            />
        </Box>
    );
};

export default ComboBoxWithChips;
