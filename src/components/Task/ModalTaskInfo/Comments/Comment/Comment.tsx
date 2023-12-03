import { BiSolidCommentX } from 'react-icons/bi'
import styles from './Comment.module.scss'
import { RxAvatar } from 'react-icons/rx'
import { FC } from 'react'
import { useAppDispatch } from '../../../../../redux/hooks'
import { deleteUnderComment } from '../../../../../redux/actions/actionTaskItems'

interface IComment {
    id: string,
    idTask: string,
    idComment: string,
    text: string,
}

export const Comment: FC<IComment> = ({ text, id, idTask, idComment }) => {

    const dispacth = useAppDispatch();

    const handleDeleteUnderComment = () => {
        dispacth(deleteUnderComment({id, idTask, idComment}))
    }

    return (
            <div className={styles.Main}>
            <div className={styles.MainWrapper}>
                <BiSolidCommentX onClick={handleDeleteUnderComment} className={styles.MainWrapperDelete} cursor='pointer'/>
                <div className={styles.MainWrapperUser}>
                    <RxAvatar className={styles.MainWrapperUserAva}/>
                    <div className={styles.MainWrapperUserName}>Дарт Вейдер</div>  
                </div>
                <div className={styles.MainWrapperText}>{text}</div> 
            </div>
        </div>
    )
}