export interface CreateTaskDto {
    title: string,
    description: string,
    priority?: string,
    due_date?: string,
    spaceId: number,
    parentId?: number,
    projectId?: number,
    memberId?: number
}

export interface IAttachment {
    id: number,
    url: string
}

export interface ITask {
    id: number;
    created_at?: string;
    username: string,
    updated_at?: string;
    title: string;
    description: string
    status: string;
    priority: string;
    due_date: string;
    spaceId: number;
    userId: number;
    projectId?: number,
    parentId?: number,
    is_complete?: boolean,
    assignId: number,
    assignToUserName: string,
    assignToImage_url: string,
    projectName: string,
    position: number,
    taskMedia: string,
    parentTsk: string,
    assignIdMember: number,
    is_archived: boolean
}

export interface ISingleTask {
    task: ITask,
    attachments: IAttachment[],
    activities: {
        data: IActivity[],
        count: number
    },
    subTasks: ITask[]
}

export enum TaskStatus {
    TO_DO = "to do",
    IN_PROGRESS = "in progress",
    IN_REVIEW = "in review",
    DONE = "done",
    BLOCKED = "blocked"
}

export interface IActivity {
    id: number;
    activity: string;
    user1: string;
    user1FirstName: string,
    user1LastName: string,
    userImage: string,
    user2: string;
    user2FirstName: string,
    user2LastName: string,
    created_at: string,
    type: string,
    user1_Id: number
}