import { useEffect, useState } from 'react';
import styles from '../styles.module.scss'
import { currentTaskAtom } from '../Atoms'
import { useAtom } from 'jotai'

export const Task = (props) => {

  const [currentTask] = useAtom(currentTaskAtom)  




  const onDragStart = (e) => {
    e.dataTransfer.setData('text', JSON.stringify(props.task))
  }

  if (currentTask === null) return null

  return (
    <div className={currentTask.taskId === props.task.taskId ? styles.taskContainerActive : styles.taskContainer} draggable onDragStart={onDragStart}>

      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className={styles.largeText}>{props.task.title}</div>
        <button className={styles.startButton} onClick={() => props.start(props.task)}>Start</button>
      </div>

      <div>
        <div className={styles.subTitleText}>{props.task.description}</div>
        <div className={styles.noteContainer}>
          <div className={styles.bodyText}>{props.task.notes}</div>
        </div>
      </div>

    </div>
  )
}