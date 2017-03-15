import Nightmare from 'nightmare';
import { expect } from 'chai';
import { cleanDatabase } from './feature_helpers';

require('./nightmare_helpers');

describe('BorderBuddy', () => {

  beforeEach(cleanDatabase);

  it('allows a user to register as a traveler', () => {
    const nightmare = new Nightmare({
      show: true,
      waitTimeout: 5000,
      gotoTimeout: 5000,
      typeInterval: 20
    })
      .viewport(1280, 1024);

    return nightmare.goto('http://localhost:3000')
      .wait('#homepage')
      .clickOnElementContaining('a', 'Register')
      .type('input[name="name"]', 'Jane Citizen')
      .type('input[name="nationality"]', 'Iranian')
      .type('input[name="email"]', 'jane@example.com')
      .type('input[name="phone"]', '5554567890')
      .mouseDownUpOnElement('.traveler-connectivity button')
      .wait('.traveler-has-phone-option')
      .mouseDownUpOnElement('.traveler-has-phone-option div')
      .wait(500)
      .mouseDownUpOnElement('input[name="arrivalTime"]')
      .wait(500)
      .mouseDownUpOnElementContaining('button', 'Ok')
      .wait(1000)
      .type('input[name="airlineCode"]', 'UA')
      .type('input[name="flightNum"]', '88')
      .wait(1000)
      .clickOnElementContaining('.submit-traveler-registration button', 'Register')
      .wait('#submit-flight-confirmation')
      .mouseDownUpOnElementContaining('#submit-flight-confirmation', 'Submit')
      .wait('#success-container')
      .goto('http://localhost:3000/admin')
      .type('input[name="email"]', 'admin@borderbuddy.us')
      .type('input[name="password"]', '1234')
      .clickOnElementContaining('button', 'Login')
      .wait('.all-travelers tr')
      .evaluate(() => {
        return document.querySelector('.all-travelers').innerHTML;
      })
      .end()
      .then((result) => {
        expect(result).to.contain('Jane Citizen');
      });
  });
});
