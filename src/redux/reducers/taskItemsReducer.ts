export enum TaskItemsAction {
    ADD_NEW_LIST_ITEMS = 'ADD_NEW_LIST_ITEMS',
    ADD_NEW_SUBTASK = 'ADD_NEW_SUBTASK',
    EDIT_SUBTASK = 'EDIT_SUBTASK',
    DELETE_SUBTASK = 'DELETE_SUBTASK',
    CHANGE_STATUS_SUBTASK = 'CHANGE_STATUS_SUBTASK ',
    ADD_NEW_COMMENT = 'ADD_NEW_COMMENT',
    EDIT_COMMENT = 'EDIT_COMMENT',
    DELETE_COMMENT = 'DELETE_COMMENT',
    ADD_NEW_UNDER_COMMENT = 'ADD_NEW_UNDER_COMMENT',
    DELETE_UNDER_COMMENT = 'DELETE_UNDER_COMMENT',
}

const initialState = JSON.parse(String(localStorage.getItem('taskItems'))) || {};

export const taskItemsReducer = (
    state: any = initialState,
    action: any
) => {
    switch(action.type) {
        case TaskItemsAction.ADD_NEW_LIST_ITEMS: {
            const id = action.payload;

            const itemsList = JSON.parse(JSON.stringify(state));

            itemsList[id] = {
                subtasks: [],
                comments: [],
            }
            return itemsList;
        }
        case TaskItemsAction.ADD_NEW_SUBTASK: {
            const { subtask, id } = action.payload;
            return {
                ...state,
                [id]: {
                    ...state[id],
                    ['subtasks']: (state[id]['subtasks'] ?? []).concat(subtask)
                }
            }
        }
        case TaskItemsAction.DELETE_SUBTASK: {
            const { idTask, idSubtask } = action.payload
            return {
                ...state,
                [idTask]: {
                    ...state[idTask],
                    ['subtasks']: (state[idTask]['subtasks'].filter((item: any )=> idSubtask !== item.id))
                }
            }
        }
        case TaskItemsAction.EDIT_SUBTASK: {
            const { idSubtask, idTask, subtaskNewTitle } = action.payload

            return {
                ...state,
                [idTask]: {
                    ...state[idTask],
                    ['subtasks']: (state[idTask]['subtasks']?.map((item: any) => (
                        item.id === idSubtask ? {...item, title: subtaskNewTitle} : item
                    )))
                }
            }
        }
        case TaskItemsAction.CHANGE_STATUS_SUBTASK: {
            const { idSubtask, idTask, status } = action.payload

            return {
                ...state,
                [idTask]: {
                    ...state[idTask],
                    ['subtasks']: (state[idTask]['subtasks']?.map((item: any) => (
                        item.id === idSubtask ? {...item, status: !status} : item
                    )))
                }
            }
        }
        case TaskItemsAction.ADD_NEW_COMMENT: {
            const { id, comment } = action.payload

            return {
                ...state,
                [id]: {
                    ...state[id],
                    ['comments']: (state[id]['comments'] ?? []).concat(comment)
                }
            }
        }
        case TaskItemsAction.DELETE_COMMENT: {
            const { idTask, idComment} = action.payload
            return {
                ...state,
                [idTask]: {
                    ...state[idTask],
                    ['comments']: (state[idTask]['comments'].filter((item: any ) => idComment !== item.id))
                }
            }
        }
        case TaskItemsAction.ADD_NEW_UNDER_COMMENT: {
            const { idTask, idComment, newUnderComment } = action.payload
            const comment = state[idTask]['comments'].find((item: any) => item.id === idComment);
            const commentList = [...comment.list];
            const newCommentList = [...commentList, newUnderComment]
            
            return {
                ...state,
                [idTask]: {
                    ...state[idTask],
                    ['comments']: (state[idTask]['comments'].map((item: any) => (
                        item.id === idComment ? {...item, list: newCommentList} : item
                    )))
                }
            }
        }
        case TaskItemsAction.DELETE_UNDER_COMMENT: {
            const { idTask, idComment, id } = action.payload
            const comment = state[idTask]['comments'].find((item: any) => item.id === idComment);
            const commentList = [...comment.list];
            const newCommentList = commentList.filter((item: any) => item.id !== id)
            return {
                ...state,
                [idTask]: {
                    ...state[idTask],
                    ['comments']: (state[idTask]['comments'].map((item: any) => (
                        item.id === idComment ? {...item, list: newCommentList} : item
                    )))
                }
            }
        }
        default: return state;
    }
}