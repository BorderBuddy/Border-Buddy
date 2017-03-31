import React from 'react';
import {shallow} from "enzyme";
import {AddTravelerContainer} from "../../../client/containers/Admin/AddTravelerContainer"
import AddTraveler from "../../../client/components/Admin/AddTraveler"
import '../../unit_helpers'

describe('Component: Admin/AddTraveler', () => {
  let createTravelerSpy;
  let checkFlightSpy;
  let defaultProps;
  let defaultFormValues;

  beforeEach(() => {
    defaultFormValues = {
      addTraveler: {
        values: {
          foo: 'bar'
        }
      }
    };

    defaultProps = {
      form: defaultFormValues,
      flight: {}
    };

    createTravelerSpy = sinon.spy();
    checkFlightSpy = sinon.spy();
  });

  describe('render', () => {
    it('has a AddTraveler component', () => {
      const component = shallow(<AddTravelerContainer {...defaultProps}/>);

      expect(component.find(AddTraveler).length).to.equal(1);
    });
  });

  describe('handleSubmit', () => {
    let defaultPropsWithActions;

    beforeEach(() => {
      defaultPropsWithActions = Object.assign({}, defaultProps, {
        checkFlight: checkFlightSpy,
        createTraveler: createTravelerSpy
      })
    });

    it('calls createTraveler with addTraveler form values', () => {
      const component = shallow(<AddTravelerContainer {...defaultPropsWithActions} />);

      const event = {
        preventDefault: sinon.stub().returns({})
      };

      component.instance().handleSubmit(event);

      expect(createTravelerSpy).to.have.been.calledWith({foo: 'bar'});
    });

    describe('when flight information is present', () => {
      let arrivalTime;
      let formWithFlightInfo;
      let defaultPropsWithFlightInfo;

      beforeEach(() => {
        arrivalTime = new Date();

        formWithFlightInfo = {
          addTraveler: {
            values: Object.assign({}, defaultFormValues.addTraveler.values, {
              airlineCode: 'FF',
              flightNum: '123',
              arrivalTime: arrivalTime
            })
          }
        };

        defaultPropsWithFlightInfo = Object.assign({}, defaultPropsWithActions);
        defaultPropsWithFlightInfo.form = formWithFlightInfo;
      });

      it('calls checkFlight', () => {
        const event = {
          preventDefault: sinon.stub().returns({})
        };

        const component = shallow(<AddTravelerContainer {...defaultPropsWithFlightInfo}/>);

        component.instance().handleSubmit(event);

        expect(checkFlightSpy).to.have.been.calledWith(
          'FF',
          '123',
          arrivalTime.getYear() + 1900,
          arrivalTime.getMonth() + 1,
          arrivalTime.getDate()
        );
      });
    })
  });
});
