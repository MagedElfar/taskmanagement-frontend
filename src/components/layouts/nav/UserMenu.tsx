import React from 'react'
import { useAppDispatch } from '../../../hooks/store.hook';
import { logout } from '../../../store/thunk-actions/auth-actions';
import { Link } from 'react-router-dom';
import { Menu, MenuItem } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

type props = {
    closeMenu: () => void;
    anchorElUser: HTMLElement | null
}

const UserMenu: React.FC<props> = ({ anchorElUser, closeMenu }) => {

    const dispatch = useAppDispatch();

    const handleCloseUserMenu = () => {
        closeMenu()
    };


    function userLogout() {
        dispatch(logout())
    }

    return (
        <Menu
            sx={{ mt: '45px' }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
        >
            <MenuItem sx={{ width: "150px" }} onClick={handleCloseUserMenu}>
                <Link to='/profile'>
                    <AccountCircle sx={{ mr: 1 }} />
                    Profile
                </Link>
            </MenuItem>
            <MenuItem sx={{ width: "150px" }} onClick={userLogout}>
                <LogoutIcon sx={{ mr: 1 }} />
                Logout
            </MenuItem>
        </Menu>
    )
}

export default UserMenu