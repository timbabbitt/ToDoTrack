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

  const onDrop = (e) => {
    e.preventDefault();
    console.log(e.dataTransfer.getData('text'))
  }

  return (
    <motion.div className={styles.currentTask}
      animate={{ scale: [0.996, 1.001, 1], opacity: [0, 0.9, 1] }}
      transition={{ duration: 0.5 }}
    >


      <div>
        <div className={styles.largeText}>{props.task.task?.title}</div>
        <div className={styles.subTitleText}>{props.task.task.description}</div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end' }}>

        <div style={{ display: 'flex', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '5px' }}>
          <button className={styles.iconButton} onClick={() => props.stop(props.task)}><FaPlay /></button>
          <button className={styles.iconButton} onClick={() => props.stop(props.task)}><FaPause /></button>
          <button className={styles.iconButton} onClick={() => props.stop(props.task)}><FaStop /></button>
        </div>

        <div className={styles.subTitleText}>{durationText(duration)}</div>

      </div>

    </motion.div>
  )
}