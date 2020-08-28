const Router = require('koa-router')
const postsCtrl = require('./posts.ctrl')

const posts = new Router()

// /api/posts

posts.get('/', postsCtrl.list)
posts.post('/', postsCtrl.write) //Request Body
posts.get('/:id', postsCtrl.read)
posts.delete('/:id', postsCtrl.remove)
posts.put('/:id', postsCtrl.replace) //Request Body
posts.patch('/:id', postsCtrl.update) //Request Body

module.exports = posts