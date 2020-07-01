import React from 'react'
import { shallow } from 'enzyme'
import { AddTravelerContainer } from '../../src/containers/AddTravelerContainer'
import AddTraveler from '../../src/components/Admin/AdminAddTravelerForm'
import '../unit_helpers'

describe('Component: Admin/AddTraveler', () => {
  let createTravelerSpy
  let checkFlightSpy
  let defaultProps
  let defaultFormValues

  beforeEach(() => {
    defaultFormValues = {
      travelerForm: {
        values: {
          foo: 'bar',
          countryCode: 'United States - +1' // imperfect solution, but until we do a full rewrite of the form, this'll have to do.
        }
      }
    }

    defaultProps = {
      form: defaultFormValues,
      flight: {}
    }

    createTravelerSpy = sinon.spy()
    checkFlightSpy = sinon.stub().returns(new Promise((res, rej) => res('resolved')))
  })

  describe('render', () => {
    it('has a AddTraveler component', () => {
      const component = shallow(<AddTravelerContainer {...defaultProps}/>)

      expect(component.find(AddTraveler).length).to.equal(1)
    })
  })

  describe('handleSubmit', () => {
    let defaultPropsWithActions

    beforeEach(() => {
      defaultPropsWithActions = Object.assign({}, defaultProps, {
        checkFlight: checkFlightSpy,
        createTraveler: createTravelerSpy
      })
    })

    it('calls createTraveler with addTraveler form values', () => {
      const component = shallow(<AddTravelerContainer {...defaultPropsWithActions} />)

      const event = {
        preventDefault: sinon.stub().returns({})
      }

      component.instance().handleSubmit(event)

      expect(createTravelerSpy).to.have.been.calledWith({ foo: 'bar', countryCode: '1' })
    })

    describe('when flight information is present', () => {
      let scheduledArrivalTime
      let formWithFlightInfo
      let defaultPropsWithFlightInfo

      beforeEach(() => {
        scheduledArrivalTime = new Date()

        formWithFlightInfo = {
          travelerForm: {
            values: Object.assign({}, defaultFormValues.travelerForm.values, {
              airlineCode: 'FF',
              flightNum: '123',
              scheduledArrivalTime: scheduledArrivalTime
            })
          }
        }

        defaultPropsWithFlightInfo = Object.assign({}, defaultPropsWithActions)
        defaultPropsWithFlightInfo.form = formWithFlightInfo
      })

      it('calls checkFlight', () => {
        const event = {
          preventDefault: sinon.stub().returns({})
        }
        const component = shallow(<AddTravelerContainer {...defaultPropsWithFlightInfo}/>)

        component.instance().handleSubmit(event)

        expect(checkFlightSpy).to.have.been.calledWith(
          'FF',
          '123',
          scheduledArrivalTime.getYear() + 1900,
          scheduledArrivalTime.getMonth() + 1,
          scheduledArrivalTime.getDate()
        )
      })
    })
  })
})
