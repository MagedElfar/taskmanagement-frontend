import { configureStore } from '@reduxjs/toolkit';
import user from "./slices/user.slice";
import auth from "./slices/auth.slice";
import them from "./slices/them.slice";
import space from "./slices/space.slice";
import model from "./slices/model.slice";
import task from "./slices/task.slice";
import conversation from "./slices/conversation.slice"

// ...

const store = configureStore({
    reducer: {
        auth,
        user,
        them,
        space,
        model,
        task,
        conversation
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;