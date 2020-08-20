import React from 'react'
import {Dialog, Button, DialogActions} from '@material-ui/core'

export interface SendTextModalProps {
  handleClose: () => void
  open: boolean
  success: boolean
}

export const SendTextModal = ({ open, success, handleClose }: SendTextModalProps) => (
  <div>
    <Dialog
      title="Texting Traveler..."
      open={open}
    >
      {
        success
          ? <h4>Your text has been sent successfully.</h4>
          : <h4>There was a problem trying to send your text</h4>
      }
      <DialogActions>
        <Button onClick={handleClose} color='primary'> OK </Button>
      </DialogActions>
    </Dialog>
  </div>
)
