import { Project } from '../Components/Project';
import { CurrentTask } from '../Components/CurrentTask';

export const Home = (props) => {

  const { projects, user, currentTask } = props

  const start = (task) => {
    const fetchURL = "api/Timer/Start"
    const fetchParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task),
    }
    fetch(fetchURL, fetchParams)
      .then(resp => resp.json())
      .then(data => {
        // console.log(data)
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
      <h1>Home</h1>
      <p>Welcome {user.FirstName}</p>
      <button>Add a Project</button>

      <CurrentTask task={currentTask} stop={(task) => stop(task)} />

      {projects.map((project, i) => {

        return (
          <div key={i} style={{ border: '1px solid rgb(225,225,225)', padding: '10px', margin: '10px 0px' }}>
            <Project project={project} start={(task) => start(task)} />
          </div>
        )
      })}
    </div>
  )
}