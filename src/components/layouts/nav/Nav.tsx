import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../hooks/store.hook';

import NavTop from './NavTop';
import BottomNav from './BottomNav';

type Props = {
    open: boolean,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
};

const Nav: React.FC<Props> = ({ open, onClick }) => {


    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >

                <NavTop onClick={onClick} open={open} />

                <Divider />

                <BottomNav />


            </AppBar>
        </Box>
    );
}

export default Nav