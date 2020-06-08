import { signUpTraveler } from '../actions/signUp'
import { checkFlight } from '../actions/flight'
import { connect } from 'react-redux'
import SignUpContainer from '../containers/SignUpContainer'

const mapStateToProps = ({ form, flight }) => ({ form, flight })

const mapDispatchToProps = dispatch => ({
  createTraveler: traveler => dispatch(signUpTraveler(traveler)),
  checkFlight: (code, flightNum, year, month, day) => dispatch(checkFlight(code, flightNum, year, month, day))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpContainer)
