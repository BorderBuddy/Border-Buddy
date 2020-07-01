import React from 'react'
import { store } from '../index'

// thunk action creators
import { fetchAllTravelers } from '../actions/travelers'
import { fetchSelectedTraveler } from '../actions/selectedTraveler'
import { checkToken } from '../actions/auth'

// sync action creators
import { clearSignUpTraveler } from '../actions/signUp'

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
