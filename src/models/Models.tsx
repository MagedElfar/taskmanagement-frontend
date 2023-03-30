import React from 'react'
import DeleteSpace from '../components/space/DeleteSpace'
import CreateSpaceForm from '../components/space/space-forms/CreateSpaceForm'
import InviteMember from '../components/space/space-forms/InviteMember'
import { useAppDispatch, useAppSelector } from '../hooks/store.hook'
import {
    toggleCreateSpaceModel,
    toggleDeleteSpaceModel,
    toggleInviteModel
} from '../store/slices/model.slice'
import Model from './Model'

const Models = () => {
    const { model } = useAppSelector(s => s)
    const dispatch = useAppDispatch();

    return (
        <>
            <Model open={model.openCreateSpaceModel} toggleOpen={() => dispatch(toggleCreateSpaceModel())}>
                <CreateSpaceForm />
            </Model>

            <Model open={model.deleteSpaceModel} toggleOpen={() => dispatch(toggleDeleteSpaceModel())}>
                <DeleteSpace />
            </Model>

            <Model open={model.inviteModel} toggleOpen={() => dispatch(toggleInviteModel())}>
                <InviteMember />
            </Model>
        </>
    )
}

export default Models