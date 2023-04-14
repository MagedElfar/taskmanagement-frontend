import { SignupCredentials } from './../interfaces/auth';
import axios from "axios";
import { LoginCredentials } from "../interfaces/auth";
import { Profile, updateUserDto } from '../interfaces/user';
import { CreateProjectDto, UpdateProjectDto, createSpaceDto } from '../interfaces/space';
import { CreateTaskDto, ITask } from '../interfaces/tasks';
import { number } from 'yup';

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

export const signup = (data: SignupCredentials, query: string = "") => API.post(`/signup${query}`, data, authConfig)

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

//workspace
export const getSpaces = (query: string) => API.get(`/spaces${query}`)

export const getSpace = (id: number) => API.get(`/spaces/${id}`)

export const deleteSpace = (id: number) => API.delete(`/spaces/${id}`)

export const updateSpace = (id: number, data: { name: string }) => API.put(`/spaces/${id}`, data)

export const getInitSpace = () => API.get("/spaces/user/init")

export const createSpace = (data: createSpaceDto) => API.post("/spaces", data)

//team
export const invite = (data: { space: number, email: string }) => API.post("/teams/invite", data)

export const acceptInvite = (token: string) => API.post(`/teams/add?token=${token}`)

export const updateMember = (memberId: number, role: string) => API.patch(`/teams/${memberId}`, { role })

export const deleteMember = (memberId: number) => API.delete(`/teams/${memberId}`)


//projects
export const createProject = (data: CreateProjectDto) => API.post("/projects", data)

export const updateProject = (data: UpdateProjectDto, id: number) => API.patch(`/projects/${id}`, data)

export const deleteProject = (id: number) => API.delete(`/projects/${id}`)

//tasks
export const getTasks = (query: string) => API.get(`/tasks${query}`)

export const getTask = (id: number) => API.get(`/tasks/${id}`)

export const createTask = (data: CreateTaskDto) => API.post("/tasks", data)

export const deleteTask = (id: number) => API.delete(`/tasks/${id}`)

export const updateTask = (id: number, data: Partial<ITask>) => API.put(`/tasks/${id}`, data)

export const updateTaskStatus = (id: number, data: { status: string }) => API.patch(`/tasks/${id}`, data)

export const updateTaskOrder = (id: number, data: { status: string, position: number }) => API.patch(`/tasks/order/${id}`, data)

export const markTaskComplete = (id: number) => API.patch(`/tasks/complete/${id}`)

export const assignTask = (data: { taskId: number, memberId: number }) => API.post("/tasks/assign", data)

export const unassignTask = (id: number) => API.delete(`/tasks/assign/${id}`)

export const uploadAttachment = (data: any) => API.post(`/tasks/attachment`, data, config)

export const deleteAttachment = (id: number) => API.delete(`/tasks/attachment/${id}`)

export const getActivities = (query: string) => API.get(`/activities${query}`)

export const addComment = (data: { taskId: number, activity: string }) => API.post('/activities', data)

export const deleteComment = (id: number) => API.delete(`/activities/${id}`)

export const updateComment = (id: number, data: { activity: string }) => API.put(`/activities/${id}`, data)