import { store } from '../index'
import { push } from 'react-router-redux'

// thunk action creators
import { fetchAllTravelers } from '../actions/travelers'
import { fetchSelectedTraveler } from '../actions/selectedTraveler'
import { checkToken } from '../actions/auth'
import { fetchAllUsers } from '../actions/users'

// sync action creators
import { clearSignUpTraveler } from '../actions/signUp'

export const onAdminEnter = () => {
  store.dispatch(checkToken())
    .then(() => {
      if (!window.localStorage.accessToken) {
        store.dispatch(push('/login'))
      } else {
        store.dispatch(fetchAllUsers())
        store.dispatch(push('/travelers'))
      }
    })
    .catch(err => {
      console.error('Cookie Expired', err)
      store.dispatch(push('/login'))
    })
}

export const loggedIn = async () => {
  const token = await store.dispatch(checkToken())
  try {
    if (token === 200) {
      if (!window.localStorage.accessToken) {
        return false
      } else {
        return true
      }
    }
  } catch (err) {
    console.log('Cookie Expired', err)
    return false
  }
}

export const onTravelersListEnter = () => {
  store.dispatch(fetchAllTravelers())
}

export const onSingleTravelerEnter = ({ match: {params} }) => {
  store.dispatch(fetchSelectedTraveler(params.id))
}

export const onSuccessEnter = () => {
  const { signUpTraveler } = store.getState()
  if (!signUpTraveler) {
    return false
  } else {
    return true
  }
}

export const onSuccessLeave = () => {
  store.dispatch(clearSignUpTraveler())
}
