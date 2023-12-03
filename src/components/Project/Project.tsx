import { FC } from "react";
import styles from './Project.module.scss';
import { deleteProject } from "../../redux/actions/actionProject";
import { useAppDispatch } from "../../redux/hooks";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

interface IProject {
    id: string,
    title: string | null,
    flag: string,
}

const Project: FC<IProject> = ({title, flag, id}) => {
    const dispatch = useAppDispatch();

    const handleDeleteProject = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
        e.preventDefault();
        dispatch(deleteProject({id}));   
    }

    return (
        <Link to={`project/${flag}`} className={styles.Main}>
            <div className={styles.MainWrapper}>               
                {title}             
            </div>
            <AiFillEdit className={styles.MainEdit}/>
            <AiFillDelete onClick={(e) => handleDeleteProject(e)} className={styles.MainDelete}/>
        </Link>
    )
}

export default Project;