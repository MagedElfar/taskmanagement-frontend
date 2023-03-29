import React from 'react';
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import Modal from '@mui/material/Modal';
import { IconButton } from '@mui/material';
import { useAppSelector } from '../hooks/store.hook';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    borderRadius: "12px",
    bgcolor: "#fff",
    border: "none",
    boxShadow: 24,
    p: 4,
    pt: 8
};

type props = {
    open: boolean,
    children?: React.ReactNode,
    toggleOpen: any
}

const Model: React.FC<props> = ({ open = true, children, toggleOpen }) => {

    const { them } = useAppSelector(s => s)

    return (
        <div>
            <Modal
                open={open}
                onClose={toggleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <IconButton
                        onClick={toggleOpen}
                        sx={{
                            position: "absolute",
                            right: "15px",
                            top: "5px",
                        }}
                    >
                        <CloseIcon sx={{
                            color: them.colors.fourthColor, fontSize: "30px"
                        }} />
                    </IconButton>
                    {children}
                </Box>
            </Modal>
        </div>
    );
}

export default Model