import { FC } from 'react'
import styles from '../ModalStatus/ModalStatus.module.scss'

interface IPriotity{
    openListPriority: boolean,
    priorityTask: string,
    setPriorityTask: (item: string) => void,
    setOpenListPriority: (item: boolean) => void,
}

export const ModalProirity: FC<IPriotity> = ({ priorityTask, openListPriority, setPriorityTask, setOpenListPriority }) => {

    const priority = ['Низкий', 'Средний', 'Высокий'];

    const handleModal = (item: string) => {
        setPriorityTask(item);
        setOpenListPriority(false);
    }

    return (
        <div className={styles.Main}>
            <div className={styles.MainName}>
                <div className={styles.MainNameT} onClick={() => setOpenListPriority(!openListPriority)}>
                    Приоритет 
                    <span className={styles.MainNameStatus}>{priorityTask}</span>
                </div>
            </div>
            {openListPriority && <div className={styles.MainMenu}>
                <ul className={styles.MainMenuUl}>
                    {priority.map((item, i) => <li key={i} onClick={() => handleModal(item)} className={styles.MainMenuUlItem}>{item}</li>)}
                </ul>
        </div>}
    </div>
    )
}