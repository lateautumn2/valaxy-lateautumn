---
title: webpack打包优化
date: 2021-09-23
updated: 2021-09-23
categories: 笔记
tags: 
  - webapck
---

## vue项目的打包上线及优化

> 项目完成,将项目进行上线时,为了提升性能,会进行一些优化处理

#### 项目的常见优化

>项目打包之后，会将之前所使用到的部署依赖包和项目中使用到的外部资源都打包
>
>如果之前引入的包很多，或者引入的不必需的包，那么会增大项目的体积，从而造成用户访问的时候需要请求更多的数据才能正常的访问，不利于用户体验，所以需要对打包过程进行优化
>
>一般情况下我们可以从优化代码的方面对项目进行优化，也可以使用类似cdn的方式对项目进行优化
>
>脚手架中提供了一个命令，可以让我们看到项目的资源的分布(占用)情况：npm run build -- --report

![40CpTI.png](https://z3.ax1x.com/2021/09/23/40CpTI.png)

![40Cn7n.png](https://z3.ax1x.com/2021/09/23/40Cn7n.png)

``` js
1.报告页面中，越大的块说明这个模板占用的体积越大
2.占用体积越越大的模块，我们要考虑不将其打包到产品中
```

#### cdn加速优化

> cdn: CDN的本质上是将媒体资源，动静态图片（Flash），HTML，CSS，JS等等内容缓存到距离你更近的IDC，从而让用户进行共享资源，实现缩减站点间的响应时间等等需求，而网游加速器的本质则是通过建立高带宽机房，架设多节点服务器来为用户进行加速。 
>
> 我们可以将一些大体积的模块，让cdn帮我们提供相应的资源，这样就可以缓解我们自己的服务器的压力，同时提供更快更好的资源响应

##### vue.config.js

> 在脚手架项目中，如果想增加自己的项目配置，可以在根目录下添加vue.config.js文件，在这个文件中实现自定义的配置
>
> 在打包的时候，这个配置会和脚手架的配置组合到一起

#### 添加包的排除

```js
module.exports = {
    configureWebpack: {
        externals:{
            'vue': 'Vue',
            'element-ui': 'ELEMENT',
            'quill': 'Quill'
        }
    },
}
```

![40CD1O.png](https://z3.ax1x.com/2021/09/23/40CD1O.png)

通过对比可以发现,打包后的体积显著性的减少,但是此时,问题并未解决,由于缺失了必要的包,所有项目会无法运行,所有我们需要采用cdn的方式引入在线地址

#### 添加cdn

```js
let cdn = {
  css: [
    // element-ui css
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css',// 样式表
    // 富文本框插件样式
    'https://cdn.bootcdn.net/ajax/libs/quill/2.0.0-dev.4/quill.bubble.css'
  ],
  js: [
    // vue must at first!
    'https://unpkg.com/vue/dist/vue.js', // vuejs
    // element-ui js
    'https://unpkg.com/element-ui/lib/index.js', // elementUI
    // 富文本框插件
    'https://cdn.bootcdn.net/ajax/libs/quill/2.0.0-dev.4/quill.js'
  ]
}
```

##### 通过插件将资源自动的添加到页面中

###### 挂载资源到插件

```js
module.exports = {
  // 添加打包排除，说明以下配置中的包将来不会打包到项目中
  configureWebpack: {
    externals
  },
  // 将cdn的资源挂载到插件上
  chainWebpack (config) {
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}
```

###### 在页面中使用插件添加指定的cdn资源

- 添加css引入(head结构中）

```js
<% for(var css of htmlWebpackPlugin.options.cdn.css) { %>
  <link rel="stylesheet" href="<%=css%>" />
<% } %>
```

- 添加js引入(body结构中)

```js
<% for(var js of htmlWebpackPlugin.options.cdn.js) { %>
  <script src="<%=js%>"></script>
<% } %>
```

- 重新打包，OK

##### 设置只有产品阶段才使用cdn

> 在项目开发的时候，其实没有必要使用cdn,这样反而会让我们的页面加载效率下降，同时也不适合本地开发(需要连网)
>
> 我们可以根据环境变量进行相应的处理，只有在产品的时候，才让插件去自动注入相应的资源文件到html页面

```js
const isProd = process.env.NODE_ENV === 'production' // 是否生产环境

let externals = {
  'vue': 'Vue',
  'element-ui': 'ELEMENT',
  'quill': 'Quill'
}


let cdn = {
  css: [
    // element-ui css
    'https://unpkg.com/element-ui/lib/theme-chalk/index.css',// 样式表
    // 富文本框插件样式
    'https://cdn.bootcdn.net/ajax/libs/quill/2.0.0-dev.4/quill.bubble.css'
  ],
  js: [
    // vue must at first!
    'https://unpkg.com/vue/dist/vue.js', // vuejs
    // element-ui js
    'https://unpkg.com/element-ui/lib/index.js', // elementUI
    // 富文本框插件
    'https://cdn.bootcdn.net/ajax/libs/quill/2.0.0-dev.4/quill.js'
  ]
}


cdn = isProd ? cdn : { css: [], js: [] }
externals = isProd ? externals : {}


module.exports = {
  // 添加打包排除，说明以下配置中的包将来不会打包到项目中
  configureWebpack: {
    externals
  },
  // 
  chainWebpack (config) {
    config.plugin('html').tap(args => {
      args[0].cdn = cdn
      return args
    })
  }
}
```

