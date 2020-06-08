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
    // console.log(`all envs: ${JSON.stringify(process.env, null, 2)}`)
    // console.log(`process.env.npm_config_dev: ${process.env.npm_config_dev}`)
    console.log(`${emoji.ear} listening on ${port} ${emoji.ear}`)
  })
})
  .catch(err => console.error(err))
