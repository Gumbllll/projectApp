export interface IProjectItem {
    id: string,
    title: string | null,
    flag: string,
    newTitle?: string,
    newFlag?: string,
}

interface IProjectList {
    projects: IProjectItem[],
}

interface IPayload {
    type: string,
    payload: IProjectItem,
}

const date = JSON.parse(localStorage.getItem('projects') || '[]');

const initialState: IProjectList = {
    projects: date,
}

export enum ProjectActions {
    ADD_PROJECT = 'ADD_PROJECT',
    DELETE_PROJECT = 'DELETE_PROJECT',
    EDIT_PROJECT = 'EDIT_PROJECT',
}

export const projectReducer = (state: IProjectList = initialState, action: IPayload) => {
    switch(action.type) {
        case ProjectActions.ADD_PROJECT: {
            const projectList = [...state.projects, action.payload];
            return {
                projects: projectList,
            }
        }
        case ProjectActions.DELETE_PROJECT: {
            const newList = state.projects.filter((item) => item.id !== action.payload.id)
            return {
                ...state, projects: newList,
            }
        }
        case ProjectActions.EDIT_PROJECT: {
            const { id, newTitle, newFlag} = action.payload
           
            return {
                projects: state.projects.map((item: any) => item.id === id 
                    ? {...item, title: newTitle, flag: newFlag} : item 
                )
            }
        }
        default: return state
    }
}

