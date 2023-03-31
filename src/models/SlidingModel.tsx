import { Dialog, Slide } from '@mui/material'
import { TransitionProps } from '@mui/material/transitions';
import React from 'react'


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

    return (
        <Dialog
            open={open}
            onClose={toggleOpen}
            TransitionComponent={Transition}

            PaperProps={{
                sx: {
                    position: "absolute",
                    top: "15px",
                    right: "15px",
                    margin: 0,
                    padding: 3,
                    borderRadius: 0,
                    width: "600px",
                    height: "calc(100vh - 15px)",
                    maxHeight: "calc(100vh - 30px)",
                    boxShadow: "0 10px 25px #00000080;"

                }
            }}
        >

            {children}
        </Dialog>)
}

export default SlidingModel