import React, { useState } from 'react'
import { CreateUserForm } from '../components/forms/CreateUserForm'
import { Dialog, Button, DialogActions, DialogTitle, DialogContent } from '@material-ui/core'
import api from '../api/api'

export const CreateUser = () => {
  const [ open, setOpen ] = useState(false)
  const [ createdSuccess, setCreatedSuccess ] = useState(false)

  const handleSubmit = async (user: any) => {
    try {
      await api.createUser(user)
      setOpen(true)
      setCreatedSuccess(true)
    } catch (err) {
      setOpen(true)
      setCreatedSuccess(false)
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <CreateUserForm
        handleSubmit={handleSubmit}
      />
      <Dialog
        open={open}
      >
        <DialogTitle>Creating New Admin...</DialogTitle>
        <DialogContent>
          {createdSuccess ? (
            <h4>New admin created successfully!</h4>
          ) : (
            <h4>There was a problem trying to create a new admin</h4>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
          >OK</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
