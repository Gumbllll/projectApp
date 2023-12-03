interface IProjectItem {
    id: string,
    title: string | null,
    flag: string,
    newTitle?: string,
}

interface IProjectList {
    projects: IProjectItem[],
}

interface IPayload {
    type: string,
    payload: IProjectItem,
}

const data = JSON.parse(localStorage.getItem('projects') || '[]');

const initialState: IProjectList = {
    projects: data,
}

export enum ProjectActions {
    ADD_PROJECT = 'ADD_PROJECT',
    DELETE_PROJECT = 'DELETE_PROJECT',
    EDIT_PROJECT = 'EDIT_PROJECT',
}

export const projectReducer = (state = initialState, action: IPayload) => {
    switch(action.type) {
        case ProjectActions.ADD_PROJECT: {
            const projectList = [...state.projects, action.payload];
            return {
                projects: projectList,
            }
        }
        case ProjectActions.DELETE_PROJECT: {
            const newList = state.projects.filter(item => item.id !== action.payload.id)
            return {
                ...state, projects: newList,
            }
        }
        default: return state
    }
}

