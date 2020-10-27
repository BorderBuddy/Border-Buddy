# Border Buddy UX Tests

## Homepage

- [ ] page renders correctly with 'login', 'register', 'about us' and 'why border buddy' buttons.
- [ ] clicking any of the buttons correctly redirects you to url
- [ ] /about renders correctly
- [ ] /why renders correctly
- [ ] /register renders correctly
- [ ] /login renders correctly
- [ ] hovering over login button shows helper text

## Login (/login)

- [ ] Admin Login Card renders properly
- [ ] unsuccessful login fails and indicates 'Login Unsuccessful...'
- [ ] successful login redirects user to /travelers and populates table

## Admin Homepage or (/travelers)

- [ ] banner now has BB logo, 'Add Traveler Button', and three vertical dot dropdown menu
- [ ] clicking BB logo redirects to /travelers
- [ ] clicking 'Add Traveler' Button redirects to /traveler/add (the register form plus admin extension)
- [ ] clicking the dropdown menu button (three vertical dots) shows four options:
  - [ ] **All Travelers**
    - [ ] selecting this redirects to /travelers
  - [ ] **Create New User**
    - [ ] selecting this redirects to /createuser
  - [ ] **Update Profile**
    - [ ] selecting this redirects to /updateprofile
  - [ ] **Sign Out**
    - [ ] selecting this redirects to / and shows logged out banner
- [ ] clicking on one of the traveler rows redirects to /travelers/:travelerId, which should be the 'Edit Traveler' form

## Register Traveler (/register)

- [ ] not filling out a required field responds with error message
- [ ] all fields behave properly, autocomplete works, selection works, etc.
- [ ] button should show the word 'Register'
- [ ] after clicking register button, the submission confirmation should show the flight from the form:
  - [ ] selecting 'Cancel' takes you back to the form.
  - [ ] selecting 'Submit' should redirect to /success upon a successful registration
- [ ] if the api can't find the flight, it should show an error message of 'flight not found' or something.

## Edit Traveler (/travelers/:travelerId)

- [ ] successful edit should show alert, 'traveler updated' and redirect to '/travelers'

## Success Message (/success)

- [ ] success message should show name and phone number from user

## Create New User (/createuser)

- [ ] form title on card should be 'Create New User'
- [ ] creating a new user should show the success dialog
- [ ] a problem with creating a new user should show the failure dialog

## Update Your User Profile (/updateprofile)

- [ ] email and phone number should populate the initial values fields
- [ ] successfully updating profile should log you out
- [ ] unsuccessfully updating profile should show error