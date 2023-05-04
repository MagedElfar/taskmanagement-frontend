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

export interface IMessage {
    id: number,
    content: string,
    conversation_id: number,
    sender_id: number,
    created_at: string,
    username: string,
    first_name: string,
    last_name: string,
    userImage: string
}

export interface CreateMessageDto {
    conversation_id: number,
    content: string
}