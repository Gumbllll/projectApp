import { useState } from 'react';
import styles from './ProjectItems.module.scss';
import { Link, useParams } from 'react-router-dom';
import ModalAddTask from '../../Task/ModalAddTask/ModaAddlTask';
import { IoMdArrowRoundBack } from 'react-icons/io'
import { StatusItem } from './StatusItem/StatusItem';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useAppDispatch } from '../../../redux/hooks';
import { moveTask } from '../../../redux/actions/actionTask';

const ProjectItems = () => {
  const [ openAddTask, setOpenAddTask ] = useState(false);
  const [ valueSearch, setValueSearch ] = useState('');

  const dispatch = useAppDispatch();
  const { flag } = useParams();

  const addNewTask = () => {
    setOpenAddTask(true);
  };

  const statusTask = ['Queue', 'Development', 'Done'];

  const onDragEnd = (result: any, ) => {
        if (!result.destination) return;
        const { source, destination, draggableId } = result;
        dispatch(moveTask({source, destination, draggableId, flag}))  
    }

  return (
    <div className={styles.Main}>
        <Link className={styles.MainHome} to='/'> 
          <IoMdArrowRoundBack className={styles.MainHomeIcon}/>
        </Link>
        {openAddTask ? <ModalAddTask openAddTask={openAddTask} setOpenAddTask={setOpenAddTask}/> : ''}
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.MainWrapper}>
            <div className={styles.MainWrapperTitle}>
              <h1>Задачи</h1>
              <input value={valueSearch} onChange={(e) => setValueSearch(e.target.value)} placeholder='Поиск...' type="text" />
            </div>
            <div className={styles.MainWrapperList}>
              {statusTask.map((item, index) => (
                <Droppable key={index} droppableId={item}>
                  {(provided) => (
                    <StatusItem valueSearch={valueSearch} innerRef={provided.innerRef} provided={provided} key={index} status={item}/>
                  )}
                </Droppable>
              ))}
            </div>
            <div className={styles.MainWrapperAdd}>
              <button onClick={addNewTask}>Добавить</button>
            </div>
          </div>
        </DragDropContext>
    </div>
  );
};

  export default ProjectItems;