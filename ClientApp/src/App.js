import { useState, useEffect } from 'react'
import { Routes, Route } from "react-router-dom"
import { Home } from "./Pages/Home"
import { Status } from "./Pages/Status"

const App = () => {

  const [user, setUser] = useState({
    FirstName: "Tim",
    LastName: "Babbitt",
    UserId: "4367ff6f-c94a-4bb8-88d1-2fcba2570ee8"
  })

  const [projects, setProjects] = useState([])
  const [currentTask, setCurrentTask] = useState(null)
  console.log(currentTask)

  useEffect(() => {
    const fetchURL = "api/Project/Get/" + '1234'
    const fetchParams = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    }
    fetch(fetchURL, fetchParams)
      .then(resp => resp.json())
      .then(data => {
        console.log(data)
        setProjects(data)
      })
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home projects={projects} user={user} currentTask={currentTask} setCurrentTask={(task) => setCurrentTask(task)} />} />
        <Route exact path="/status" element={<Status projects={projects} user={user} />} />
      </Routes>
    </div>
  );
}

export default App;
