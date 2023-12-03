import { getCurrentDate, getDifferenceDate } from "../../utils/date";

export enum TaskActions {
  ADD_TASK = 'ADD_TASK',
  DELETE_TASK = 'DELETE_TASK',
  EDIT_TASK = 'EDIT_TASK',
  MOVE_TASK = 'MOVE_TASK',
  ADD_NEW_TASK_LIST = 'ADD_NEW_TASK_LIST',
  SEARCH_TASK = 'SEARCH_TASK',
  UPDATE_FLAG = 'UPDATE_FLAG',
}

interface ITaskItem {
      id: string,
      title: string, 
      dateCreation?: string,
      dateDone?: string | null,
      atWork: string| number | null,
      priority: string,
      description: string | null,
}

interface ITaskList {
  [flag: string]: {
    [statusTask: string]: {
      tasks: ITaskItem[];
    }
  };
}

const initialState = JSON.parse(String(localStorage.getItem("tasks"))) || {};

export const taskReducer = (
  state: ITaskList = initialState,
  action: any
) => {
  switch (action.type) {
    case TaskActions.ADD_TASK: {
      const { flag, newTask, statusTask } = action.payload;

      const start = newTask['dateCreation'];
      const end = newTask['dateDone']

      if(statusTask === 'Done') {
        newTask['dateDone'] = getCurrentDate();
        newTask['atWork'] = getDifferenceDate(start, end)
      } else {
        newTask['dateDone'] = null;
      }

      return {
        ...state,
        [flag]: {
          ...state[flag],
          [statusTask]: {
            tasks: (state[flag]?.[statusTask]?.tasks ?? []).concat(newTask)
          } 
        }
      };
    }
    case TaskActions.DELETE_TASK: {
      const { flag, status, id } = action.payload;
      return {
        ...state,
        [flag]: {
          ...state[flag],
          [status]: {
            tasks: (state[flag]?.[status]?.tasks).filter(item => item.id !== id)
          } 
        }
      };
    }
    case TaskActions.MOVE_TASK: {
      const { source, destination, flag } = action.payload

      const start = state[flag][source.droppableId]
      const finish = state[flag][destination.droppableId]

      if(start === finish) {
        const newTasks = [...start.tasks];
        const [prevPosition] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, prevPosition);

        return {
          ...state,
          [flag]: {
            ...state[flag],
            [source.droppableId]: {
              tasks: newTasks
            }
          }
        }
      }

      const startList = [...start.tasks];
      const [ item ] = startList.splice(source.index, 1)

      const finishList = [...finish.tasks];
      finishList.splice(destination.index, 0, item)

      const startDate = item['dateCreation'];
      const endDate = item['dateDone']

      if(destination.droppableId === 'Done') {
        item['dateDone'] = getCurrentDate();
        item['atWork'] = getDifferenceDate(startDate, endDate)
      } else { 
        item['dateDone'] = null;
      }; 

      return {
        ...state,
        [flag]: {
          ...state[flag],
          [source.droppableId]: {
            tasks: startList
          },
          [destination.droppableId]: {
            tasks: finishList
          },
        }
      };
    }
    case TaskActions.ADD_NEW_TASK_LIST: {
      const flag = action.payload;

      const prevState = JSON.parse(JSON.stringify(state));
      prevState[flag] = {
        Queue: {
          tasks: []
        },
        Development: {
          tasks: []
        },
        Done: {
          tasks: []
        }
      }  
      return prevState;    
    }
    case TaskActions.EDIT_TASK: {
      const { flag, newTitle, statusTask } = action.payload;

      return {
        ...state,
        [flag]: {
          ...state[flag],
          [statusTask]: {
            tasks: (state[flag][statusTask].tasks.map((item: any) => (
              item.flag === flag ? {...item, title: newTitle} : item
            )))
          }
        }
      }
    }
    case TaskActions.UPDATE_FLAG: {
      const { newFlag, flag} = action.payload
      const oldItems = {...state[flag]}
      delete state[flag];

      return {
        ...state,
        [newFlag]: oldItems
      }
    }
    default:
      return state;
  }
};