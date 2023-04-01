import { Box, List } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { Space } from '../../interfaces/space';
import SpaceItem from './SpaceItem';

type props = {
    spaces: Space[]
}

const SpaceList: React.FC<props> = ({ spaces }) => {
    return (
        <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
            <nav aria-label="main mailbox folders">
                <List>
                    {
                        spaces.map((item: { id: number, name: string }) => <SpaceItem key={item.id} id={item.id} name={item.name} />)
                    }
                </List>
            </nav>
        </Box>)
}

export default React.memo(SpaceList)