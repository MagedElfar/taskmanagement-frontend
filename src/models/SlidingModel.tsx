import { Dialog, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import React from 'react'
import { IconButton } from '@mui/material';
import { useAppSelector } from '../hooks/store.hook';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="left" ref={ref} {...props} />;
});


type props = {
    open: boolean,
    children?: React.ReactNode,
    toggleOpen: () => void
}
const SlidingModel: React.FC<props> = ({ open, children, toggleOpen }) => {
    const { them } = useAppSelector(s => s)

    return (
        <Dialog
            open={open}
            onClose={toggleOpen}
            TransitionComponent={Transition}
            scroll="body"
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
            PaperProps={{
                sx: {
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    margin: 0,
                    px: 3,
                    py: 5,
                    borderRadius: 0,
                    overflow: "auto",
                    minWidth: "600px",
                    height: "calc(100vh - 30px)",
                    boxShadow: "0 10px 25px #00000080",
                    '&::-webkit-scrollbar': {
                        width: 0,
                    }
                }
            }}
        >
            <IconButton
                onClick={toggleOpen}
                sx={{
                    position: "absolute",
                    right: "15px",
                    top: "5px",
                }}
            >
                <CloseIcon sx={{
                    fill: them.colors.fourthColor, fontSize: "30px"
                }} />
            </IconButton>

            {children}

        </Dialog >
    )
}

export default SlidingModel