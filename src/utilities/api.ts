import { SignupCredentials } from './../interfaces/auth';
import axios from "axios";
import { LoginCredentials } from "../interfaces/auth";
import { Profile } from '../interfaces/user';

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

//auth
export const login = (data: LoginCredentials) => API.post("/login", data)

export const signup = (data: SignupCredentials) => API.post("/signup", data)

//user
export const getUser = () => API.get("/users")

export const createUserProfile = (data: Partial<Profile>) => API.post("/users/profile", data)

