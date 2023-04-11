import { Snackbar, Alert } from '@mui/material';
import React, { useEffect, useState } from 'react'

type props = {
    errors: string[]
}

const SnackError: React.FC<props> = ({ errors }) => {
    //Snackbar
    const [open, setOpen] = useState(false);
    const handleCloseBar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        setOpen(false);
    };

    console.log("errors")

    useEffect(() => {
        if (errors.length > 0) setOpen(true)
    }, [errors.length])

    if (errors.length === 0) return;

    return (
        <div>
            {errors.map((error: string, index: number) => <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                key={index}
                open={open}
                autoHideDuration={6000}
                onClose={handleCloseBar}
            >
                <Alert onClose={handleCloseBar} severity="error" sx={{ width: '100%' }}>
                    {error}
                </Alert>
            </Snackbar>)
            }
        </div>
    )
}

export default SnackError