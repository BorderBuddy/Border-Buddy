const color = 'black'
export const idStyle = { width: '6vw', color }
export const nameStyle = { width: '13vw', align: 'left', color }
export const countryCodeStyle = { width: '4vw', align: 'left', color }
export const phoneStyle = { width: '12vw', align: 'left', color }
export const emailStyle = { width: '13 vw', align: 'left', color }
export const nationalityStyle = { width: '11vw', align: 'left', color }
export const flightCodeStyle = { width: '6vw', align: 'left', color }
export const flightNumStyle = { width: '6vw', align: 'left', color }
export const arrivalTimeStyle = { width: '15vw', align: 'left', color }
export const flightStatusStyle = { width: '8vw', align: 'left', color }

export const travelerStatusStyle = {
  width: '8vw',
  align: 'left',
  color,
}

export const signupLoginStyle = {
  card: {
    margin: '5em auto',
    width: '50%',
    padding: '2em',
  },
  button: {
    backgroundColor: '#2d6ea8',
    margin: '2em auto',
    display: 'block',
    width: '50%',
  },
  error: {
    color: 'red',
  },
}

export const adminSignUp = {
  card: {
    margin: '2em auto',
    // textAlign: 'center',
    width: '80%',
    padding: '2em',
  },
  button: {
    backgroundColor: '#2d6ea8',
    margin: '2em auto',
    display: 'block',
    width: '50%',
  },
  title: {
    // textAlign: 'center',
  },
  error: {
    textAlign: 'center',
    color: 'red',
  },
  loader: {
    textAlign: 'center',
  },
  input: {
    width: '100%',
    color: 'black',
    height: '4em',
    // margin: '1em, 2em, 1em, 2em',
    // paddingTop: '1em',
  },
}

export const setStatusColor = (status: string) => {
  switch (status) {
    case 'transit':
      return 'blue'
    case 'unconfirmed':
      return 'orange'
    case 'detained':
      return 'red'
    case 'at risk':
      return 'red'
    case 'cleared':
      return 'green'
  }
}

export const formStyle = {
  form: {
    display: 'block',
    width: '80%',
  },
  input: {
    width: '100%',
    height: '4em',
  },
  textField: {
    height: '4em',
    padding: 5,
  },
  select: {
    width: '100%',
  },
  autoComplete: {
    paddingTop: '1em',
  },
  error: {
    color: '#bd1c11',
  },
  label: {
    color: '#526B5C',
  },
  underline: {
    color: '#526B5C',
  },
  adminButton: {
    marginTop: '2em',
    width: '50%',
    backgroundColor: '#2d6ea8',
  },
  submitButton: {
    marginTop: '2em',
    width: '100%',
    backgroundColor: '#2d6ea8',
  },
  header: {
    textAlign: 'center' as const,
  },
  heading: {
    marginTop: '1em',
  },
}
