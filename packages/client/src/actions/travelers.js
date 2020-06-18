// import axios from 'axios'
import { SET_ALL_TRAVELERS } from '../constants'

const dummyTravelers = [
  { id:'1231', email: '1234@abc.com', countryCode: '1', phone: '8084982097', name: 'Dirron Pewers', status: 'transit', connectivity: true, nationality: 'Syria', flightId: 1 },
  { id:'1232', email: '3456@abc.com', countryCode: '93', phone: '8084982097', name: 'Gandrew Aionfriddy', status: 'transit', connectivity: true, nationality: 'Yemen', flightId: 1 },
  { id:'1233', email: 'diap@abc.com', countryCode: '98', phone: '8084982097', name: 'Emily Whasser', status: 'transit', connectivity: true, nationality: 'Iran', flightId: 1 },
  { id:'1234', email: 'tafman@abc.com', countryCode: '964', phone: '8084982097', name: 'Taf Thaman', status: 'transit', connectivity: true, nationality: 'Iraq', flightId: 1 },
  { id:'1235', email: 'ianb@abc.com', countryCode: '1', phone: '8084982097', name: 'Ian Munrovia', status: 'transit', connectivity: true, nationality: 'Afghanistan', flightId: 1 },
  { id:'1236', email: 'peeplesm@abc.com', countryCode: '963', phone: '8084982097', name: 'Peeples McPerson', status: 'transit', connectivity: true, nationality: 'Afghanistan', flightId: 1 },
  { id:'1237', email: 'tatiiii@abc.com', countryCode: '93', phone: '8084982097', name: 'Tatiana Alex', status: 'transit', connectivity: true, nationality: 'Yemen', flightId: 1 },
  { id:'1238', email: 'clemm@abc.com', countryCode: '92', phone: '8084982097', name: 'Wat Uwotmate', status: 'transit', connectivity: true, nationality: 'Nigeria', flightId: 1 },
  { id:'1239', email: 'anthony@abc.com', countryCode: '966', phone: '8084982097', name: 'DT Jacksern', status: 'unconfirmed', connectivity: true, nationality: 'Sudan', flightId: 1 },
  { id:'1230', email: 'melbrux@abc.com', countryCode: '1', phone: '8084982097', name: 'Fraulein Hhauserr', status: 'unconfirmed', connectivity: true, nationality: 'Sudan', flightId: 1 }
]

export const setAllTravelers = travelers => ({
  type: SET_ALL_TRAVELERS,
  travelers
})

export const fetchAllTravelers = () => dispatch => {
//   return axios
//     .get('/api/traveler', {
//       headers: {
//         Authorization: window.localStorage.accessToken
//       }
//     })
//     .then(travelers => dispatch(setAllTravelers(travelers.data)))
//     .catch(err => console.error(err.response.data))
  return dispatch(setAllTravelers(dummyTravelers))
}
