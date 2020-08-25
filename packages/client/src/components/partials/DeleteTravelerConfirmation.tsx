import React from 'react'
import {Dialog, Button, DialogActions} from '@material-ui/core'

export interface DeleteTravelerConfirmationProps {
  handleClose: () => void
  confirmDelete: () => void
  open: boolean
  traveler: string
}

export const DeleteTravelerConfirmation = ({ confirmDelete, handleClose, open, traveler }: DeleteTravelerConfirmationProps) => (
  <div>
    <Dialog
      id="delete-traveler-confirmation"
      open={open}
      title='Are you sure you want to delete this traveler?'>
      {
        <h2>{traveler}</h2>
      }
      <DialogActions>
        <Button
          id="confirm-delete"
          style={style.confirm}
          onClick={confirmDelete}
        >
          Yes, delete this traveler
        </Button>
        <Button
          id="cancel-delete"
          color='primary'
          style={style.button}
          onClick={handleClose}
        >
          No, do not delete this traveler
        </Button>
      </DialogActions>
    </Dialog>
  </div>
)

const style = {
  button: {
    width: '50%',
  },
  confirm: {
    backgroundColor: '#800000',
    color: '#FFFFFF',
    width: '50%',
  },
}
