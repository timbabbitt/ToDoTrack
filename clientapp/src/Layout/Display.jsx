import { Routes, Route } from "react-router-dom"
import { TaskBoard } from '../Pages/TaskBoard'
import { Status } from '../Pages/Status'

export const Display = (props) => {
  return (
    <Routes>
      <Route exact path="/" element={<TaskBoard />} />
      <Route exact path="/taskboard" element={<TaskBoard />} />
      <Route exact path="/status" element={<Status />} />
    </Routes>
  )
}