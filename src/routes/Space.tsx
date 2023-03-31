import { Container } from '@mui/material'
import React from 'react'
import SpaceHeder from '../components/space/SpaceHeder'
import SpaceTabs from '../components/space/SpaceTabs'
import withRole from '../utilities/whisRole'

const Space = () => {
    return (
        <Container>
            <SpaceHeder />
            <SpaceTabs />
        </Container >
    )
}

export default withRole(Space)