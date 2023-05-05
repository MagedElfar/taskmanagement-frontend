import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { Divider } from '@mui/material';

import NavTop from './NavTop';
import BottomNav from './BottomNav';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../../hooks/store.hook';
import { getContacts } from '../../../store/thunk-actions/conversations-actions';

type Props = {
    open: boolean,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
};

const Nav: React.FC<Props> = ({ open, onClick }) => {

    const dispatch = useAppDispatch()


    React.useEffect(() => {
        dispatch(getContacts())
    }, [dispatch])

    const location = useLocation()
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" >

                <NavTop onClick={onClick} open={open} />

                {!location.pathname.includes("inbox") && <>
                    <Divider />
                    <BottomNav />
                </>
                }


            </AppBar>
        </Box>
    );
}

export default Nav