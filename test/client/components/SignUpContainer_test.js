import React from 'react';
import SignUpContainer from '../../../client/containers/SignUpContainer';
import {shallow} from "enzyme";
import SignUpConfirmation from "../../../client/components/SignUpConfirmation";


describe('Component: SignUpContainer', () => {
  let form;
  let createTravelerSpy;

  describe('handleSubmit', () => {
    beforeEach(() => {
      form = {
        signUp: {
          values: {foo: 'bar'}
        }
      };

      createTravelerSpy = sinon.spy();
    });

    describe('render', () => {
      it('has a SignUpConfirmation', () => {
        const component = shallow(<SignUpContainer />);

        expect(component.find(SignUpConfirmation).length).to.equal(1);
      });
    });

    describe('children', () => {
      it('passes open prop to SignUpConfirmation', () => {
        const component = shallow(<SignUpContainer />);

        component.setState({open: true});

        expect(component.find(SignUpConfirmation).prop('open')).to.equal(true);
      });

      it('passes handleClose prop to SignUpConfirmation', () => {
        const component = shallow(<SignUpContainer />);

        expect(component.find(SignUpConfirmation).prop('handleClose')).to.equal(component.instance().handleClose);
      });
    });

    it('calls createTraveler', () => {
      const component = shallow(<SignUpContainer form={form} createTraveler={createTravelerSpy}/>);

      const event = {
        preventDefault: sinon.stub().returns({})
      };

      component.instance().handleSubmit(event);

      expect(createTravelerSpy).to.have.been.calledWith({foo: 'bar'});
    });

    it('sets open state to true', () => {
      const event = {
        preventDefault: sinon.stub().returns({})
      };

      const component = shallow(<SignUpContainer form={form} createTraveler={createTravelerSpy} />);

      expect(component.state('open')).to.equal(false);

      component.instance().handleSubmit(event);

      expect(component.state('open')).to.equal(true);
    });
  });
});
