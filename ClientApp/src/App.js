import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { Boards } from "./Pages/TaskBoard"
import { Status } from "./Pages/Status"
import styles from './styles.module.scss'
import { Nav } from './Layout/Nav'
import { Display } from './Layout/Display'
import { projectsAtom, currentTaskAtom, userAtom } from './Atoms'
import { useAtom } from 'jotai'

const App = () => {

  const [, setProjects] = useAtom(projectsAtom)
  const [, setCurrentTask] = useAtom(currentTaskAtom)
  const [user] = useAtom(userAtom)

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
    <div style={{ padding: '10px' }}>
      <Nav />
      <Display />
    </div>
  );
}

export default App;
