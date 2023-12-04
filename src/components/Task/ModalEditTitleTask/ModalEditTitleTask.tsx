import { FC, useState } from 'react'
import styles from './ModalEditTitleTask.module.scss'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useAppDispatch } from '../../../redux/hooks'
import { editProject } from '../../../redux/actions/actionProject'
import { getFlag } from '../../../utils/getFlag'
import { editTask, updateFlag } from '../../../redux/actions/actionTask'
import { useParams } from 'react-router-dom'

interface IModalEditTitle {
    setOpenEditTitle: (item: boolean) => void, 
    status: string,
    id: string,
}

const ModalEditTitle: FC<IModalEditTitle> = ({ setOpenEditTitle, status, id }) => {
    const [ newTitle, setNewTitle ] = useState('')

    const dispatch = useAppDispatch();
    const { flag } = useParams();

    const handleAddNewTitle = () => {
        dispatch(editTask({status, id, newTitle, flag}));
        setNewTitle('');
        setOpenEditTitle(false)
    }

    return (
        <main className={styles.Main}>
            <div className={styles.MainOverlay}></div>
            <div className={styles.MainWrapper}>
                <AiOutlineCloseCircle onClick={() => setOpenEditTitle(false)} className={styles.MainWrapperClose}/>
                <input placeholder='Введите новое название задачи' onChange={(e) => setNewTitle(e.target.value)} value={newTitle} className={styles.MainWrapperInput} type="text" />
                <button onClick={handleAddNewTitle} className={styles.MainWrapperAdd}>Сохранить</button>
            </div>
        </main>
    )
}

export default ModalEditTitle