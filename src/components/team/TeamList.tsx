import React from 'react'
import { Member } from '../../interfaces/space';
import { List } from '@mui/material';
import MemberItem from './MemberItem';

type props = {
    items?: Member[]
}

const TeamList: React.FC<props> = ({ items }) => {

    return (
        <List component="div" disablePadding sx={{ pb: 2 }}>
            {items.map((member: Member) => <MemberItem key={member.id} member={member} />)}
        </List>
    )
}

export default TeamList