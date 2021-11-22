import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export const CurrentTask = (props) => {

  const [timer, setTimer] = useState(null);

  useEffect(() => {

    const interval = setInterval(() => {
      setTimer(new Date());
    }, 1000);
   
    return () => clearInterval(interval); 
  }, [])

  if (props.task === null) return null

  return (
    <div style={{ padding: '10px', border: '1px solid rgb(225,225,225)', margin: '10px 0px' }}>
      <div>Active Task</div>
      <button onClick={() => props.stop(props.task)}>Stop</button>
      <p>{props.task.task.title}</p>
      <p>{format(new Date(props.task.startTime), "M/d/yyyy h:mm:ss aaa")}</p>
      <p>{format(timer, "M/d/yyyy h:mm:ss aaa")}</p>
      <p>{props.task.task.taskId}</p>
    </div>
  )
}