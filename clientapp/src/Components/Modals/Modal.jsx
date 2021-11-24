import ReactDOM from 'react-dom';
import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import styles from '../../styles.module.scss'

export const Modal = ({ title, isOpen, onClose, children }) => {
  if (!isOpen) return null
  return ReactDOM.createPortal(
    <ModalContainer>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>{title}</div>
        <div className={styles.modalBody}>{children}</div>
      </div>
    </ModalContainer>
    , document.body
  )
}

const ModalContainer = ({ children }) => {
  return (<div className={styles.modalContainer}>{children}</div>)
}
