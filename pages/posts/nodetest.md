---
title: node
date: 2021-08-20 20:34:23
categories: 笔记
tags: 
     - node.js
---

node应该算是全栈的敲门砖吧,在往全栈的大路上又前进了一步........

复习下基础语法吧,写了忘,忘了写,总会记住的....

<!-- more -->

# node

> node是js在服务器端的运行环境
>
> node不能调用浏览器的Dom,Bom元素
>
> node可以导入核心模块,自定义模块,第三方模块

```js
#导入方法
const fs = require('fs')

#导入自定义模块
const calc = require('./calc.js')
#需在被导入的模块中添加暴露方法
modules.exprots = { calc }

#导入第三方模块 
const express = require('express')
```

<!--more-->

## npm

```powershell
#npm环境配置 (文件夹名称不能是中文或者特殊字符)
npm init --yes

#npm环境配置 (文件夹名称不限制,可手动更改)
npm init 

#下载第三方包
npm install dayjs //本地路径下载
npm install -g nrm //全局下载

```

## express

express是一个简洁,灵活的node.js的web应用开发框架,本身由一个路由和无数个中间件组成

```js
#开启一个服务器的三条代码
const express = require('express')
const server = express()
server.listen(8001,()=>{})

#路由
server.get('/login',(req,res)=>{
     res.send('这是登录页面') //express集成了请求头,会自动识别
})

#中间件使用方法
const isok = function(req,res,next){ 
//前端发起请求到后端时,后端指向中间件,由中间件先对请求进行处理,处理完成后,若有其他的中间件,则会指向下一个,没有则指向后端处理
		next()
}
```

**托管**

在express中,内置了一个托管静态页面的功能,如下;

```js
#导包
const express = require('express')
const server = express()

#开启托管
server.use('/',	express.static('文件夹名')) //前缀可选填,托管文件夹必须要与当前文件同级

#监听
server.listen(8001,()=>{
    console.log('端口已开启')
 })
```

由于项目开发过程中,接口也会配置的越来越多,所以传统的路由写法无法满足代码的优化,整洁,所以采用express所提供的路由中间件,将路由配置与路由调用分开

**路由配置**

```js
#导包
const express = require('express')
//这个就是自带的路由方法
const Router = express.Router()

//之后所有的配置就在router上
Router.get('/login',(req,res)=>{
     res.send('这是登录页面')
})
Router.post('/index',(req,res)=>{
     res.send('这是首页')
})
#暴露路由函数
module.exports = Router
```

**路由调用**

```js
#导包
const express = require('express')
const Router = require('./路由配置文件名')
const server =express()

#调用
server.use('/',Router)  //指定前缀,可填

#监听
server.listen(8001,()=>{
    console.log('端口已开启')
 })
```

## CORS

开发中由于前后端分离,数据获取并非同源,所以跨域问题非常常见

而在express框架中,跨域的解决过于冗长,灵活性也不太够,所以借用cors包来解决跨域问题是极为方便的方式

```js
#导包
const express = require('express')
const cors = require('cors')
const server = express()

#开启跨域
server.use(cors())
```

