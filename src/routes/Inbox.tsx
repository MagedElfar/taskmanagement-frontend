import { Grid } from '@mui/material'
import { createContext, useState } from 'react'
import { useAppSelector } from '../hooks/store.hook'
import LeftSide from '../components/Inbox/LeftSide'
import SnackError from '../components/common/SnackError'
import RightSide from '../components/Inbox/RightSide'

interface OpenContext {
    isOpen: boolean;
    setOpen: () => void;
}

export const MyContext = createContext<OpenContext | null>(null);


const Inbox = () => {

    const { them, conversation } = useAppSelector(state => state)

    const [isOpen, setIsOpen] = useState(true)

    const setOpen = () => {
        console.log(isOpen)
        setIsOpen(!isOpen);
    };

    const contextValue = {
        isOpen,
        setOpen,
    };

    return (

        <MyContext.Provider value={contextValue}>
            <Grid container bgcolor="#FFF" height="100vh" borderRadius="12px" sx={{ position: "relative" }}>
                <SnackError errors={conversation.errors} />
                {isOpen && <Grid
                    item
                    md={4}
                    xs={12}
                    p={3}
                    sx={{
                        zIndex: 999,
                        bgcolor: "#FFF",
                        width: {
                            xs: "100%",
                            md: "auto"
                        },
                        height: "100%",
                        position: {
                            xs: "absolute",
                            md: "static"
                        }
                    }}
                    borderRight={`1px solid ${them.colors.firstColor}`}
                >
                    <LeftSide />
                </Grid>}


                <Grid item md={8} xs={12} height="100%">
                    <RightSide />
                </Grid>

            </Grid>
        </MyContext.Provider>

    )
}

export default Inbox