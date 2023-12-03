import { FC, useState } from 'react';
import styles from './Comments.module.scss';
import { BiSolidCommentDetail, BiSolidCommentX } from 'react-icons/bi';
import { RxAvatar } from 'react-icons/rx';
import { useAppDispatch, useAppSelector } from '../../../../redux/hooks';
import { addNewUnderComment, deleteComment } from '../../../../redux/actions/actionTaskItems';
import { Comment } from './Comment/Comment';
import { idGenerator } from '../../../../utils/idGenerate';
import { MdAdd } from 'react-icons/md';

interface IComments {
    idTask: string,
    idComment: string,
    text: string,
}

export const Comments: FC<IComments> = ({ text, idTask, idComment }) => {
    const [ modeUnderComment, setModeUnderComment ] = useState(false)
    const [ underCommentTitle, setUnderCommenttitle ] = useState('')

    const allItems = useAppSelector(state => state.taskItems);

    const allComments = allItems[idTask]['comments'];
    const underComment = allComments.find((item: any) => item.id === idComment);
    console.log(underComment)

    const dispacth = useAppDispatch();

    const handleDeleteComment = () => {
        dispacth(deleteComment({idTask, idComment}))
    }

    const handleAddNewUnderComment = () => {
        if(underCommentTitle === '') return;
        const newUnderComment = {
            id: idGenerator(),
            text: underCommentTitle,
        }
        dispacth(addNewUnderComment({idTask, idComment, newUnderComment}))
        setUnderCommenttitle('');
        setModeUnderComment(false);
    }

    return (
        <div className={styles.Main}>
            <div className={styles.MainWrapper}>
                <div className={styles.MainWrapperOptions}>
                    <BiSolidCommentX onClick={handleDeleteComment} cursor='pointer'/>
                    <BiSolidCommentDetail onClick={() => setModeUnderComment(!modeUnderComment)} cursor='pointer'/>
                </div> 
                <div className={styles.MainWrapperUser}>
                    <RxAvatar className={styles.MainWrapperUserAva}/>
                    <div className={styles.MainWrapperUserName}>Дарт Вейдер</div>  
                </div>
                <div className={styles.MainWrapperText}>{text}</div> 
            </div>
            <div className={styles.MainUnder}>
                {underComment.list?.map((item: any) => <Comment key={item.id} idTask={idTask} idComment={idComment} id={item.id} text={item.text}/>)}
                {modeUnderComment && 
                    <div className={styles.MainUnderAdd}>
                        <input placeholder='Добавить комментарий' value={underCommentTitle} onChange={(e) => setUnderCommenttitle(e.target.value)} type='text' />
                        <MdAdd onClick={handleAddNewUnderComment} cursor='pointer' fontSize='18px'/>
                    </div>}
            </div>
        </div>
    )
}