export interface Space {
    name: string,
    id: number,
}

export interface createSpaceDto {
    name: string
}

export interface Member {
    id: number,
    userId: number,
    role: string,
    userImage: string,
    username: string,
    userEmail: string
}