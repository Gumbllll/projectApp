import { FC, useEffect } from 'react'
import styles from './StatusItem.module.scss'
import { useParams } from 'react-router-dom';
import { useAppSelector } from '../../../../redux/hooks';
import Task from '../../../Task/Task';
import { Draggable } from 'react-beautiful-dnd';

interface IStatusTask {
    status: string,
    innerRef?: any,
    provided?: any,
    valueSearch: string,
}

export const StatusItem: FC<IStatusTask> = ({ valueSearch, status, innerRef, provided }) => {

    const { flag } = useParams();

    const allTasks = useAppSelector((state) => state.task);

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(allTasks));
    }, [allTasks]);

    const tasks = allTasks[flag!] ?? [];

    return (
        <div ref={innerRef} {...provided.droppableProps} className={styles.Main}>
            <div className={styles.MainWrapper}>
                <div className={styles.MainWrapperTitle}>{status}</div>
                <div className={styles.MainWrapperTasks}>
                    {tasks[status]?.tasks.filter((task: any) => (
                            task.title.toLowerCase().includes(valueSearch.toLocaleLowerCase())
                        )).map((task: any, index: any) => (
                        <Draggable 
                            draggableId={task.id} 
                            key={task.id} 
                            index={index}>
                            {(provided) => (
                                <Task 
                                    provided={provided}
                                    innerRef={provided.innerRef} 
                                    status={status} 
                                    key={task?.id} 
                                    index={index} 
                                    id={task?.id} 
                                    title={task?.title}/>
                                )}
                        </Draggable>))}   
                    {provided.placeholder}   
                </div> 
            </div>
        </div>    
    )
}