import { FC } from 'react'
import styles from './ModalStatus.module.scss'

interface IStatus {
    openListStatus: boolean,
    statusTask: string,
    setStatusTask: (item: string) => void,
    setOpenListStatus: (item: boolean) => void,
}

export const ModalStatus: FC<IStatus> = ({ statusTask, openListStatus, setStatusTask, setOpenListStatus }) => {

    const status = ['Queue', 'Development', 'Done']

    const handleModal = (item: string) => {
        setStatusTask(item);
        setOpenListStatus(false);
    }

    return (
        <div className={styles.Main}>
            <div className={styles.MainName}>
                <div className={styles.MainNameT} onClick={() => setOpenListStatus(!openListStatus)}>
                    Статус 
                    <span className={styles.MainNameStatus}>{statusTask}</span>
                </div>
            </div>
            {openListStatus && <div className={styles.MainMenu}>
                <ul className={styles.MainMenuUl}>
                    {status.map((item, i) => <li key={i} onClick={() => handleModal(item)} className={styles.MainMenuUlItem}>{item}</li>)}
                </ul>
        </div>}
    </div>
    )
}