import { useState } from 'react';
import { Project } from '../Components/Project';
import { CurrentTask } from '../Components/CurrentTask';
import { AddProjectModal } from '../Components/Modals/AddProjectModal';
import styles from '../styles.module.scss'

export const Home = (props) => {

  const { projects, user, currentTask } = props
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
        console.log(data)
        props.setCurrentTask(data)
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
      .then(resp => props.setCurrentTask(null))
  }

  return (
    <div>
      <h1>DevBoard</h1>
      <p>Welcome {user.FirstName}</p>

      {currentTask !== null && <CurrentTask task={currentTask} stop={(task) => stop(task)} />}

      <button onClick={() => setAddProjectModalIsShown(true)}>Add a Project</button>

      <div className={styles.projectsContainer}>
        {projects.map((project, i) => <Project key={i} project={project} start={(task) => start(task)} />)}
      </div>
      
      <AddProjectModal isOpen={addProjectModalIsShown} onClose={() => setAddProjectModalIsShown(false)} />
    </div>
  )
}