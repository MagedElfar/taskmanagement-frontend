export interface IConnection {
    id: number,
    conversation_id: number,
    user_Id: number,
    username: string,
    image: string,
    first_name: string,
    last_name: string,
    unread_count: number
}

export interface ISocketUser {
    socketId: string;
    userId?: number;
    spaceId?: number
}