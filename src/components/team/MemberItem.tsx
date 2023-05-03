import React, { useState } from 'react'
import { Avatar, Badge, Grid, Typography } from '@mui/material'
import { Member } from '../../interfaces/space'
import { purple, green, grey } from '@mui/material/colors';
import { useAppSelector } from '../../hooks/store.hook';
import Popover from '@mui/material/Popover';
import MemberCard from './MemberCard';


type props = {
    member: Member;
    togglePopover?: (event: React.MouseEvent<HTMLElement>, member: Member) => void;
    open?: boolean,
    color?: string
}

const MemberItem: React.FC<props> = ({
    member,
    togglePopover = () => { return },
    open,
    color
}) => {

    const { them, conversation } = useAppSelector(state => state);

    const handlePopover = (event: React.MouseEvent<HTMLElement>) => {

        togglePopover(event, member)
    };





    const fullName = member.firstName ? `${member.firstName} ${member.lastName || ''}` : member.username;

    return (
        <div>

            <Grid
                container
                sx={{ ml: 0, alignItems: 0, pt: 2, pl: 2, cursor: "pointer" }}
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onClick={handlePopover}
            >
                <Grid item  >
                    <Badge
                        overlap="circular"
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                        }}
                        badgeContent={<div style={{
                            backgroundColor: conversation.onlineUsers.some(item => item.userId === member.userId) ? green['A700'] : grey[500],
                            border: "2px solid #fff",
                            height: "13px",
                            width: "13px",
                            borderRadius: "50%"
                        }} />}
                    >
                        <Avatar
                            sx={{ width: "35px", height: "35px", bgcolor: purple[500], p: 0 }}
                            alt={member.username}
                            src={member.userImage || "/"}
                        />
                    </Badge>

                </Grid>

                <Grid sx={{ alignItems: "center", display: "flex" }} >
                    <Typography
                        align="center"
                        variant='body1'
                        sx={{
                            textTransform: "capitalize",
                            ml: 2,
                            color: color || them.colors.firstColor,
                            fontSize: "14px"
                        }}
                    >
                        {fullName}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default MemberItem