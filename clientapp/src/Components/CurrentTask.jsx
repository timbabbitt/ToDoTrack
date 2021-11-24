import { useState, useEffect } from 'react';
import { format, formatDistanceToNow, intervalToDuration } from 'date-fns';
import styles from '../styles.module.scss'

export const CurrentTask = (props) => {

  const [timer, setTimer] = useState(new Date());
  const [difference, setDifference] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {
      setTimer(new Date());
      setDifference(formatDistanceToNow(new Date(props.task?.startTime), { addSuffix: true, includeSeconds: true }));
      setDuration(intervalToDuration({ start: new Date(props.task.startTime), end: new Date() }))
    }, 1000);

    return () => clearInterval(interval);
  }, [])

  const durationText = (durationObj) => {
    let returnString = '';
    if (durationObj.hours > 0) {
      returnString += `${durationObj.hours} hours `
    }
    if (durationObj.minutes > 0) {
      returnString += `${durationObj.minutes} minutes `
    }
    if (durationObj.seconds > 0) {
      returnString += `${durationObj.seconds} seconds `
    }

    return returnString
  }

  return (
    <div className={styles.currentTaskContainer}>


      <div>
        <div className={styles.TitleText}>{props.task.task?.title}</div>
        <div className={styles.SubTitleText}>{props.task.task.description}</div>
        <div className={styles.taskNotes}>{props.task.task.notes}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {/* <div>
          <div className={styles.BodyText}>{format(new Date(props.task.startTime), "M/d/yyyy h:mm:ss aaa")}</div>
          <div className={styles.BodyText}>{format(timer, "M/d/yyyy h:mm:ss aaa")}</div>
        </div> */}
        <button className={styles.stopButton} onClick={() => props.stop(props.task)}>X</button>
        <div className={styles.SubTitleText}>{durationText(duration)}</div>
      </div>

    </div>
  )
}