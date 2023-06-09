import { createAsyncThunk } from "@reduxjs/toolkit";
import { User, Profile, updateUserDto } from "../../interfaces/user";
import * as api from "./../../utilities/api"

//get user
export const getUser = createAsyncThunk<
    User,
    void,
    {
        rejectValue?: unknown
    }
>("users/getUser", async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        const token = localStorage.getItem("token")
        if (!token) throw "";
        const { data } = await api.getUser()
        return data.user;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

//update user
export const updateUser = createAsyncThunk<
    updateUserDto,
    updateUserDto,
    {
        rejectValue: unknown
    }
>("users/updateUser", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        await api.updateUser(body)
        return body;
    } catch (error) {
        console.log(error)
        return rejectWithValue(error)
    }
})

//create profile
export const createUserProfile = createAsyncThunk<
    Profile,
    Profile,
    {
        rejectValue?: unknown
    }
>("users/createProfile", async (body, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        await api.createUserProfile(body)
        return body;
    } catch (error) {
        return rejectWithValue(error)
    }
})

//upload image
export const uploadProfilePicture = createAsyncThunk<
    any,
    any,
    {
        rejectValue?: unknown
    }
>("users/uploadImage", async (file, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {
        if (!file) return { image_url: "" }
        const formData = new FormData();
        formData.append("image", file)
        const { data } = await api.uploadUserImage(formData)
        return data;
    } catch (error) {
        return rejectWithValue(error)
    }
})

//delete image
export const deleteProfilePicture = createAsyncThunk<
    void,
    void,
    {
        rejectValue?: unknown
    }
>("users/deleteImage", async (_, thunkApi) => {
    const { rejectWithValue } = thunkApi;
    try {

        await api.deleteUserImage()
        return;
    } catch (error) {
        return rejectWithValue(error)
    }
})