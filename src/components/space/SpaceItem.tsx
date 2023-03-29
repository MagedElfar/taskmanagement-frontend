import { Avatar, Badge, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { deepOrange } from '@mui/material/colors';
import React from 'react'
import { useAppSelector, useAppDispatch } from '../../hooks/store.hook';
import HomeIcon from '@mui/icons-material/Home';
import { getSpace } from '../../store/thunk-actions/space-actions';
import { useNavigate } from "react-router-dom"

type props = {
    id: number,
    name: string
}


const SpaceItem: React.FC<props> = ({ id, name }) => {

    const navigate = useNavigate()

    const { them, space } = useAppSelector(s => s);
    const dispatch = useAppDispatch();

    const onClick = (id: number) => {
        dispatch(getSpace(id)).unwrap().catch(() => navigate("not-found"))
    }

    return (
        <ListItem disablePadding onClick={() => onClick(id)}>
            <ListItemButton sx={{ px: 0 }}>
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    sx={{
                        mr: 2
                    }}
                    badgeContent={
                        <HomeIcon sx={{ fill: them.colors.fourthColor }} />
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
                    primary={name}
                    sx={{
                        fontSize: "12px",
                        color: them.colors.fourthColor,
                        whiteSpace: "pre-wrap",
                        textTransform: "capitalize",
                    }}
                />
            </ListItemButton>
        </ListItem>)
}

export default SpaceItem