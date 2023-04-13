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
    taskMedia: string
}

export interface ISingleTask {
    task: ITask,
    attachments: IAttachment[],
    activities: {
        data: IActivity[],
        count: number
    }
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
    user1: number;
    user2: number;
    created_at: string

}