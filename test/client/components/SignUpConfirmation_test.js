import React from 'react';
import {shallow} from 'enzyme';
import SignUpConfirmation from '../../../client/components/SignUpConfirmation';
import FlightConfirmation from '../../../client/components/FlightConfirmation';

import '../../unit_helpers';

describe('Component: SignUpConfirmation', () => {
  let confirmSubmitSpy;
  let defaultProps;

  beforeEach(() => {
    confirmSubmitSpy = sinon.spy();

    defaultProps = {
      open: true,
      confirmSubmit: confirmSubmitSpy,
      flight: {}
    }
  });

  describe('render', () => {
    it('has a dialog', () => {
      const component = shallow(<SignUpConfirmation {...defaultProps} />);

      expect(component.find('Dialog').length).to.equal(1);
    });
  });

  it('passes through the "open" prop to the Dialog', () => {
    const component = shallow(<SignUpConfirmation {...defaultProps} />);

    expect(component.find('Dialog').prop('open')).to.equal(true);
  });

  it('binds handleClose method to Dialog action button', () => {
    const component = shallow(<SignUpConfirmation {...defaultProps}/>);

    let actionButton = component.find('Dialog').prop('actions')[0];

    expect(actionButton.props.onTouchTap).to.equal(confirmSubmitSpy);
  });

  describe('when flight info is passed as prop', () => {
    it('shows FlightConfirmation in the Dialog', () => {
      const component = shallow(<SignUpConfirmation {...defaultProps} flight={{ some: 'flight' }}/>);

      expect(component.find(FlightConfirmation).length).to.equal(1);
    });

    it('passes flight prop to FlightConfirmation', () => {
      const component = shallow(<SignUpConfirmation {...defaultProps} flight={{some: 'flight'}}/>);

      expect(component.find(FlightConfirmation).prop('flight')).to.containSubset({some: 'flight'});
    });
  });

  describe('when flight info is not passed as prop', () => {
    it('does not show FlightConfirmation', () => {
      const component = shallow(<SignUpConfirmation {...defaultProps} flight={{}}/>);

      expect(component.find(FlightConfirmation).length).to.equal(0);
    });
  });
});
