import React from 'react'
import CreateSpaceForm from '../components/space/space-forms/CreateSpaceForm'
import { useAppDispatch, useAppSelector } from '../hooks/store.hook'
import { toggleCreateSpaceModel } from '../store/slices/model.slice'
import Model from './Model'

const Models = () => {
    const { model } = useAppSelector(s => s)
    const dispatch = useAppDispatch();

    return (
        <Model open={model.openCreateSpaceModel} toggleOpen={() => dispatch(toggleCreateSpaceModel())}>
            <CreateSpaceForm />
        </Model>
    )
}

export default Models