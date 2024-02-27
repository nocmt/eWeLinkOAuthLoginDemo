import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'
import { client, redirectUrl, randomString } from './config.js'
import * as fs from 'fs'
import open from 'open';

const app = new Koa()

app.use(bodyParser())

const router = new Router()

router.get('/login', async (ctx) => {
  // Get login URL
  const loginUrl = client.oauth.createLoginUrl({
    redirectUrl: redirectUrl,
    grantType: 'authorization_code',
    state: randomString(10),
  })
  // Automatically redirect to Log in URL
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
  res['region'] = region
  // You can write your own business here
  fs.writeFileSync('./token.json', JSON.stringify(res))
  console.log(res)
  ctx.body = res
})

app.use(router.routes())

app.listen(8000)

console.info('Server is running at http://127.0.0.1:8000/')
console.info('Login URL: http://127.0.0.1:8000/login, automatically open browser in three seconds')

setTimeout(async () => {
  await open("http://127.0.0.1:8000/login")
}, 3000)