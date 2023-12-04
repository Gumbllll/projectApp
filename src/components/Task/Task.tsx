import { FC, useState } from 'react';
import styles from './Task.module.scss'
import { AiFillEdit, AiFillDelete, AiFillFile } from "react-icons/ai";
import { useAppDispatch } from '../../redux/hooks';
import { deleteTask } from '../../redux/actions/actionTask';
import { useParams } from 'react-router-dom';
import { ModalTaskInfo } from './ModalTaskInfo/ModalTaskInfo';
import { ModalFileInfo } from './ModalFileInfo/ModalFileInfo';
import ModalEditTitle from './ModalEditTitleTask/ModalEditTitleTask';

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
    const [ openEditTitle, setOpenEditTitle ] = useState(false)

    const { flag } = useParams();

    const dispatch = useAppDispatch();

    const handleDeleteTask = (e: any) => {
        e.preventDefault();
        dispatch(deleteTask({ id, flag, status }))
    };

    const handleFileTask = (e: any) => {
        e.stopPropagation();
        setOpenFileInfo(true)
    };

    const handleEditTitle = (e: any) => {
        e.stopPropagation();
        setOpenEditTitle(true)
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
            { openEditTitle && <ModalEditTitle setOpenEditTitle={setOpenEditTitle} 
                                                status = {status}
                                                id = {id}
                /> }
            <div ref={innerRef} {...provided.draggableProps} {...provided.dragHandleProps} onClick={() => setOpenTaskInfo(true)} className={styles.MainWrapper}>
                <div className={styles.MainWrapperData}>
                    <div className={styles.MainWrapperDataNumber}>{index + 1}.</div>
                    <div className={styles.MainWrapperDataTitle}>{title}</div>
                </div>
                <div className={styles.MainWrapperOptions}>
                    <div onClick={handleFileTask} className={styles.MainWrapperOptionsF}>
                        <AiFillFile className={styles.MainWrapperOptionsFFile}/>
                    </div>
                    <div onClick={handleEditTitle} className={styles.MainWrapperOptionsE}>
                        <AiFillEdit className={styles.MainWrapperOptionsEEdit}/>
                    </div>
                    <div onClick={handleDeleteTask} className={styles.MainWrapperOptionsD}>
                        <AiFillDelete className={styles.MainWrapperOptionsDDelete}/>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Task;