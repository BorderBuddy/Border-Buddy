import axios from 'axios';

export const required = value => value == null ? 'Required' : undefined;

export const phone = value =>
	value && !/^\d{10}$/.test(value) ?
	'Invalid phone, please enter as "5552224444"' : undefined;

export const email = value =>
  value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
  'Invalid email address' : undefined;

export const uppercase = value => value && value !== value.toUpperCase() ? 'Must be uppercase' : undefined

export const validateCode = values => {
  return axios.get(`/api/flight/code?code=${values.airlineCode}`)
  .then(response => console.log(response.data))
  .catch(() => {
		throw { airlineCode: 'Airline code not found!' };
  });
};
