// import Nightmare from 'nightmare';
// import {expect} from 'chai';
// import {cleanDatabase, rootURL} from './feature_helpers';

// require('./nightmare_helpers');

// describe('BorderBuddy', function() {

//   this.timeout(20000); // avoids auto-fail after 15s

//   beforeEach(cleanDatabase);

//   it('allows a user to register as a traveler', () => {
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

//     return nightmare.goto(rootURL())
//       .wait('#homepage')
//       .clickOnElementContaining('a', 'Register')
//       .type('input[name="name"]', 'Jane Citizen')
//       .type('input[name="nationality"]', 'Iranian')
//       .type('input[name="email"]', 'jane@example.com')
//       .type('input[name="phone"]', '5554567890')
//       .type('input[name="countryCode"]', '1')
//       .mouseDownUpOnElement('.traveler-require-interpreter button')
//       .wait('.traveler-require-interpreter-option')
//       .mouseDownUpOnElement('.traveler-require-interpreter-option div')
//       .wait(500) // wait for traveler require interpreter select dropdown to disappear
//       .type('input[name="preferredLanguage"]', 'Chinese')
//       .mouseDownUpOnElement('.traveler-connectivity button')
//       .wait('.traveler-has-phone-option')
//       .mouseDownUpOnElement('.traveler-has-phone-option div')
//       .wait(500) // wait for traveler has smart phone select dropdown to disappear
//       .mouseDownUpOnElement('input[name="arrivalTime"]')
//       .wait(500) // wait for arrival time modal to animate in
//       .mouseDownUpOnElementContaining('button', 'Ok')
//       .type('input[name="airlineCode"]', 'UA')
//       .type('input[name="flightNum"]', '88')
//       .type('input[name="secondaryContactName"]', 'Jennifer Citizen')
//       .type('input[name="secondaryContactRelation"]', 'Mother')
//       .type('input[name="secondaryContactPhone"]', '5555678901')
//       .clickOnElementContaining('.submit-traveler-registration button', 'Register')
//       .wait('#submit-flight-confirmation')
//       .mouseDownUpOnElementContaining('#submit-flight-confirmation', 'Submit')
//       .wait('#success-container')
//       .goto(rootURL('/admin'))
//       .type('input[name="email"]', 'admin@borderbuddy.us')
//       .type('input[name="password"]', '12345678')
//       .clickOnElementContaining('button', 'Login')
//       .wait('.all-travelers tr')
//       .mouseDownUpOnElementContaining('tr', 'Jane')
//       .wait(500)
//       .evaluate(() => {
//         return document.querySelector('#root').innerHTML;
//       })
//       .end()
//       .then((result) => {
//         expect(result).to.contain('Jane Citizen');
//         expect(result).to.contain('Iranian');
//         expect(result).to.contain('jane@example.com');
//         expect(result).to.contain('5554567890');
//         expect(result).to.contain('1');
//         expect(result).to.contain('UA');
//         expect(result).to.contain('88');
//         expect(result).to.contain('Jennifer Citizen');
//         expect(result).to.contain('Mother');
//         expect(result).to.contain('5555678901');
//         expect(result).to.contain('Chinese');
//       })
//   });
// });
