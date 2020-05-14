const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()

const router = new Router()

router.get('/api/data', async (ctx) => {
  ctx.body = 'this is target data'
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3002, () => {
  console.log('target server listen on 3002')
})
