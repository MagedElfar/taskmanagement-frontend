import React from 'react'
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Box, Breadcrumbs, Toolbar, Typography } from '@mui/material';
import { useAppSelector } from '../../../hooks/store.hook';
import NavTopMenu from './NavTopMenu';
import { Link, useLocation, useParams } from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

type props = {
    open: Boolean
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const NavTop: React.FC<props> = ({ open, onClick }) => {
    const { them, space } = useAppSelector(s => s)

    const location = useLocation()
    const { id } = useParams()

    let subTitle;

    if (location.pathname.includes("project")) {
        const project = space.projects.find(project => project.id === +id);

        subTitle = project?.name;
    } else if (location.pathname.includes("my-tasks")) {
        subTitle = "My Tasks"
    } else if (location.pathname.includes("archive")) {
        subTitle = "Archive"
    }

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

                {subTitle ?

                    <Breadcrumbs
                        separator={<NavigateNextIcon fontSize="small" />}
                        aria-label="breadcrumb"
                    >
                        <Link
                            to="/"
                        >
                            {space.name}
                        </Link>
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
                            {subTitle}
                        </Typography>
                    </Breadcrumbs>
                    :
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

                }
                <Box sx={{ flexGrow: 1 }} />
                <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: "center" }}>
                    <NavTopMenu />
                </Box>
            </Box>


        </Toolbar>
    )
}

export default NavTop