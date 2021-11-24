import { useState } from 'react'
import { text } from '../styles'
import { Task } from '../Components/Task'
import { AddTaskModal } from '../Components/Modals/AddTaskModal'

export const Project = (props) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

  return (
    <div>
      <div style={text('title')}>{props.project.name}</div>
      <div style={text('subTitle')}>{props.project.description}</div>
      <button onClick={() => setIsCollapsed(current => !current)}>-</button>
      <div style={{ maxHeight: isCollapsed ? '0px': '500px', overflow: 'hidden', transition: 'height 0.5s' }}>
        <div style={{ border: '1px solid rgb(225,225,225)', padding: '10px', margin: '10px 0px' }}>
          {props.project.notes}
        </div>
        <div>
          <button onClick={() => setIsAddTaskModalOpen(true)}>Add Task</button>
          {props.project.tasks.map((task, i) => <Task key={i} task={task} start={() => props.start(task)} />)}
        </div>
      </div>
      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} project={props.project} />
    </div>
  )
}