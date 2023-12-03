import { ProjectActions } from "../reducers/projectReducer"

export const addProject = (payload: any) => {      
    return {
        type: ProjectActions.ADD_PROJECT,
        payload,
    }
}

export const deleteProject = (id: any) => {
    return {
        type: ProjectActions.DELETE_PROJECT,
        payload: id,
    }
}

export const editProject = (payload: any) => {
    return {
        type: ProjectActions.EDIT_PROJECT,
        payload,
    }
}