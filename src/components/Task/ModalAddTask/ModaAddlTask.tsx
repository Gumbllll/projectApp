import { FC, useState } from 'react';
import styles from './ModalAddTask.module.scss'
import { idGenerator } from '../../../utils/idGenerate';
import { useAppDispatch } from '../../../redux/hooks';
import { addTask } from '../../../redux/actions/actionTask';
import { useParams } from 'react-router-dom';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { ModalStatus } from './ModalStatus/ModalStatus';
import { ModalProirity } from './ModalPriority/ModalPriority';
import { getCurrentDate } from '../../../utils/date';

interface IModalAddTask {
    openAddTask: boolean,
    setOpenAddTask: (status: boolean) => void
}

const ModalAddTask: FC<IModalAddTask> = ({ setOpenAddTask }) => {

    const [ statusTask, setStatusTask ] = useState('Queue');
    const [ priorityTask, setPriorityTask ] = useState('Низкий');
    const [ taskTitle, setTaskTitle ] = useState('');
    const [ taskDescription, setTaskDescription ] = useState('');
    const [ openListStatus, setOpenListStatus ] = useState(false);
    const [ openListPriority, setOpenListPriority ] = useState(false);

    const dispatch = useAppDispatch();

    const { flag } = useParams();
    
    const addNewTask = () => {
        const newTask = {
            id: idGenerator(),
            title: taskTitle,
            description: taskDescription,
            priority: priorityTask,
            dateCreation: getCurrentDate(),
            dateDone: '',
            atWork: '',
            status: statusTask, 
          };
          dispatch(addTask({ flag, newTask, statusTask }));
          setOpenAddTask(false);
    }

    return (
        <div className={styles.Main}>
            <div className={styles.MainOverlay}></div>
            <div className={styles.MainWrapper}>
                <div className={styles.MainWrapperTitle}>Добавить задачу</div>
                <AiOutlineCloseCircle className={styles.MainWrapperClose} onClick={() => setOpenAddTask(false)}/>
                <div className={styles.MainWrapperFeatures}>
                    <div className={styles.MainWrapperFeaturesName}>
                        <label>Название задачи</label>
                        <input placeholder='Введите название задачи' value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}/>
                    </div>
                    <div className={styles.MainWrapperFeaturesСharacteristic}>
                        { <ModalStatus openListStatus={openListStatus} setOpenListStatus={setOpenListStatus} statusTask={statusTask} setStatusTask={setStatusTask}/> }
                        { <ModalProirity priorityTask={priorityTask} setPriorityTask={setPriorityTask} openListPriority={openListPriority} setOpenListPriority={setOpenListPriority}/>}
                    </div>
                    <div className={styles.MainWrapperFeaturesDescription}>
                        <label >Описание задачи</label>
                        <textarea placeholder='Введите описание задачи' value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)}></textarea>
                    </div>
                </div>
                <button disabled={taskTitle === ''} className={styles.MainWrapperAdd} onClick={addNewTask}>Создать</button>
            </div>
        </div>
    )
}

export default ModalAddTask;