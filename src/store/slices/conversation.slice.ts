import { createSlice } from "@reduxjs/toolkit";
import { IConnection, ISocketUser } from '../../interfaces/inbox';
import { getContacts } from "../thunk-actions/conversations-actions";
import { ITask } from "../../interfaces/tasks";
import { apiErrorFormat } from "../../utilities/error-format";


const initialState = {
    isLoggedIn: false,
    loading: false,
    errors: [] as string[],
    connection: [] as IConnection[],
    onlineUsers: [] as ISocketUser[],
    currentChat: null as IConnection
}

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload
        },

        changeCurrentChat(state, action) {
            state.currentChat = action.payload
        },

        updateUnreadMessages(state, action) {
            state.connection = state.connection.map((contact) => {
                if (contact.conversation_id === action.payload.conversation_id) contact.unread_count += 1
                return contact
            })
        }
    },
    extraReducers: (builder) => {
        //archive task
        builder.addCase(getContacts.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(getContacts.fulfilled, (state, action) => {
            state.connection = action.payload

            if (action.payload.length > 0) state.currentChat = action.payload[0]

            state.loading = false

        })

        builder.addCase(getContacts.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })
    }
})

const { setOnlineUsers, changeCurrentChat, updateUnreadMessages } = slice.actions;

export { setOnlineUsers, changeCurrentChat, updateUnreadMessages }

export default slice.reducer;