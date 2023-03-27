import React from 'react'
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

type Props = {
    errors: any[]
};

const Errors: React.FC<Props> = ({ errors }) => {
    return (
        <Stack sx={{
            width: '100%',
            marginBottom: 3
        }} spacing={2}>
            {
                errors.map((error, index) => <Alert key={index} severity="error">{error}</Alert>)
            }
        </Stack>
    );
}

export default Errors