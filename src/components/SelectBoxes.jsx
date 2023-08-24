import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectTextFields({helperText, options, id}) {
    const [selectedOption, setSelectedOption] = React.useState('');

    const handleChange = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Box sx={{
            minWidth: 250,
            marginRight: 5
        }}>
            <FormControl variant="standard" sx={{m: 1, minWidth: 250}}>
                <InputLabel>{helperText}</InputLabel>
                <Select
                    labelId={id}
                    id={id}
                    value={selectedOption}
                    label={helperText}
                    onChange={handleChange}
                >
                    {options.map(option => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </Select>
            </FormControl>
        </Box>
    );
}