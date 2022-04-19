import { useState } from 'react'
import { Task } from '../Components/Task'
import { AddTaskModal } from '../Components/Modals/AddTaskModal'
import { motion, AnimatePresence } from 'framer-motion'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { currentTaskAtom } from '../Atoms';
import { useAtom } from 'jotai';
import styles from '../styles.module.scss'

const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 }
}

export const Project = (props) => {
  const [currentTask] = useAtom(currentTaskAtom)

  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)

  const updateTaskStatus = (taskId, status) => {
    console.log(taskId, status)
    let copyOfTasks = [...props.project.tasks]
    let taskToUpdate = copyOfTasks.find(task => task.taskId === taskId)
    taskToUpdate.status = status
    props.updateProject(props.project)
  }

  return (
    <div className={styles.projectContainer}>

      <div className={styles.projectHeader}>

        <button className={styles.iconButton} onClick={() => setIsCollapsed(current => !current)}>
          {isCollapsed && <motion.div animate={{ rotate: 180 }}><FaChevronUp /></motion.div>}
          {!isCollapsed && <motion.div animate={{ rotate: 180 }}><FaChevronDown /></motion.div>}
        </button>

        <div>
          <div className={styles.titleText}>{props.project.name}</div>
          <div className={styles.subTitleText}>{props.project.description}</div>
        </div>

      </div>

      <AnimatePresence>
        {!isCollapsed && <motion.div
          variants={variants}
          initial="closed"
          animate="open"
          exit="closed"
        >

          <div className={styles.kanbanContainer}>

          <div className={styles.kanbanGroupContainer} onDragOver={(e) => e.preventDefault()} onDrop={(e) => updateTaskStatus(JSON.parse(e.dataTransfer.getData("text")).taskId, 1)}>
              <div className={styles.bodyTextBold}>Backlog</div>
              <div className={styles.kanbanGroup}>
                {props.project.tasks.filter(task => task.status === 1 && task.taskId !== currentTask?.taskId).map((task, i) => <Task key={i} task={task} start={() => props.start(task)} />)}
              </div>
            </div>

            <div className={styles.kanbanGroupContainer} onDragOver={(e) => e.preventDefault()} onDrop={(e) => updateTaskStatus(JSON.parse(e.dataTransfer.getData("text")).taskId, 5)}>
              <div className={styles.bodyTextBold}>Up Next</div>
              <div className={styles.kanbanGroup}>
              {props.project.tasks.filter(task => task.status === 5 && task.taskId !== currentTask?.taskId).map((task, i) => <Task key={i} task={task} start={() => props.start(task)} />)}

              </div>
            </div>

            <div className={styles.kanbanGroupContainer} onDragOver={(e) => e.preventDefault()} onDrop={(e) => updateTaskStatus(JSON.parse(e.dataTransfer.getData("text")).taskId, 10)}>
              <div className={styles.bodyTextBold}>Completed</div>
              <div className={styles.kanbanGroup}>
              {props.project.tasks.filter(task => task.status === 10 && task.taskId !== currentTask?.taskId).map((task, i) => <Task key={i} task={task} start={() => props.start(task)} />)}
                
              </div>
            </div>
          </div>


        </motion.div>}
      </AnimatePresence>
      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} project={props.project} />
    </div>
  )
}