import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Box, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../../hooks/store.hook';
import NavTopMenu from './NavTopMenu';

type props = {
    open: Boolean
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const NavTop: React.FC<props> = ({ open, onClick }) => {
    const { them, space } = useAppSelector(s => s)


    const menuId = 'primary-search-account-menu';

    return (
        <Toolbar sx={{ backgroundColor: them.colors.thirdColor }}>
            <Box component="div" sx={{ display: "flex", width: "100%", alignItems: "center" }}>
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
                    <NavTopMenu />
                </Box>
            </Box>


        </Toolbar>
    )
}

export default NavTop