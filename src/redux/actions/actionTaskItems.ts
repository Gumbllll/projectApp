import { TaskItemsAction } from "../reducers/taskItemsReducer"

export const addNewListItems = (payload: any) => {
    return {
        type: TaskItemsAction.ADD_NEW_LIST_ITEMS,
        payload,
    }
}

export const addNewSubtask = (payload: any) => {
    return {
        type: TaskItemsAction.ADD_NEW_SUBTASK,
        payload,
    }
}

export const deleteSubtask = (payload: any) => {
    return {
        type: TaskItemsAction.DELETE_SUBTASK,
        payload,
    }
}

export const editSubtask = (payload: any) => {
    return {
        type: TaskItemsAction.EDIT_SUBTASK,
        payload,
    }
}

export const changeStatusSubtask = (payload: any) => {
    return {
        type: TaskItemsAction.CHANGE_STATUS_SUBTASK,
        payload,
    }
}

export const addNewComment = (payload: any) => {
    return {
        type: TaskItemsAction.ADD_NEW_COMMENT,
        payload,
    }
}

export const deleteComment = (payload: any) => {
    return {
        type: TaskItemsAction.DELETE_COMMENT,
        payload,
    }
}

export const editComment = (payload: any) => {
    return {
        type: TaskItemsAction.EDIT_COMMENT,
        payload,
    }
}

export const addNewUnderComment = (payload: any) => {
    return {
        type: TaskItemsAction.ADD_NEW_UNDER_COMMENT,
        payload,
    }
}

export const deleteUnderComment = (payload: any) => {
    return {
        type: TaskItemsAction.DELETE_UNDER_COMMENT,
        payload,
    }
}
