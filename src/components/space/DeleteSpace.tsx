import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook'
import { toggleDeleteSpaceModel } from '../../store/slices/model.slice';
import { getInitSpace } from '../../store/thunk-actions/space-actions';
import { deleteSpace } from '../../utilities/api';
import { apiErrorFormat } from '../../utilities/error-format';
import Errors from '../common/Errors';

const DeleteSpace = () => {

    const navigate = useNavigate()

    const { them, space } = useAppSelector(s => s);
    const [err, setErrors] = useState([])
    const [loading, setLoading] = useState(false)

    const dispatch = useAppDispatch();

    const deleteCurrentSpace = async () => {
        try {
            setErrors([])
            setLoading(true)

            await deleteSpace(+space.id);

            await dispatch(getInitSpace())

            dispatch(toggleDeleteSpaceModel())

            navigate("/")

        } catch (error) {
            setErrors(apiErrorFormat(error))
        } finally {
            setLoading(false)
        }
    }

    return (
        <Box component="div">
            {err.length > 0 && <Errors errors={err} />}

            <Typography variant='h5' color="darkred">
                Warning!!!
            </Typography>
            <Typography variant='body1' mt={4} >
                Delete space will delete all tasks , projects and all members.
            </Typography>

            <Grid container spacing={1} sx={{ mt: 2, justifyContent: "flex-end" }}>
                <Grid item>
                    <Button onClick={() => dispatch(toggleDeleteSpaceModel())} variant="text" color="info">
                        Cancel
                    </Button>
                </Grid>
                <Grid item>
                    <Button onClick={deleteCurrentSpace} variant="text" color="error">
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

export default DeleteSpace