import React from 'react'
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

type Props = {
    text: string
};

const Success: React.FC<Props> = ({ text }) => {
    return (
        <Stack sx={{
            width: '100%',
            maxWidth: "100%",
            marginBottom: 3
        }} spacing={2}>
            {
                text ? <Alert severity="success">{text}</Alert> : null
            }
        </Stack>
    );
}

export default Success
