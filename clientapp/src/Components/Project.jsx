import { text } from '../styles'
import { Task } from '../Components/Task'

export const Project = (props) => {

  return (
    <div>
      <div style={text('title')}>{props.project.name}</div>
      <div style={text('subTitle')}>{props.project.description}</div>
      <div style={{ border: '1px solid rgb(225,225,225)', padding: '10px', margin: '10px 0px' }}>{props.project.notes}</div>
      <div>
        {props.project.tasks.map((task, i) => <Task key={i} task={task} start={() => props.start(task)}/> )}
      </div>
    </div>
  )
}