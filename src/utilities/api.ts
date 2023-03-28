import { SignupCredentials } from './../interfaces/auth';
import axios from "axios";
import { LoginCredentials } from "../interfaces/auth";
import { Profile, updateUserDto } from '../interfaces/user';

const baseURL: string = "http://localhost:5000/api";

const API = axios.create({ baseURL });

API.interceptors.request.use((req: any) => {

    const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")!) : null
    if (token) {
        req.headers.Authorization = `Bearer ${token}`;
    } else {
        req.headers.Authorization = `Bearer `;
    }
    return req;
});


let config = {
    headers: { "Content-Type": "multipart/form-data" }
};

let authConfig = {
    headers: { crossDomain: true, 'Content-Type': 'application/json' },
    withCredentials: true
}
//auth
export const login = (data: LoginCredentials) => API.post("/login", data, authConfig)

export const signup = (data: SignupCredentials) => API.post("/signup", data, authConfig)

export const logout = () => API.post("/logout", {}, authConfig)

export const forgotPasswordSendMail = (data: { email: string }) => API.post("/forget-password/send-mail", data)

export const forgotPasswordRest = (data: {
    token: string,
    password: string,
    password_confirmation: string
}) => API.post("/forget-password/rest", data)



//user
export const getUser = () => API.get("/users")

export const updateUser = (data: updateUserDto) => API.put("/users", data)

export const createUserProfile = (data: Partial<Profile>) => API.post("/users/profile", data)

export const uploadUserImage = (data: any) => API.post("/users/image", data, config)

export const deleteUserImage = () => API.delete("/users/image")

export const changeUserPassword = (data: {
    password: string,
    new_password: string,
    new_password_confirmation: string
}) => API.patch("/users/password", data)

