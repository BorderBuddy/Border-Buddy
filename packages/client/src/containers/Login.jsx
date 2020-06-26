import React, { Component } from "react"
import { connect } from "react-redux"
import Login from "../components/Admin/Login"
import { login, checkToken} from "../actions/auth"

class LoginContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      email: "",
      password: "",
    }
    this.handleEmailChange = this.handleEmailChange.bind(this)
    this.handlePasswordChange = this.handlePasswordChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value })
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value })
  }

  async handleSubmit(e) {
    const { email, password } = this.state
    e.preventDefault()
    this.props.login(email, password)
  }

  render() {
    return (
      <div>
        <Login
          handleEmailChange={this.handleEmailChange}
          handlePasswordChange={this.handlePasswordChange}
          handleSubmit={this.handleSubmit}
          auth={this.props.auth}
        />
      </div>
    )
  }
}

const mapStateToProps = ({ auth }) => ({
  auth,
})

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(login(email, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
