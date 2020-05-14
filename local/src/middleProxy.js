const Koa = require('koa')
const proxy = require('koa-proxy')

const app = new Koa()

const port = process.argv[2]

console.log('middleProxy进程启动中>>>>>>>>>>>>>>')

app.use(
  proxy({
    host: `http://localhost:${port}`,
  })
)

app.listen(3001, () => {
  console.log(`middleProxy代理成功，端口： ${port}`)
})
