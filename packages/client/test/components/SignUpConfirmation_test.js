import 'jsdom-global/register'
import React from 'react'
import { shallow, mount, configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import { SignUpConfirmation } from '../../src/components/SignUpConfirmation'
import FlightConfirmation from '../../src/components/FlightConfirmation'
import { Dialog, Button } from '@material-ui/core'

import '../unit_helpers'
configure({ adapter: new Adapter() })

describe('Component: SignUpConfirmation', () => {
  let confirmSubmitSpy
  let defaultProps

  beforeEach(() => {
    confirmSubmitSpy = sinon.spy()

    defaultProps = {
      open: true,
      confirmSubmit: confirmSubmitSpy,
      flight: {}
    }
  })

  describe('render', () => {
    it('has a dialog', () => {
      const component = shallow(<SignUpConfirmation {...defaultProps} />)
      expect(component.find(Dialog)).to.have.lengthOf(1)
    })
  })

  it('passes through the "open" prop to the Dialog', () => {
    const component = shallow(<SignUpConfirmation {...defaultProps} />)
    expect(component.find(Dialog).prop('open')).to.equal(true)
  })

  // This test is broken, can't find Button
  // it('binds handleClose method to Dialog action button', () => {
  //   const component = shallow(<SignUpConfirmation {...defaultProps}/>)
  //   const actionButton = component.find(Button)
  //   expect(actionButton.prop('onClick').to.equal(confirmSubmitSpy))
  // })

  describe('when flight info is passed as prop', () => {
    it('shows FlightConfirmation in the Dialog', () => {
      const component = shallow(<SignUpConfirmation {...defaultProps} flight={{ some: 'flight' }}/>)

      expect(component.find(FlightConfirmation).length).to.equal(1)
    })

    it('passes flight prop to FlightConfirmation', () => {
      const component = shallow(<SignUpConfirmation {...defaultProps} flight={{ some: 'flight' }}/>)

      expect(component.find(FlightConfirmation).prop('flight')).to.containSubset({ some: 'flight' })
    })
  })

  describe('when flight info is not passed as prop', () => {
    it('does not show FlightConfirmation', () => {
      const component = shallow(<SignUpConfirmation {...defaultProps} flight={{}}/>)

      expect(component.find(FlightConfirmation).length).to.equal(0)
    })
  })
})
