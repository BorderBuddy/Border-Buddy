import Nightmare from 'nightmare';
import {expect} from 'chai';
import {cleanDatabase} from './feature_helpers';

require('./nightmare_helpers');

describe('BorderBuddy Admin Dashboard', () => {

  beforeEach(cleanDatabase);

  it('allows an admin to add a traveler', () => {
    const nightmare = new Nightmare({
      show: true,
      waitTimeout: 5000,
      gotoTimeout: 5000,
      typeInterval: 20,
      openDevTools: {
        mode: "detach"
      }
    }).viewport(1280, 1024);

    return nightmare.goto(rootURL('/login'))
      .type('input[name="email"]', 'admin@borderbuddy.us')
      .type('input[name="password"]', '12345678')
      .clickOnElementContaining('button', 'Login')
      .wait('button#add-new-traveler')
      .clickOnElementContaining('button', 'Add Traveler')
      .type('input[name="name"]', 'Traveler 007')
      .type('input[name="phone"]', '1231231234')
      .clickOnElementContaining('.submit-traveler-registration button', 'Register')
      .wait('#success-container')
      .goto(rootURL('/admin'))
      .wait('.all-travelers tr')
      .evaluate(() => {
        return document.querySelector('.all-travelers tr').innerText
      })
      .end()
      .then((result) => {
        expect(result).to.contain('Traveler 007');
      });
  });

  function rootURL(path) {
    let pathString = path || '';
    return 'http://localhost:8080' + pathString;// + process.env.TEST_PORT + pathString;
  }
});
