import { AiOutlineCloseCircle } from 'react-icons/ai';
import styles from './ModalAddProject.module.scss'
import { idGenerator } from '../../../utils/idGenerate';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { addProject } from '../../../redux/actions/actionProject';
import { FC, useEffect, useRef, useState } from 'react';
import { addNewTaskList } from '../../../redux/actions/actionTask';
import { getFlag } from '../../../utils/getFlag';

interface IModalAddProject {
    modalProject: boolean,
    setModalProject: (item: boolean) => void,
}

const ModalAddProject: FC<IModalAddProject> = ({modalProject, setModalProject}) => {
    const projects = useAppSelector<any>(state => state.project.projects);

    const [ projectTitle, setProjectTitle ] = useState('');

    const refInput = useRef<HTMLInputElement>(null);

    const dispatch = useAppDispatch();

    useEffect(() => {
        if(modalProject) {
            refInput.current?.focus();
        }
    }, [modalProject])

    const handleAddProject = () => {
        const flag = getFlag(projectTitle);

        const exists =  projects.find((item: any) => item.flag === flag);

        if(!exists) {
            const project = {
                id: idGenerator(),
                title: projectTitle,
                flag,
              }
              dispatch(addProject(project));
              dispatch(addNewTaskList(flag));
              setModalProject(false);
        } else {
            return;
        }
      }

    return (
        <main className={styles.Main}>
            <div className={styles.MainOverlay}></div>
            <div className={styles.MainWrapper}>
                <div className={styles.MainWrapperModal}>
                    <AiOutlineCloseCircle className={styles.MainWrapperModalClose} onClick={() => setModalProject(false)}/>
                    <input ref={refInput} placeholder='Введите название проекта' value={projectTitle} onChange={(e) => setProjectTitle(e.target.value)} className={styles.MainWrapperModalInput} type="text"/>
                    <button disabled={projectTitle === ''} onClick={handleAddProject} className={styles.MainWrapperModalAdd}>Добавить</button>
                </div>
            </div>
        </main>
    )
}

export default ModalAddProject;