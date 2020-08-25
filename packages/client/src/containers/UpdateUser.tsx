import React, { useContext, useState } from 'react'
import {UpdateUserForm} from '../components/forms/UpdateUserForm'
import api from '../api/api'
import {
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import { UserContext } from '../UserContext'
import { useHistory } from 'react-router-dom'

export const UpdateUser = (props: any) => {
  const { user } = useContext(UserContext)
  const [open, setOpen] = useState(false)
  const [createdSuccess, setCreatedSuccess] = useState(false)
  const history = useHistory()

  const handleSubmit = async (values: any) => {
    const id = user ? user.id : undefined
    try {
      await api.updateUser(id, values)
      setOpen(true)
      setCreatedSuccess(true)
    } catch (err) {
      setOpen(true)
      setCreatedSuccess(false)
      console.log(err)
    }
  }
  const handleClose = () => {
    setOpen(false)
    // should we logout the user after updating profile?
    history.push('./travelers')
  }

  return (
    <div>
      <UpdateUserForm
        handleSubmit={handleSubmit}
      />
      <Dialog open={open}>
        <DialogTitle>Updating Admin...</DialogTitle>
        <DialogContent>
          {createdSuccess ? (
            <h4>Admin Updated successfully!</h4>
          ) : (
            <h4>There was a problem trying to update admin</h4>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            color="primary"
            onClick={handleClose}
          >
              OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
