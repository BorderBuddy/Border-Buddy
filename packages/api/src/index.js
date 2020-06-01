import { emoji } from 'node-emoji'
import httpsRedirect from 'express-https-redirect'
import app from './server'
import helmet from 'helmet'
import db from './database'

const port = process.env.PORT || 3000

app.use(httpsRedirect())
app.use(helmet())

db.authenticate().then(() => {
  app.listen(port, () => {
    console.log(`${emoji.ear} listening on ${port} ${emoji.ear}`)
  })
})
  .catch(err => console.error(err))
