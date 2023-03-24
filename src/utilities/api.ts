import axios from "axios";

const baseURL: string = "http://localhost:500/api";

const API = axios.create({ baseURL });

// API.interceptors.request.use((req:any) => {

//     if(token){
//         req.headers.Authorization = `Bearer ${token}`;
//     } else {
//         req.headers.Authorization = `Bearer `;
//     }
//     return req;
// });


let config = {
    headers: { "Content-Type": "multipart/form-data" }
};

//auth
export const login = (data: { email: string, password: string }) => API.post("/login", data)