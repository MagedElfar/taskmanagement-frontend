import React, { useEffect, useState } from 'react'
import { Member } from '../../interfaces/space';
import { List, Popover } from '@mui/material';
import MemberItem from './MemberItem';
import MemberCard from './MemberCard';

type props = {
    items?: Member[]
}

const TeamList: React.FC<props> = ({ items }) => {

    const [member, setMember] = useState(null);

    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    const [open, setOpen] = useState(false)


    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {

        setAnchorEl(event.currentTarget);

    }

    const handlePopover = (event: React.MouseEvent<HTMLElement>, member?: Member) => {

        let isNew;
        setMember((s: any) => {
            isNew = s?.id === member.id
            return member
        })

        if (isNew) {
            setOpen(false);
            setMember(null)
            setAnchorEl(null);
        } else {
            setOpen(true);

            setMember(member)

        }
        handlePopoverOpen(event)

    };
    return (
        <List component="div" disablePadding>
            {items.map((member: Member) => <MemberItem member={member} key={member.id} togglePopover={handlePopover} open={open} />)}

            <Popover
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
                onClose={handlePopoverOpen}
                disableRestoreFocus
            >
                <MemberCard member={member} />
            </Popover>
        </List>)
}

export default TeamList