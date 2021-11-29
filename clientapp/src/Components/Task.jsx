import styles from '../styles.module.scss'

export const Task = (props) => {

  return (
    <div className={styles.taskContainer}>
      <div className={styles.subTitleText}>{props.task.title}</div>
      <div>
        <p className={styles.bodyText}>{props.task.description}</p>
        <div className={styles.noteContainer}>
          <div className={styles.bodyText}>{props.task.notes}</div>
        </div>

      </div>
      <button onClick={() => props.start(props.task)}>Start</button>
    </div>
  )
}