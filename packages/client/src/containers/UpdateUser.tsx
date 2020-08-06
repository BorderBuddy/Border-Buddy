import React, { useContext, useState } from 'react'
import { connect } from 'react-redux'
import {UpdateUserForm} from '../components/Admin/UpdateUserForm'
import api from '../api/api'
import {
  Dialog,
  Button,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@material-ui/core'
import UserContext from '../userContext'

const UpdateUser = (props: any) => {
  // TODO: get userId of active user, from UserContext
  const userId = useContext(UserContext)
  // const userId = 0
  const [open, setOpen] = useState(false)
  const [createdSuccess, setCreatedSuccess] = useState(false)

  const handleSubmit = async (values: any) => {
    // const {email, oldPassword, newPassword, phone} = values
    try {
      await api.updateUser(userId, values)
      setOpen(true)
      setCreatedSuccess(true)
      // props.setAuth(res.data)
    } catch (err) {
      setOpen(true)
      setCreatedSuccess(false)
      console.log(err)
    }
  }
  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <UpdateUserForm
        handleSubmit={handleSubmit}
      />
      {/* <Dialog open={open} modal={true}>
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
      </Dialog> */}
    </div>
  )
}

const mapStateToProps = ({ auth }: any) => ({ auth })

// const mapDispatchToProps = (dispatch: any) => ({
//   updateUser: (user) => dispatch(updateUser(user)),
// })
// export default connect(mapStateToProps, mapDispatchToProps)(UpdateUserContainer)
export default connect(mapStateToProps)(UpdateUser)
