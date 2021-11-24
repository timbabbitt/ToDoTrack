import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { Home } from "./Pages/Home"
import { Status } from "./Pages/Status"
import styles from './styles.module.scss'
import { projectsAtom, currentTaskAtom } from './Atoms'
import { useAtom } from 'jotai'

const App = () => {

  const [projects, setProjects] = useAtom(projectsAtom)
  const [currentTask, setCurrentTask] = useAtom(currentTaskAtom)

  const [user, setUser] = useState({
    FirstName: "Tim",
    LastName: "Babbitt",
    UserId: "4367ff6f-c94a-4bb8-88d1-2fcba2570ee8",
    BadgeNumber: "69876"
  })

  useEffect(() => {
    const fetchURL = "api/Project/Get/" + user.BadgeNumber
    const fetchParams = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(fetchURL, fetchParams)
      .then(resp => resp.json())
      .then(data => {
        setProjects(data)
      })

    const fetchURL2 = "api/Timer/Active/" + '69876'
    const fetchParams2 = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(fetchURL2, fetchParams2)
      .then(resp => resp.json())
      .then(data => {
        setCurrentTask(data.task === null ? null : data)
      })
  }, [])

  return (
    <div style={{ padding: '10px'}}>
      <Routes>
        <Route exact path="/" element={<Home projects={projects} user={user} currentTask={currentTask} setCurrentTask={(task) => setCurrentTask(task)} />} />
        <Route exact path="/status" element={<Status projects={projects} user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
