import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { client, redirectUrl, randomString } from './config.js'

const app = new Koa()

app.use(bodyParser())

const router = new Router()

router.get('/login', async (ctx) => {
  // Get login URL
  const loginUrl = await client.oauth.createLoginUrl({
    redirectUrl: redirectUrl,
    grantType: 'authorization_code',
    state: randomString(10),
  })
  // Automatically redirect to login URL
  ctx.redirect(loginUrl)
})

router.get('/redirectUrl', async (ctx) => {
  const { code, region } = ctx.request.query
  console.log(code, region)
  const res = await client.oauth.getToken({
    region,
    redirectUrl,
    code,
  })
  // You can write your own business here
  ctx.body = res
})

app.use(router.routes())

app.listen(8000)

console.info('Server is running at http://127.0.0.1:8000/')
console.info('Login URL: http://127.0.0.1:8000/login')
