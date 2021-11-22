
export const Task = (props) => {

  return (
    <div style={{ padding: '10px', border: '1px solid rgb(225,225,225)', marginBottom: '10px' }}>
      <button onClick={() => props.start(props.task)}>Start</button>
      <p>{props.task.title}</p>
      <p>{props.task.taskId}</p>
    </div>
  )
}