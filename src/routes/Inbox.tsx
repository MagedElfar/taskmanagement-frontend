import { Grid } from '@mui/material'
import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../hooks/store.hook'
import { getContacts } from '../store/thunk-actions/conversations-actions'
import LeftSide from '../components/Inbox/LeftSide'
import SnackError from '../components/common/SnackError'
import RightSide from '../components/Inbox/RightSide'

const Inbox = () => {

    const { them, conversation } = useAppSelector(state => state)


    return (
        <Grid container bgcolor="#FFF" height="100vh" borderRadius="12px">
            <SnackError errors={conversation.errors} />

            <Grid item xs={4} p={3} borderRight={`1px solid ${them.colors.firstColor}`}>
                <LeftSide />
            </Grid>

            <Grid item xs={8} height="100%">
                <RightSide />
            </Grid>

        </Grid>
    )
}

export default Inbox