import axios from 'axios'
const querystring = require('querystring')

const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY
export const verifyRecaptchaToken = async (token: string) => {
  // console.log(token)
  const isHuman = await axios.post(`https://www.google.com/recaptcha/api/siteverify`,
    querystring.stringify({
      secret: RECAPTCHA_SECRET_KEY,
      response: token,
    }),
    {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      },
    })
    .then(res => {
      console.log(res)
      return res.data
    })
    .then(data => data.success)
    .catch(err => {
      throw new Error(`Error in Google Siteverify API. ${err.message}`)
    })

  if (token === null || !isHuman) {
    return false
  } else {
    return true
  }
}
