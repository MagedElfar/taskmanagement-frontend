import { Box, Divider, LinearProgress, TablePagination, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/store.hook'
import SearchInput from '../common/SearchInput'
import { useQuery } from '@tanstack/react-query'
import { getSpaces } from '../../utilities/api'
import { Space } from '../../interfaces/space'
import SpaceList from './SpaceList'
import { apiErrorFormat } from '../../utilities/error-format'
import Errors from '../common/Errors'
import { toggleSpaceSearchModel } from '../../store/slices/model.slice'

const FindSpace = () => {

    const { them } = useAppSelector(state => state)

    const [term, setTerm] = useState("")

    const [page, setPage] = useState(0);

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const dispatch = useAppDispatch()

    const fetchData = async (): Promise<{ spaces: Space[], count: number }> => {
        try {
            console.log(page)

            const { data } = await getSpaces(`?term=${term}&limit=3&page=${page + 1}`)
            return data.data
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    const { error, isLoading, data } = useQuery({
        queryKey: ['spaces', term, page],
        queryFn: fetchData,
        keepPreviousData: true
    })


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

            <Box component="div" sx={{ mt: 3 }}>
                {error ? <Errors errors={apiErrorFormat(error)} /> : null}

                {isLoading ?
                    <LinearProgress /> :
                    data?.count > 0 ?

                        <>
                            <div onClick={() => dispatch(toggleSpaceSearchModel())}>
                                <SpaceList spaces={data.spaces} />
                            </div>

                            <Divider sx={{ mt: 3 }} />

                            <TablePagination

                                component="div"
                                count={data.count}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPageOptions={[]}
                                rowsPerPage={3}

                            />
                        </> :


                        <Typography variant='body1' align='center' sx={{ color: them.colors.fourthColor }}>
                            No result found
                        </Typography>

                }
            </Box>

        </Box >
    )
}

export default FindSpace