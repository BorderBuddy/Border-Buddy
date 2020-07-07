import { store } from '../index'

// thunk action creators
import { fetchAllTravelers } from '../actions/travelers'
import { fetchSelectedTraveler } from '../actions/selectedTraveler'


// sync action creators
import { clearSignUpTraveler } from '../actions/signUp'

export const onTravelersListEnter = () => {
  store.dispatch(fetchAllTravelers())
}

export const onSingleTravelerEnter = ({ match: {params} }) => {
  store.dispatch(fetchSelectedTraveler(params.id))
}

export const onSuccessLeave = () => {
  store.dispatch(clearSignUpTraveler())
}
