import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { Modal } from './Modal'
import { TextInput } from '../Inputs/TextInput'

export const AddTaskModal = (props) => {

  const addTask = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const fetchURL = "api/Task/Add"
    const fetchParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: formData.get('title'),
        description: formData.get('description'),
        notes: formData.get('notes'),
        projectId: props.project.projectId
      }),
    }
    fetch(fetchURL, fetchParams)
      .then(resp => props.afterSubmit())
      .catch(err => console.log(err))
  }

  return (
    <Modal title="Add Task" isOpen={props.isOpen} onClose={props.onClose}>
      <form onSubmit={(e) => addTask(e)}>

        <TextInput label="Title" name="title" placeholder="" />
        <TextInput label="Description" name="description" placeholder="" />
        <TextInput label="Notes" name="notes" placeholder="" />
        
        <button type="submit">Add Task</button>
        <button onClick={props.onClose}>Cancel</button>

      </form>
    </Modal>
  )
}
