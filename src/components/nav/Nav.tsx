import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Avatar, Menu, MenuItem, Tooltip } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../store/thunk-actions/auth-actions';

type Props = {
    open: boolean,
    onClick: any
};

const Nav: React.FC<Props> = ({ open, onClick }) => {
    const { user: userState, them, space } = useAppSelector(s => s)
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };



    function userLogout() {
        dispatch(logout())
    }

    const menuId = 'primary-search-account-menu';

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar sx={{ backgroundColor: them.colors.thirdColor }}>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={onClick}
                        sx={{
                            mr: 2,
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}

                    >
                        <MenuIcon sx={{ color: them.colors.fourthColor }} />
                    </IconButton>
                    <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{
                            display: { xs: 'none', sm: 'block' },
                            color: them.colors.fourthColor,
                            textTransform: "capitalize"
                        }}
                    >
                        {space.name}
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                            sx={{
                                marginRight: "12px",
                                color: them.colors.fourthColor
                            }}
                        >
                            <Badge badgeContent={0} color="error">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar
                                    // alt={userState.user.username}
                                    src={userState.user.image.image_url || "/user.svg"}
                                    sx={{
                                        backgroundColor: "#ddd",

                                        // width: "24px",
                                        // height: "24px",
                                        // marginX: "12px"
                                    }}
                                />
                            </IconButton>
                        </Tooltip>
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
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Nav