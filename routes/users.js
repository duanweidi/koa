const router = require('koa-router')()
const token = require('../utils/token')
const crypto = require('crypto')
const { query } = require('../utils/pool')
const multiparty = require('multiparty')
const path = require('path')
const fs = require('fs')
const formidable = require('formidable')
router.prefix('/users')


router.post('/userList', async (ctx, next) => {
  let data = await query(`select * from user`)
  ctx.body = {
    data,
    msg: 'success',
    status: 200
  }
}).post('/upload', async (ctx, next) => {
  console.log('上传准备')
  let r = {}
  let from = new multiparty.Form({
    uploadDir: 'public/uploadImage'
  })
  
  from.parse(ctx.req, (err, fields, files) => {
    ctx.body = 'haha'
    if (err) {
      console.log(err)
      r = {
        status: 1,
        msg: '解析失败'
      }
    } else {
      ctx.body = 'haha'
      if (files != undefined && files != {} && files.avatar != undefined) {
        if (files.avatar.length > 0) {
          let originalFilename = files.avatar[0].originalFilename
          let filePath = files.avatar[0].path
          let fileType = files.avatar[0].headers['content-type']
          console.log(files.avatar[0].headers)
          if (fileType.indexOf('image/') >= 0) {
            const _path = (path.resolve(filePath))
            const __path = path.resolve(__dirname, '../')
            fs.rename(_path, __path + '/public/uploadImage/' + originalFilename, err => {
              if (err) {
                throw err
              }
            })
            delete files._writeStream
            r = {
              status: 0,
              msg: '上传成功',
              data: originalFilename
            }
            console.log(r)
            ctx.body = r
            return false
            console.log('hahaha')
          } else {
            r = {
              status: 2,
              msg: '上传失败',
            }
            ctx.body = r
            return false
          }
        }
      } else {
        r = {
          status: 3,
          msg: '未上传文件'
        }
        ctx.body = r
        return false
      }
    }
  })
}).post('/createUser', async (ctx, next) => {
  console.log('ok')
  const {
    userName,
//    userAccount,
//    userPassword,
//    userSex,
//    userRole,
//    userMail,
//    userTel
  } = ctx.body
  console.log(userName)
  // let data = await query(`insert into user (userName,userAccount,userPassword,userSex,userRole,userMail,userTel) values (?,?,?,?,?,?,?)`,[userName,userAccount,userPassword,userSex,userRole,userMail,userTel])
  try {
    ctx.body = {
      // data,
      msg: 'success',
      status: 200
    }
  } catch (err){
    console.log(err)
  }
})

router.get('/test', function (ctx, next) {
  const tk = token({ user: 'admin', id: '1' })
  const hash = crypto.createHash('md5')
  hash.update('admin');
  let pa = hash.digest('hex')
  ctx.body = {
    tk,
    a,
    s,
    pa,
    msg: 'success'
  }
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})


module.exports = router
