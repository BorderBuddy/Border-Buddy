import { store } from '../index'
import { browserHistory } from 'react-router'

// thunk action creators
import { fetchAllTravelers } from '../actions/travelers'
import { fetchSelectedTraveler } from '../actions/selectedTraveler'
import { checkToken, whoAmI } from '../actions/auth'
import { fetchAllUsers } from '../actions/users'

// sync action creators
import { clearSignUpTraveler } from '../actions/signUp'

export const onAdminEnter = () => {
  store.dispatch(checkToken())
    .then(() => {
      if (!window.localStorage.accessToken) {
        browserHistory.push('/login')
      } else {
        store.dispatch(fetchAllUsers())
      }
    })
    .catch(err => {
      console.error('Cookie Expired', err)
      browserHistory.push('/login')
    })
}

export const onTravelersListEnter = () => {
  store.dispatch(fetchAllTravelers())
}

export const onSingleTravelerEnter = ({ params }) => {
  store.dispatch(fetchSelectedTraveler(params.id))
}

export const onSuccessEnter = () => {
  const { signUpTraveler } = store.getState()
  if (!signUpTraveler) {
    browserHistory.push('/')
  }
}

export const onSuccessLeave = () => {
  store.dispatch(clearSignUpTraveler())
}
