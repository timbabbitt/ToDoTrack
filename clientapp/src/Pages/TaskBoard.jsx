import { useState } from 'react';
import { Project } from '../Components/Project';
import { CurrentTask } from '../Components/CurrentTask';
import { AddProjectModal } from '../Components/Modals/AddProjectModal';
import styles from '../styles.module.scss'
import { useAtom } from 'jotai';
import { projectsAtom, currentTaskAtom, userAtom } from '../Atoms';
import { FaPlus } from 'react-icons/fa';

export const TaskBoard = (props) => {

  const [projects, setProjects] = useAtom(projectsAtom)
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom)
  const [user, setUser] = useAtom(userAtom)

  const [addProjectModalIsShown, setAddProjectModalIsShown] = useState(false)

  const start = (task) => {
    if (currentTask !== null) stop(currentTask)

    const fetchURL = "api/Timer/Start"
    const fetchParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    }
    fetch(fetchURL, fetchParams)
      .then(resp => resp.json())
      .then(data => {
        setCurrentTask(data)
      })
  }

  const stop = (task) => {
    const fetchURL = "api/Timer/Stop"
    const fetchParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    }
    fetch(fetchURL, fetchParams)
      .then(resp => setCurrentTask(null))
  }

  const onDrop = (e) => {
    e.preventDefault();
    console.log(JSON.parse(e.dataTransfer.getData('text')))
    start(JSON.parse(e.dataTransfer.getData('text')))
  }

  const updateProject = (project) => {
    let copyOfProjects = [...projects]
    const index = copyOfProjects.findIndex(p => p.projectId === project.projectId)
    copyOfProjects.splice(index, 1)
    copyOfProjects.push(project)
    setProjects(copyOfProjects)
  }


  return (
    <div>
      <div className={styles.titleText}>Active Task</div>
      <div className={styles.currentTaskContainer} onDragOver={(e) => e.preventDefault()} onDrop={onDrop}>
        {currentTask !== null && <CurrentTask task={currentTask} stop={(task) => stop(task)} />}
      </div>

      <br />

      <div style={{ display: 'flex', }}>
        <div className={styles.titleText}>Projects</div>
        <button className={styles.addButton} onClick={() => setAddProjectModalIsShown(true)}><FaPlus style={{ transform: 'translateY(2px)'}} /> Add New</button>
      </div>
      <div className={styles.projectsContainer}>
        {projects.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0)).map((project, i) => <Project key={i} project={project} start={(task) => start(task)} updateProject={(project) => updateProject(project)} />)}
      </div>

      <AddProjectModal isOpen={addProjectModalIsShown} onClose={() => setAddProjectModalIsShown(false)} />
    </div>
  )
}