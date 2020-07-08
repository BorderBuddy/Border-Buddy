import { updateTraveler, sendText, deleteTraveler } from '../src/actions/selectedTraveler'
import './unit_helpers'
import axios from 'axios'

describe('SelectedTraveler', () => {
  beforeEach(() => {
  })

  afterEach(() => {
    sinon.restore()
  })
  describe('update traveler information', () => {
    it('sends a put request to traveler api with accessToken', () => {
      const window = { localStorage: { accessToken: 'accessToken' } }

      sinon.stub(axios, 'put').callsFake((url, traveler, headers) => {
        expect(url).to.equal('/api/traveler/1')
        expect(traveler.name).to.equal('Jane Austen')
        expect(headers.headers.Authorization).to.equal('accessToken')
        return new Promise((resolve, reject) => {
        })
      })

      updateTraveler({ name: 'Jane Austen' }, 1, window)()
    })
  })

  describe('admin manually sends SMS to traveler', () => {
    it('sends a POST to twilio API with accessToken', () => {
      const window = { localStorage: { accessToken: 'accessToken' } }

      sinon.stub(axios, 'post').callsFake((url, message, headers) => {
        expect(url).to.equal('/api/twilio/send')
        expect(message.to).to.equal('+15553334444')
        expect(headers.headers.Authorization).to.equal('accessToken')
        return new Promise((resolve, reject) => {
        })
      })

      sendText({ phone: '5553334444', countryCode: '1' }, window)()
    })
  })
  describe('delete traveler information', () => {
    it('sends a delete request to traveler api with accessToken', () => {
      const window = { localStorage: { accessToken: 'accessToken' } }
      sinon.stub(axios, 'delete').callsFake((url, headers) => {
        expect(url).to.equal('/api/traveler/1')
        expect(headers.headers.Authorization).to.equal('accessToken')
        return new Promise((resolve, reject) => {
        })
      })

      deleteTraveler(1, window)()
    })
  })
})
