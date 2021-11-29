import { useState, useEffect } from 'react';
import { format, formatDistanceToNow, intervalToDuration } from 'date-fns';
import { motion } from 'framer-motion';
import styles from '../styles.module.scss'
import { VscChromeClose, VscStopCircle, VscDebugStop, VscDebugPause } from 'react-icons/vsc';
import { TiMediaStop } from "react-icons/ti";
import { FaStop, FaPause, FaPlay } from "react-icons/fa";

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
    <motion.div className={styles.currentTaskContainer}
      animate={{ scale: [0.9, 1.01, 1], opacity: [0, 0.5, 1] }}
      transition={{ duration: 0.5 }}
    >


      <div>
        <div className={styles.titleText}>{props.task.task?.title}</div>
        <div className={styles.subTitleText}>{props.task.task.description}</div>
        <div className={styles.taskNotes}>{props.task.task.notes}</div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        {/* <div>
          <div className={styles.BodyText}>{format(new Date(props.task.startTime), "M/d/yyyy h:mm:ss aaa")}</div>
          <div className={styles.BodyText}>{format(timer, "M/d/yyyy h:mm:ss aaa")}</div>
        </div> */}
        <div style={{ display: 'flex', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '5px', padding: '2px' }}>
          <button className={styles.iconButton} onClick={() => props.stop(props.task)}><FaPlay /></button>
          <button className={styles.iconButton} onClick={() => props.stop(props.task)}><FaPause /></button>
          <button className={styles.iconButton} onClick={() => props.stop(props.task)}><FaStop /></button>
        </div>
        <div className={styles.SubTitleText}>{durationText(duration)}</div>
      </div>

    </motion.div>
  )
}