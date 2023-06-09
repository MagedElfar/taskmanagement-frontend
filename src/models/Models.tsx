import React from 'react'
import DeleteSpace from '../components/space/DeleteSpace'
import CreateSpaceForm from '../components/space/space-forms/CreateSpaceForm'
import InviteMember from '../components/space/space-forms/InviteMember'
import { useAppDispatch, useAppSelector } from '../hooks/store.hook'
import {
    toggleCreateProjectModel,
    toggleCreateSpaceModel,
    toggleCreateTaskModel,
    toggleDeleteMemberModel,
    toggleDeleteSpaceModel,
    toggleDeleteTaskModel,
    toggleInviteModel,
    toggleSpaceSearchModel
} from '../store/slices/model.slice'
import Model from './Model'
import DeleteMember from '../components/space/DeleteMember'
import SlidingModel from './SlidingModel'
import FindSpace from '../components/space/FindSpace'
import CreateProjectForm from '../components/projects/CreateProjectForm'
import CreateTaskForm from '../components/tasks/CreateTaskForm'
import DeleteTask from '../components/tasks/single-task/DeleteTask'

const Models = () => {
    const { model } = useAppSelector(s => s)
    const dispatch = useAppDispatch();

    return (
        <>
            <Model open={model.openCreateSpaceModel} toggleOpen={() => dispatch(toggleCreateSpaceModel())}>
                <CreateSpaceForm />
            </Model>

            <Model open={model.openCreateProjectModel} toggleOpen={() => dispatch(toggleCreateProjectModel())}>
                <CreateProjectForm />
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
                <FindSpace />
            </SlidingModel>

            <SlidingModel open={model.openCreateTaskModel} toggleOpen={() => dispatch(toggleCreateTaskModel())}>
                <CreateTaskForm />
            </SlidingModel>

            <Model open={model.deleteTaskModel.isOpen} toggleOpen={() => dispatch(toggleDeleteTaskModel(model.deleteTaskModel.taskId))}>
                <DeleteTask />
            </Model>

        </>
    )
}

export default Models