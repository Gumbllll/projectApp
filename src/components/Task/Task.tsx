import { FC, useState } from 'react';
import styles from './Task.module.scss'
import { AiFillEdit, AiFillDelete, AiFillFile } from "react-icons/ai";
import { useAppDispatch } from '../../redux/hooks';
import { deleteTask } from '../../redux/actions/actionTask';
import { useParams } from 'react-router-dom';
import { ModalTaskInfo } from './ModalTaskInfo/ModalTaskInfo';
import { ModalFileInfo } from './ModalFileInfo/ModalFileInfo';

interface ITask{
    id: string,
    title: string | null,
    index: number,
    status: string,
    innerRef?: any,
    provided?:any,
}

const Task: FC<ITask> = ({ status, id, title, index, provided, innerRef}) => {
    const [ openTaskInfo, setOpenTaskInfo ] = useState(false)
    const [ openFileInfo, setOpenFileInfo ] = useState(false)

    const { flag } = useParams();

    const dispatch = useAppDispatch();

    const handleDeleteTask = () => {
        dispatch(deleteTask({ id, flag, status }))
    };
    
    return (
        <main className={styles.Main}>
            { openTaskInfo && <ModalTaskInfo openTaskInfo = {openTaskInfo}
                                            setOpenTaskInfo = {setOpenTaskInfo}
                                            status = {status}
                                            id = {id}
                /> }
           { openFileInfo && <ModalFileInfo id={id} openInfo={setOpenFileInfo}
                /> } 
            <div ref={innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => setOpenTaskInfo(true)} className={styles.MainWrapper}>
                <div className={styles.MainWrapperData}>
                    <div className={styles.MainWrapperDataNumber}>{index + 1}.</div>
                    <div className={styles.MainWrapperDataTitle}>{title}</div>
                </div>
                <div className={styles.MainWrapperOptions}>
                    <AiFillFile onClick={() => setOpenFileInfo(true)} className={styles.MainWrapperOptionsFile}/>
                    <AiFillEdit className={styles.MainWrapperOptionsEdit}/>
                    <AiFillDelete onClick={handleDeleteTask} className={styles.MainWrapperOptionsDelete}/>
                </div>
            </div>
        </main>
    )
}

export default Task;