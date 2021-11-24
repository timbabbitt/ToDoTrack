import { createPortal } from 'react-dom'
import { useState, useEffect } from 'react'
import { Modal } from './Modal'
import { TextInput } from '../Inputs/TextInput'

export const AddProjectModal = (props) => {

  const addProject = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)

    const fetchURL = "api/Project/Add"
    const fetchParams = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        description: formData.get('description'),
        notes: formData.get('notes'),
        group: formData.get('group')
      }),
    }
    fetch(fetchURL, fetchParams)
      .then(resp => console.log('submitted'))
  }

  return (
    <Modal title="Add Project" isOpen={props.isOpen} onClose={props.onClose}>
      <form onSubmit={(e) => addProject(e)}>

        <TextInput label="Project Name" name="name" placeholder="Project Name" />
        <TextInput label="Description" name="description" placeholder="" />
        <TextInput label="Notes" name="notes" placeholder="" />
        <TextInput label="Group" name="group" placeholder="" />
        
        <button type="submit">Add Project</button>
        <button onClick={props.onClose}>Cancel</button>

      </form>
    </Modal>
  )
}
