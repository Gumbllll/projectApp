import { combineReducers, legacy_createStore as createStore } from "redux";
import { projectReducer } from "./reducers/projectReducer";
import { taskReducer } from "./reducers/taskReducer";
import { taskItemsReducer } from "./reducers/taskItemsReducer";

const rootReducer = combineReducers({
    project: projectReducer,
    task: taskReducer,
    taskItems: taskItemsReducer,
});

export const store = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch