const color = 'black';
export const idStyle = { width: '6vw', color };
export const nameStyle = { width: '13vw', textAlign: 'left', color };
export const countryCodeStyle = { width: '4vw', textAlign: 'left', color };
export const phoneStyle = { width: '12vw', textAlign: 'left', color };
export const emailStyle = { width: '13 vw', textAlight: 'left', color };
export const nationalityStyle = { width: '11vw', textAlign: 'left', color };
export const flightCodeStyle = { width: '6vw', textAlign: 'left', color };
export const flightNumStyle = { width: '6vw', textAlign: 'left', color };
export const arrivalTimeStyle = { width: '15vw', textAlign: 'left', color };
export const flightStatusStyle = { width: '8vw', textAlign: 'left', color };
export const travelerStatusStyle = {
  width: '8vw',
  textAlign: 'left',
  color,
  fontWeight: 'bold'
};

export const signupLoginStyle = {
  card: {
    margin: '5em auto',
    width: '50%',
    padding: '2em'
  },
  form: {
    margin: '1em auto',
    display: 'block',
    width: '75%'
  },
  button: {
    margin: '2em auto',
    display: 'block',
    width: '50%'
  },
  title: {
    textAlign: 'center'
  },
  error: {
    textAlign: 'center',
    color: 'red'
  },
  loader: {
    textAlign: 'center'
  }
};

export const setStatusColor = status => {
  switch (status) {
    case 'transit':
      return 'blue';
    case 'unconfirmed':
      return 'orange';
    case 'detained':
      return 'red';
    case 'at risk':
      return 'red';
    case 'cleared':
      return 'green';
  }
}

export const formStyle = {
  form: {
    display: 'block',
    width: '80%',
    margin: '5em auto'
  },
  input: {
    width: '80%',
    color: 'black',
    marginTop: "1em",
    marginBottom: "1em"
  },
  error: {
    color: '#bd1c11'
  },
  label: {
    color: '#526B5C'
  },
  underline: {
    color: '#526B5C'
  },
  adminButton: {
    marginBottom: '2em', 
    width: '50%'
  },
  submitButton: {
    marginBottom: '2em',
    width: '100%'
  },
  header: {
    textAlign: 'center'
  }
}
