import { ExpandLess, ExpandMore, StarBorder } from '@mui/icons-material';
import { ListItemButton, ListItemIcon, ListItemText, MenuItem, alpha, Menu, MenuProps, styled, Avatar, Badge } from '@mui/material';
import List from '@mui/material/List';
import React, { useState } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { useAppSelector } from '../../hooks/store.hook';
import SearchInput from '../search-input/SearchInput';
import { deepOrange } from '@mui/material/colors';

const StyledMenu = styled((props: MenuProps) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        minWidth: 280,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

const SpaceList = () => {



    const { them, space } = useAppSelector(s => s)
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <List>
            <ListItemButton onClick={handleClick}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    sx={{
                        mr: 2
                    }}
                    badgeContent={
                        <HomeIcon sx={{ color: them.colors.firstColor, fontSize: "15px" }} />
                    }
                >
                    <Avatar
                        sx={{
                            bgcolor: deepOrange[500],
                            width: "20px",
                            height: "20px",
                            fontSize: "12px",
                        }}
                        variant="rounded">
                        {space.name[0]?.toUpperCase() || "W"}
                    </Avatar>
                </Badge>

                <ListItemText
                    primary={space.name}
                    sx={{
                        color: them.colors.firstColor,
                        whiteSpace: "pre-wrap",
                        textTransform: "capitalize"
                    }}
                />
                {open ? <ExpandLess sx={{ color: them.colors.firstColor }} /> : <ExpandMore sx={{ color: them.colors.firstColor }} />}
            </ListItemButton>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem disableRipple style={{ backgroundColor: 'transparent' }}>
                    <SearchInput placeHolder='Search for a workspace' />
                </MenuItem>
            </StyledMenu>

        </List>
    )
}

export default SpaceList