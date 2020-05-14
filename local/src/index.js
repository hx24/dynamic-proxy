const Koa = require('koa')
const koaStatic = require('koa-static')
const path = require('path')
const Router = require('koa-router')
const proxy = require('koa-proxy')
const spawn = require('child_process').spawn

const app = new Koa()

const router = new Router()

app.use(koaStatic(path.resolve(__dirname, 'static')))

router.get('/data', async (ctx) => {
  ctx.body = 'success data'
})

let childProcess // 子进程
router.get('/setPort', async (ctx) => {
  if (childProcess) {
    childProcess.kill('SIGTERM')
  }
  const port = ctx.query.port
  ctx.body = `proxy set on ${port}`
  const filePath = path.resolve(__dirname, './middleProxy.js')
  childProcess = spawn('node', [filePath, port], {
    stdio: 'inherit',
  })
})

app.use(router.routes()).use(router.allowedMethods()) // 放到所有router中间件之后，自动设置响应头

app.use(
  proxy({
    host: 'http://localhost:3001',
  })
)

app.listen(3000, () => {
  console.log('listen on 3000')
})
