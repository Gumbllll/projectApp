import { TaskActions } from "../reducers/taskReducer"

export const addTask = (payload: any) => {     
    return {
        type: TaskActions.ADD_TASK,
        payload,
    }
}

export const deleteTask = (payload: any) => {
    return {
        type: TaskActions.DELETE_TASK,
        payload,
    }
}

export const moveTask = (payload: any) => {
    return {
        type: TaskActions.MOVE_TASK,
        payload,
    }
}

export const addNewTaskList = (payload: any) => {
    return {
        type: TaskActions.ADD_NEW_TASK_LIST,
        payload,
    }
}

export const editTask = (payload: any) => {
    return {
        type: TaskActions.EDIT_TASK,
        payload,
    }
}

export const updateFlag = (payload: any) => {
    return {
        type: TaskActions.UPDATE_FLAG,
        payload,
    }
}


