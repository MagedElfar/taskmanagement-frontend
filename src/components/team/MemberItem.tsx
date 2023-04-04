import React, { useState } from 'react'
import { Avatar, Grid, Typography } from '@mui/material'
import { Member } from '../../interfaces/space'
import { purple } from '@mui/material/colors';
import { useAppSelector } from '../../hooks/store.hook';
import Popover from '@mui/material/Popover';
import MemberCard from './MemberCard';


type props = {
    member: Member;
    togglePopover?: (event: React.MouseEvent<HTMLElement>, member: Member) => void;
    open?: boolean
}

const MemberItem: React.FC<props> = ({ member, togglePopover, open }) => {

    const { them } = useAppSelector(state => state);

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
                    <Avatar
                        sx={{ width: "35px", height: "35px", bgcolor: purple[500], p: 0 }}
                        alt={member.username}
                        src={member.userImage || "/"}
                    />
                </Grid>

                <Grid sx={{ alignItems: "center", display: "flex" }} >
                    <Typography
                        align="center"
                        variant='body1'
                        sx={{
                            textTransform: "capitalize",
                            ml: 2,
                            color: them.colors.firstColor,
                            fontSize: "14px"
                        }}
                    >
                        {fullName}
                    </Typography>
                </Grid>
            </Grid>
            {/* <Popover
                id="mouse-over-popover"
                sx={{
                    left: "200px",
                    "& .MuiBackdrop-invisible": {
                        left: "200px"
                    }
                }}

                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 200,
                }}
                onClose={handlePopover}
                disableRestoreFocus
            >
                <MemberCard member={member} />
            </Popover> */}

        </div>
    )
}

export default MemberItem