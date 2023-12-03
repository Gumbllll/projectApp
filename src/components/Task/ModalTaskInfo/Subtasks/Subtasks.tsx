import { AiFillDelete, AiFillEdit, AiOutlinePlus } from 'react-icons/ai'
import styles from './Subtasks.module.scss'
import { FC, useEffect, useRef, useState } from 'react'
import { useAppDispatch } from '../../../../redux/hooks'
import { changeStatusSubtask, deleteSubtask, editSubtask } from '../../../../redux/actions/actionTaskItems'

interface ISubtasks {
    status: boolean,
    idTask: string,
    idSubtask: string,
    title: string,
}

export const Subtasks: FC<ISubtasks> = ({ idTask, idSubtask ,title, status }) => {
    const [ updateMode, setUpdateMode ] = useState(false);
    const [ subtaskNewTitle, setSubtaskNewTitle ] = useState(title);

    const refUpdate = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(updateMode) {
            refUpdate?.current?.focus();
        }
    }, [updateMode])

    const handleDeleteSubtasks = () => {
        dispatch(deleteSubtask({ idTask, idSubtask }))
    }

    const handleEditSubtask = () => {
        dispatch(editSubtask({subtaskNewTitle, idTask, idSubtask}))
        setUpdateMode(false);
    }

    const handleChangeStatusSubtask = () => {
        dispatch(changeStatusSubtask({idTask, idSubtask, status}))
    }

    return (
        <div className={styles.Main}>
            <div className={styles.MainWrapper}>
                <input checked={status} onChange={handleChangeStatusSubtask} type="checkbox" />
                {updateMode ? <input onChange={(e) => setSubtaskNewTitle(e.target.value)} ref={refUpdate} type="text" value={subtaskNewTitle}/>
                : <h1 className={`${styles.MainWrapperTitle} ${status && styles.Completed}`} >{title}</h1>
                }
                <div className={styles.MainWrapperOptions}>
                    {updateMode ? <AiOutlinePlus onClick={handleEditSubtask} className={styles.MainWrapperOptionsEdit}/> 
                    : <AiFillEdit onClick={() => setUpdateMode(true)} className={styles.MainWrapperOptionsEdit}/>}
                    <AiFillDelete onClick={handleDeleteSubtasks} className={styles.MainWrapperOptionsDelete}/>    
                </div>
            </div>
        </div>
    )
}