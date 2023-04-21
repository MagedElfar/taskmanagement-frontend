export interface Space {
    name: string,
    id: number,
}

export interface Project {
    name: string,
    id: number,
}

export interface createSpaceDto {
    name: string
}

export interface CreateProjectDto {
    name: string,
    spaceId: number
}

export interface UpdateProjectDto {
    name: string,
}

export interface Member {
    id: number,
    userId: number,
    role: string,
    userImage: string,
    username: string,
    userEmail: string,
    firstName: string,
    lastName: string,
    phone: string
}

export interface ISpaceReport {
    total_tasks: number,
    completed_tasks: number,
    archived_tasks: number,
    toDo: number,
    inProgress: number,
    inReview: number,
    done: number,
    blocked: number
}

export interface ISpaceTeamReport {
    memberId: number,
    image: string,
    username: string,
    email: string,
    firstName: string,
    lastName: string,
    totalTasks: number,
    completedTasks: number
}


export interface IReport {
    spaceReport: ISpaceReport,
    teamReport: ISpaceTeamReport[]
}