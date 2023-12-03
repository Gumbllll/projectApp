import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdAdd } from 'react-icons/md'
import styles from './ModalTaskInfo.module.scss'
import { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../redux/hooks'
import { Subtasks } from './Subtasks/Subtasks'
import { Comments } from './Comments/Comments'
import { addNewComment, addNewListItems, addNewSubtask } from '../../../redux/actions/actionTaskItems'
import { idGenerator } from '../../../utils/idGenerate'
import { getCurrentDate, getDifferenceDate } from '../../../utils/date'

interface IModalTaskInfo {
    openTaskInfo: boolean,
    setOpenTaskInfo: (item: boolean) => void,
    status: string,
    id: string,
}

export const ModalTaskInfo: FC<IModalTaskInfo> = ( {setOpenTaskInfo, status, id }) => {
    const [ subtaskTitle, setSubtaskTitle ] = useState('');
    const [ commentText, setCommentText ] = useState('');

    const taskItems = useAppSelector(state => state.taskItems);

    const subtasksList = taskItems[id]?.['subtasks'] ?? [];
    const commentsList = taskItems[id]?.['comments'] ?? [];

    const dispatch = useAppDispatch();

    const { flag } = useParams<string>();

    useEffect(() => {
        localStorage.setItem("taskItems", JSON.stringify(taskItems));
    }, [taskItems]);

    useEffect(() => {
        if( taskItems[id]?.['subtasks'] || taskItems[id]?.['comments']) { 
            return
        } else { dispatch(addNewListItems(id)) }
    }, [])

    const tasks = useAppSelector(state => state.task[flag!][status].tasks);
    const taskInfo = tasks.find((item: any) => item.id === id);

    const handleAddNewSubtask = () => {
        if(subtaskTitle === '') return

        const subtask = {
            id: idGenerator(),
            title: subtaskTitle,
            status: false,
        }
        dispatch(addNewSubtask({subtask, id}))
        setSubtaskTitle('');
    }

    const handleAddNewComment = () => {
        if(commentText === '') return

        const comment = {
            id: idGenerator(),
            text: commentText,
            list: []
        }
        dispatch(addNewComment({comment, id}))
        setCommentText('');
    }
    
    return (
        <div className={styles.Main}>
            <div className={styles.MainOverlay}></div>
            <div className={styles.MainWrapper}>
                <AiOutlineCloseCircle onClick={() => setOpenTaskInfo(false)} className={styles.MainWrapperClose}/>
                <div className={styles.MainWrapperText}>
                    <div className={styles.MainWrapperTextTitle}>{taskInfo?.title}</div>
                    <div className={styles.MainWrapperTextDescription}>{taskInfo?.description}</div>
                </div>
                <div className={styles.MainWrapperInfo}>
                    <div className={styles.MainWrapperInfoCreating}>
                        <div>Дата создания</div>
                        <div>{taskInfo?.dateCreation}</div>
                    </div>
                    <div className={styles.MainWrapperInfoDone}>
                        <div>Дата окончания</div>
                        <div>{taskInfo?.dateDone}</div>
                    </div>
                    <div className={styles.MainWrapperInfoInwork}>
                        <div>Время в работе</div>
                        <div>{taskInfo?.atWork}</div>
                    </div>
                    <div className={styles.MainWrapperInfoPriority}>
                        <div>Приоритет</div>
                        <div>{taskInfo?.priority}</div>
                    </div>
                    <div className={styles.MainWrapperInfoStatus}>
                        <div>Статус</div>
                        <div>{status}</div>
                    </div>
                </div>
                <div className={styles.MainWrapperSubtasks}>
                    <div className={styles.MainWrapperSubtasksList}>
                        {subtasksList.map((item: any) => <Subtasks key={item.id} status={item.status} idTask={id} idSubtask={item.id} title={item.title}/>)}
                    </div>
                    <div className={styles.MainWrapperSubtasksForm}>
                        <input className={styles.MainWrapperSubtasksFormAdd} value={subtaskTitle} onChange={(e) => setSubtaskTitle(e.target.value)} placeholder='Введите название подзадачи' type="text" />
                        <MdAdd onClick={handleAddNewSubtask}/>
                    </div>
                </div>
                <div className={styles.MainWrapperComments}>
                    <div className={styles.MainWrapperCommentsForm}>
                        <input className={styles.MainWrapperCommentsFormAdd} value={commentText} onChange={(e) => setCommentText(e.target.value)} placeholder='Добавить комментарий' type="text" />
                        <MdAdd onClick={handleAddNewComment}/>
                    </div>
                    <div className={styles.MainWrapperCommentsList}>
                        {commentsList.map((item: any) => <Comments key={item.id} idTask={id} idComment={item.id} text={item.text}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}