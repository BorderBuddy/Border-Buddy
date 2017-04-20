// import Nightmare from 'nightmare';
// import {expect} from 'chai';
// import {cleanDatabase, rootURL} from './feature_helpers';
// import {Traveler} from '../../database/models/travelers';

// require('./nightmare_helpers');

// describe('BorderBuddy admin dashboard', () => {

//   beforeEach(() => {
//     cleanDatabase();
//     return Traveler.create({
//       name: 'traveler-name',
//       nationality: 'traveler-nationality',
//       email: 'traveler@email.com',
//       phone: 1234567890,
//       connectivity: true,
//       secondaryContactPhone: 5555555555,
//       secondaryContactName: "secondary-contact-name",
//       secondaryContactRelation: "secondary-contact-relation",
//       requireInterpreter: false,
//       preferredLanguage: 'preferred-language',
//       status: 'transit'
//     });
//   });

//   it('allows an admin to assign a representative to a traveler', () => {
//     const nightmare = new Nightmare({
//       show: true,
//       waitTimeout: 5000,
//       gotoTimeout: 5000,
//       typeInterval: 20,
//       openDevTools: {
//         mode: "detach"
//       }
//     })
//       .viewport(1280, 1024);

//     return nightmare.goto(rootURL('/admin'))
//       .type('input[name="email"]', 'admin@borderbuddy.us')
//       .type('input[name="password"]', '12345678')
//       .clickOnElementContaining('button', 'Login')
//       .wait('.all-travelers tr')
//       .mouseDownUpOnElementContaining('tr', 'traveler-name')
//       .wait('.traveler-assign-to')
//       .mouseDownUpOnElement('.traveler-assign-to button')
//       .wait('.traveler-assign-to-option')
//       .mouseDownUpOnElementContaining('.traveler-assign-to-option div', 'ADM')
//       .wait(500)
//       .clickOnElementContaining('.submit-save-changes button', 'Save Changes')
//       .wait('#dismiss-confirmation')
//       .mouseDownUpOnElementContaining('#dismiss-confirmation', 'OK')
//       .goto(rootURL('/admin/travelers'))
//       .wait('.all-travelers tr')
//       .mouseDownUpOnElementContaining('tr', 'traveler-name')
//       .wait(500)
//       .evaluate(() => {
//         return document.querySelector('#root').innerHTML;
//       })
//       .end()
//       .then((result) => {
//         expect(result).to.contain('ADM');
//       })
//   });
// });
