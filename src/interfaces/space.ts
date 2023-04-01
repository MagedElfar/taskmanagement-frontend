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

export interface Member {
    id: number,
    userId: number,
    role: string,
    userImage: string,
    username: string,
    userEmail: string,
    firstName: string,
    lastName: string,
}