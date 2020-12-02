import { config } from '../config'
import { Traveler } from '../database/models/travelers'
import { User } from '../database/models/user'
import { isEmpty } from 'lodash'
import Promise from 'bluebird'

export const Twilio = require('twilio')(config.twilio.accountSid, config.twilio.authToken)

// admin hits this api to send text to users
export const sendText = (req, res, next) => {
  if (isEmpty(req.body)) {
    return res.status(404).end()
  }

  Twilio.messages
    .create({
      to: req.body.to,
      from: config.twilio.adminPhone,
      body: req.body.message,
    }, (err, result) => {
      if (err) console.error(err)
      return res.status(200).json(result)
    })
}

// webhook from twilio will hit this route
export const respondToText = (req, res, next) => {
  const msgBody = req.body.Body
  const travelerPhone = req.body.From.slice(2, req.body.From.length) // remove +1

  if (req.body.AccountSid !== config.twilio.accountSid) {
    return res.status(403).end()
  }

  // TODO: handle 'sos' responses
  if (msgBody.toLowerCase() !== 'ok') {
    return res.status(400).end()
  }

  Traveler.findOne({
    where: {
      phone: travelerPhone,
      status: 'at risk' || 'transit' || 'unconfirmed' || 'detained',
    },
  })
    .then(traveler => {
      if (!traveler) {
        return res.status(404).end()
      }
      traveler.status = 'cleared'
      return traveler.save()
    })
    .then(traveler => {
      const xml = `
		<?xml version="1.0" encoding="UTF-8"?>
		<Response>
		    <Message>Welcome home, ${traveler.name}! You have been marked as cleared. Thanks for using BorderBuddy.</Message>
		</Response>`
      res.status(200).send(xml)
    })
    .catch(next)
}

// sends a text to all admin users when traveler signs up
export const notifyAdminOfNewTravelerSignUp = (traveler) => {
  return User.findAll()
    .then((adminUsers) => {
      return Promise.each(adminUsers, user => {
        Twilio.messages
          .create({
            to: user.phone,
            from: config.twilio.adminPhone,
            body: `New Traveler: ${traveler.name} has just registered on Border Buddy.` +
      'Check https://border-buddy.com/admin for more details.',
          }, (err, result) => {
            if (err) console.error(err)
            return { result, traveler }
          })
      })
        .then((ok) => {
          // console.log(ok)
          return traveler
        })
    })
}
