export interface User {
    id: number,
    username: string,
    email: string,
    image: Image,
    profile: Profile
}

export interface Profile {
    first_name: string,
    last_name: string,
    phone: string,
    gender: string,
}

interface Image {
    image_url: string
}

export interface updateUserDto {
    username: string,
    email: string,
    first_name: string,
    last_name: string,
    phone: string,
    gender: string,
}