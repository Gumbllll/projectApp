import { useEffect, useState } from 'react';
import Project from '../components/Project/Project';
import './App.module.scss';
import styles from './App.module.scss';
import { useAppSelector } from '../redux/hooks';
import ModalAddProject from '../components/Project/ModalAddProject/ModalAddProject';

function App() {
  const [ modalProject, setModalProject ] = useState(false);

  const projects = useAppSelector(state => state.project.projects);

  useEffect(() => {
    localStorage.setItem('projects', JSON.stringify(projects))
  }, [projects]);

  return (
    <div className={styles.App}>
      {modalProject ? <ModalAddProject modalProject={modalProject} setModalProject={setModalProject}/> : ''}
      <div className={styles.AppWrapper}>
        <div className={styles.AppWrapperTitle}>
          <h1>Проекты</h1>
        </div>
        <div className={styles.AppWrapperList}>
          {projects.map((project) => <Project key={project.id} title={project.title} id={project.id} flag={project.flag}/>)}
        </div>
        <div className={styles.AppWrapperAdd}>
          <button onClick={() => setModalProject(true)}>Добавить</button>
        </div>
      </div>
    </div>
  );
}

export default App;
