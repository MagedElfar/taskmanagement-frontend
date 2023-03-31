import React from 'react'
import DeleteSpace from '../components/space/DeleteSpace'
import CreateSpaceForm from '../components/space/space-forms/CreateSpaceForm'
import InviteMember from '../components/space/space-forms/InviteMember'
import { useAppDispatch, useAppSelector } from '../hooks/store.hook'
import {
    toggleCreateSpaceModel,
    toggleDeleteMemberModel,
    toggleDeleteSpaceModel,
    toggleInviteModel,
    toggleSpaceSearchModel
} from '../store/slices/model.slice'
import Model from './Model'
import DeleteMember from '../components/space/DeleteMember'
import SlidingModel from './SlidingModel'

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

            <Model open={model.deleteMemberModel.isOpen} toggleOpen={() => dispatch(toggleDeleteMemberModel(model.deleteMemberModel.memberId))}>
                <DeleteMember />
            </Model>

            <SlidingModel open={model.spaceSearchModel} toggleOpen={() => dispatch(toggleSpaceSearchModel())}>
                model
            </SlidingModel>
        </>
    )
}

export default Models