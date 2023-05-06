import { createSlice } from "@reduxjs/toolkit";
import { IConnection, ISocketUser } from '../../interfaces/inbox';
import { addContact, getContacts, markMessagesRead } from "../thunk-actions/conversations-actions";
import { ITask } from "../../interfaces/tasks";
import { apiErrorFormat } from "../../utilities/error-format";


const initialState = {
    isLoggedIn: false,
    loading: false,
    errors: [] as string[],
    connection: [] as IConnection[],
    onlineUsers: [] as ISocketUser[],
    currentChat: null as IConnection,
    unRead: 0
}

const slice = createSlice({
    name: "conversation",
    initialState,
    reducers: {
        setOnlineUsers(state, action) {
            state.onlineUsers = action.payload
        },

        setNewConnect(state, action) {
            state.connection.push(action.payload)
        },

        changeCurrentChat(state, action) {
            state.currentChat = action.payload
        },

        updateUnreadMessages(state, action) {
            state.connection = state.connection.map((contact) => {
                if (contact.conversation_id === action.payload.conversation_id) contact.unread_count += 1
                return contact
            })

            state.unRead += 1
        }
    },
    extraReducers: (builder) => {
        //archive task
        builder.addCase(getContacts.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(getContacts.fulfilled, (state, action) => {
            state.connection = action.payload.conversations

            if (action.payload.conversations.length > 0) state.currentChat = action.payload.conversations[0]

            state.unRead = action.payload.unreadCount;
            state.loading = false

        })

        builder.addCase(getContacts.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        builder.addCase(markMessagesRead.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(markMessagesRead.fulfilled, (state, action) => {

            let readMessages = 0;

            state.connection = state.connection.map((contact) => {
                if (contact.conversation_id === action.payload) {
                    readMessages += contact.unread_count
                    contact.unread_count = 0
                }
                return contact
            })

            state.unRead -= readMessages
            state.loading = false

        })

        builder.addCase(markMessagesRead.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })

        builder.addCase(addContact.pending, (state, action) => {
            state.errors = [];
            state.loading = true
        })

        builder.addCase(addContact.fulfilled, (state, action) => {
            state.connection.push(action.payload.contact)

            state.currentChat = action.payload.contact

            state.loading = false

        })

        builder.addCase(addContact.rejected, (state, action) => {
            state.loading = false;
            state.errors = apiErrorFormat(action.payload);
        })
    }
})

const { setOnlineUsers, changeCurrentChat, updateUnreadMessages, setNewConnect } = slice.actions;

export { setOnlineUsers, changeCurrentChat, updateUnreadMessages, setNewConnect }

export default slice.reducer;