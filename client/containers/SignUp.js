import React from 'react';
import { Field, reduxForm } from 'redux-form';

const SignUp = ({ handleSubmit, pristine, reset, submitting }) => (
  <form onSubmit={handleSubmit}>
    <fieldset>
      <legend>Sign Up for Border Budddy</legend>
      <div>
        <label>First Name</label>
        <div>
          <Field
            name="firstName"
            component="input"
            type="text"
            placeholder="First Name"
          />
        </div>
      </div>
      <div>
        <label>Last Name</label>
        <div>
          <Field
            name="lastName"
            component="input"
            type="text"
            placeholder="Last Name"
          />
        </div>
      </div>
      <div>
        <label>Email</label>
        <div>
          <Field
            name="email"
            component="input"
            type="email"
            placeholder="Email"
          />
        </div>
      </div>
      <div>
        <label>Phone Number</label>
        <div>
          <Field
            name="phoneNumber"
            component="input"
            type="tel"
            placeholder="Phone Number"
          />
        </div>
      </div>
      <div>
        <label>Nationality</label>
        <div>
          <Field
            name="nationality"
            component="input"
            type="text"
            placeholder="Nationality"
          />
        </div>
      </div>
      <div>
        <label>Flight Number</label>
        <div>
          <Field
            name="flightNumber"
            component="input"
            type="text"
            placeholder="Fight Number"
          />
        </div>
      </div>
      <div>
        <button
          type="submit"
          disabled={pristine || submitting}>
          Submit
        </button>
        <button
          type="button"
          disabled={pristine || submitting}
          onClick={reset}>
          Clear Values
        </button>
      </div>
    </fieldset>
  </form>
);

export default reduxForm({
  form: 'signUp'  // a unique identifier for this form
})(SignUp)
