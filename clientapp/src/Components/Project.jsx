import { useState } from 'react'
import { text } from '../styles'
import { Task } from '../Components/Task'
import { AddTaskModal } from '../Components/Modals/AddTaskModal'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import styles from '../styles.module.scss'

const variants = {
  open: { opacity: 1, height: 'auto' },
  closed: { opacity: 0, height: 0 }
}

const rotateVariants = {
  up: { rotate: 180 },
  down: { rotate: 0 }
}


export const Project = (props) => {
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(true)
  const controls = useAnimation()

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

        <div>{props.project.tasks.length}</div>

      </div>
      
      <AnimatePresence>
        {!isCollapsed && <motion.div
          variants={variants}
          initial="closed"
          animate="open"
          exit="closed"
        >
          <div className={styles.noteContainer}>
            {props.project.notes}
          </div>

          <div className={styles.tasksContainer}>
            <div className={styles.addATask} onClick={() => setIsAddTaskModalOpen(true)}>Add a task</div>
            {props.project.tasks.map((task, i) => <Task key={i} task={task} start={() => props.start(task)} />)}
          </div>

        </motion.div>}
      </AnimatePresence>
      <AddTaskModal isOpen={isAddTaskModalOpen} onClose={() => setIsAddTaskModalOpen(false)} project={props.project} />
    </div>
  )
}