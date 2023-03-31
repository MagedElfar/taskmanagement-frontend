import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook'
import { toggleDeleteMemberModel } from '../../store/slices/model.slice';
import { getInitSpace } from '../../store/thunk-actions/space-actions';
import { deleteSpace } from '../../utilities/api';
import { apiErrorFormat } from '../../utilities/error-format';
import Errors from '../layouts/Errors';
import { deleteMember } from '../../store/thunk-actions/team-action';

const DeleteMember = () => {


    const { model } = useAppSelector(s => s);

    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch();

    const removeMember = async () => {
        try {
            setLoading(true)

            await dispatch(deleteMember({ memberId: model.deleteMemberModel.memberId }));

            dispatch(toggleDeleteMemberModel(0))

        } finally {
            setLoading(false)
        }
    }

    return (
        <Box component="div">

            <Typography variant='h5' color="darkred">
                Warning!!!
            </Typography>
            <Typography variant='body1' mt={4} >
                You will delete member {model.deleteMemberModel.memberId}
            </Typography>

            <Grid container spacing={1} sx={{ mt: 2, justifyContent: "flex-end" }}>
                <Grid item>
                    <Button onClick={() => dispatch(toggleDeleteMemberModel(model.deleteMemberModel.memberId))} variant="text" color="info">
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={removeMember} variant="text" color="error">
                        Delete
                        {loading && <CircularProgress
                            size={22}
                            sx={{
                                marginLeft: 2
                            }}
                        />}
                    </Button>
                </Grid>
            </Grid>
        </Box>
    )
}

export default DeleteMember