import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { ListItemButton, ListItemText, MenuItem, alpha, Menu, MenuProps, styled, Avatar, Badge, Button, Typography, Divider, Box, LinearProgress } from '@mui/material';
import List from '@mui/material/List';
import React, { useState, useEffect } from 'react'
import HomeIcon from '@mui/icons-material/Home';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook';
import { deepOrange } from '@mui/material/colors';
import AddIcon from '@mui/icons-material/Add';
import { toggleCreateSpaceModel, toggleSpaceSearchModel } from '../../store/slices/model.slice';
import { Link } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';
import SpaceList from './SpaceList';
import GridViewIcon from '@mui/icons-material/GridView';
import { getSpaces } from '../../utilities/api';
import { useQuery } from '@tanstack/react-query'
import { Space } from '../../interfaces/space';


const StyledMenu = styled((props: MenuProps) => (
    < Menu
        elevation={0}
        sx={{
            mt: 1
        }}
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
        minWidth: 300,
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
                // marginRight: theme.spacing(2),
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

const SpaceMenu = () => {

    const { them, space, user } = useAppSelector(s => s);
    const dispatch = useAppDispatch();

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);


    const getUserSpaces = async (): Promise<Space[]> => {
        try {
            const { data } = await getSpaces("?limit=3&page=1");
            return data.data.spaces
        } catch (error) {
            console.log(error)
        }

    }

    const { error, isLoading, data } = useQuery({
        queryKey: ['spaces'],
        queryFn: getUserSpaces
    })
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <List>
            <ListItemButton onClick={handleClick}  >

                {
                    space.id ?
                        <>
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
                                    textTransform: "capitalize",
                                }}
                            />
                        </> :
                        <Button
                            fullWidth
                            variant="text"
                            onClick={() => dispatch(toggleCreateSpaceModel())}
                            sx={{
                                transition: "all 0.3s ease",
                                backgroundColor: them.colors.firstColor,
                                color: them.colors.fourthColor,
                                ":hover": {
                                    bgcolor: them.colors.firstColor,
                                    opacity: 0.8
                                },
                            }}
                            startIcon={<AddIcon />}>
                            New Space
                        </Button>
                }

                {space.id ?
                    open ?
                        <div onClick={handleClick} > <ExpandLess sx={{ color: them.colors.firstColor }} /> </div> :
                        <div onClick={handleClick} ><ExpandMore sx={{ color: them.colors.firstColor }} /> </div> : null
                }
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
                <MenuItem
                    onClick={handleClose}
                    disableRipple
                    style={{ backgroundColor: 'transparent' }}
                    sx={{ py: 2 }}
                >
                    {user.role === "owner" ? <Link className='w-full' to="/space">
                        <SettingsIcon sx={{ mr: 2 }} />
                        <Typography component="span" sx={{ color: them.colors.fourthColor }}>
                            Mange your workspace
                        </Typography>
                    </Link> : null}
                </MenuItem>

                <MenuItem
                    onClick={handleClose} disableRipple
                    style={{ backgroundColor: 'transparent' }}
                    sx={{ py: 2, display: "block" }}
                >
                    <Typography component="h6" sx={{ fontSize: "14px", color: them.colors.fourthColor }}>
                        My workspaces
                    </Typography>

                    {isLoading ?
                        <LinearProgress /> :
                        data?.length > 0 ?
                            <SpaceList spaces={data} /> :
                            <Typography variant='body1' align='center'
                                sx={{ color: them.colors.fourthColor, fontSize: "12px", mt: 14 }}>
                                No result found
                            </Typography>

                    }

                </MenuItem>

                <Divider />

                <MenuItem
                    onClick={handleClose} disableRipple
                    style={{ backgroundColor: 'transparent' }}
                    sx={{ py: 2, display: "block" }}
                >
                    <Box component="div" sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Button
                            fullWidth
                            variant="text"
                            onClick={() => dispatch(toggleCreateSpaceModel())}
                            sx={{
                                px: 0,
                                color: them.colors.fourthColor,
                                fontSize: "12px",
                                justifyContent: "flex-start"

                            }}
                            startIcon={<AddIcon />}>
                            Add space
                        </Button>

                        <Button
                            fullWidth
                            variant="text"
                            onClick={() => dispatch(toggleSpaceSearchModel())}
                            sx={{
                                color: them.colors.fourthColor,
                                fontSize: "12px",
                                px: 0,
                                justifyContent: "flex-end"

                            }}
                            startIcon={<GridViewIcon />}>
                            Browse all
                        </Button>
                    </Box>
                </MenuItem>
            </StyledMenu>

        </List>
    )
}

export default SpaceMenu