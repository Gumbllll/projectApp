import { FC, useState } from 'react'
import styles from './ModalEditTitleProject.module.scss'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useAppDispatch } from '../../../redux/hooks'
import { editProject } from '../../../redux/actions/actionProject'
import { getFlag } from '../../../utils/getFlag'
import { updateFlag } from '../../../redux/actions/actionTask'

interface IModalEditTitle {
    flag: string,
    id: string,
    setModalTitle: (item: boolean) => void,
}

const ModalEditTitleProject: FC<IModalEditTitle> = ({ flag, id, setModalTitle }) => {
    const [ newTitle, setNewTitle ] = useState('')

    const dispatch = useAppDispatch();

    const handleAddNewTitle = () => {
        const newFlag = getFlag(newTitle)
        dispatch(editProject({id, newTitle, newFlag}))
        dispatch(updateFlag({ newFlag, flag}))
        setNewTitle('')
        setModalTitle(false)
    }

    return (
        <main className={styles.Main}>
            <div className={styles.MainOverlay}></div>
            <div className={styles.MainWrapper}>
                <AiOutlineCloseCircle onClick={() => setModalTitle(false)} className={styles.MainWrapperClose}/>
                <input placeholder='Введите новое название проекта' onChange={(e) => setNewTitle(e.target.value)} value={newTitle} className={styles.MainWrapperInput} type="text" />
                <button onClick={handleAddNewTitle} className={styles.MainWrapperAdd}>Сохранить</button>
            </div>
        </main>
    )
}

export default ModalEditTitleProject