import { Box, LinearProgress, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook'
import SearchInput from '../layouts/SearchInput'
import { useQuery } from '@tanstack/react-query'
import { getSpaces } from '../../utilities/api'
import { Space } from '../../interfaces/space'
import SpaceList from './SpaceList'
import { apiErrorFormat } from '../../utilities/error-format'
import Errors from '../layouts/Errors'
import { toggleSpaceSearchModel } from '../../store/slices/model.slice'

const FindSpace = () => {

    const dispatch = useAppDispatch()

    const fetchData = async (): Promise<Space[]> => {
        try {
            const { data } = await getSpaces(`?term=${term}`)
            return data.data.spaces
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    const [term, setTerm] = useState("")


    const { error, isLoading, data } = useQuery({
        queryKey: ['spaces', term],
        queryFn: fetchData,
    })

    const { them } = useAppSelector((state) => state);


    return (
        <Box component="div">
            <Typography variant="h1" component="h1" sx={{
                fontSize: them.fonSize.title,
                fontWeight: 500,
                mb: 4,
                textAlign: "center"
            }}>
                <div className='w-20 mx-auto mb-9'>
                    <img src="/planet.svg" />
                </div>
                Find your Workspace
            </Typography>

            <SearchInput placeHolder={'find a workspace...'} onChange={(term) => setTerm(term)} />

            <Box component="div" sx={{ mt: 3 }} onClick={() => dispatch(toggleSpaceSearchModel())}>
                {error ? <Errors errors={apiErrorFormat(error)} /> : null}

                {isLoading ?
                    <LinearProgress /> :
                    data?.length > 0 ?
                        <SpaceList spaces={data} /> :
                        <Typography variant='body1' align='center' sx={{ color: them.colors.fourthColor }}>
                            No result found
                        </Typography>

                }
            </Box>

        </Box>
    )
}

export default FindSpace