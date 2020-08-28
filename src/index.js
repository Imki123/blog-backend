require('dotenv').config()
const Koa = require('koa')
const Router = require('koa-router')
const bodyParser = require('koa-bodyparser')
const mongoose = require('mongoose')


const api = require('./api')

const app = new Koa()
const router = new Router()

// 라우터 설정
router.use('/api', api.routes()) //api 경로에 라우트 적용

// 라우터 적용 전에 bodyParser 적용
app.use(bodyParser())

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods())

//루트경로에 라우트 적용
router.get('/', ctx =>{
    ctx.body = 'Hello! \nhttp://localhost:4000/api/posts'
})

const {PORT, MONGO_URI} = process.env //.env의 PORT

mongoose.connect(MONGO_URI, {useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false})
.then(() => {
    console.log('Connected to MongoDB')
})
.catch(e => {
    console.errog(e)
})
const port = PORT || 4000
app.listen(port, () =>{
    console.log(`Listening to port ${port}`)
    console.log(`http://localhost:${port}`)
})