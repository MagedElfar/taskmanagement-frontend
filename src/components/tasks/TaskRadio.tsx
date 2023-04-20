import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';

type prop = {
    value: string,
    onChange: (value: string) => void
}

const TaskRadio: React.FC<prop> = ({ value, onChange }) => {
    const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }
    return (
        <FormControl sx={{ mb: 2 }}>
            <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={handelChange}
                value={value}
            >
                <FormControlLabel value="my-tasks" control={<Radio />} label="My Tasks" />
                <FormControlLabel value="all-tasks" control={<Radio />} label="All Tasks" />
            </RadioGroup>
        </FormControl>
    );
}

export default TaskRadio;