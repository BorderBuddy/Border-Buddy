import React, { Component } from "react"
import { connect } from "react-redux"
import AdminSignUp from "../components/Admin/AdminSignUp"
import { signup, updateUser } from "../actions/auth"
import { Dialog, Button, DialogActions, DialogTitle, DialogContent } from "@material-ui/core"

class AdminSignUpContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
      phone: "",
      open: false,
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handlePhoneChange = this.handlePhoneChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  handlePhoneChange(e) {
    this.setState({ phone: e.target.value })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props
      .signup({
        email: this.state.email,
        password: this.state.password,
        phone: this.state.phone,
      })
      .then(() => {
        this.setState({ open: true, createdSuccess: true })
      })
      .catch(() => {
        this.setState({ open: true, createdSuccess: false })
      })
  }

  handleClose() {
    this.setState({ open: false })
  }

  render() {
    return (
      <div>
        <AdminSignUp
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
          handlePhoneChange={this.handlePhoneChange}
          handleSubmit={this.handleSubmit}
        />
        <Dialog
          open={this.state.open}
          modal={true}
        >
          <DialogTitle>Creating New Admin...</DialogTitle>
          <DialogContent>
            {this.state.createdSuccess ? (
              <h4>New admin created successfully!</h4>
            ) : (
              <h4>There was a problem trying to create a new admin</h4>
            )}
          </DialogContent>
          <DialogActions>
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleClose}
            >OK</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  signup: (user) => dispatch(signup(user)),
  updateUser: (user) => dispatch(updateUser(user)),
})

export default connect(null, mapDispatchToProps)(AdminSignUpContainer)
