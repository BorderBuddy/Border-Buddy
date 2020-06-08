import React from 'react';
import { connect } from 'react-redux';
import Success from '../components/Success';

const mapState = ({ signUpTraveler }) => ({ signUpTraveler });

export default connect(mapState, null)(Success);
