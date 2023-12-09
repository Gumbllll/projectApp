import { FC, useState } from "react";
import styles from './Project.module.scss';
import { deleteProject } from "../../redux/actions/actionProject";
import { useAppDispatch } from "../../redux/hooks";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import ModalEditTitleProject from "./ModalEditTitleProject/ModalEditTitleProject";

interface IProject {
    id: string,
    title: string | null,
    flag: string,
}

const Project: FC<IProject> = ({title, flag, id}) => {
    const [ modalTitle, setModalTitle ] = useState(false)

    const dispatch = useAppDispatch();

    const handleDeleteProject = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(deleteProject({id}));   
    }

    const handleEditeProject = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault();
        setModalTitle(true);   
    }

    return (
        <>
            <div className={styles.Background}>
                {modalTitle && <ModalEditTitleProject flag={flag} id={id} setModalTitle={setModalTitle}/>}
            </div>
            <Link to={`project/${flag}`} className={styles.Main}>
                <div className={styles.MainWrapper}>               
                    {title}             
                </div>
                <AiFillEdit onClick={handleEditeProject} className={styles.MainEdit}/>
                <AiFillDelete onClick={handleDeleteProject} className={styles.MainDelete}/>
            </Link>
        </>
    )
}

export default Project;