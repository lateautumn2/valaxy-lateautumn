---
title: vue
date: 2021-08-29 09:35:14
categories: 笔记
tags: 
  - vue
---

vue是一个渐进式javascript框架,更快的处理速度,更省时间的代码工程

MVVM的设计模式,通过数据驱动视图改变,通过vue内部源码操作Dom元素,达到不操作Dom,只改变数据,来达到页面变化

----08.29  am

<!-- more -->

## vue环境配置

> 工程化开发方式(webpack环境下)
>
> @vue/cli是vue官方提供的一个全局模块包
>
> vue create vuecli-demo 创建一个vue项目

```
//定位至创建的文件夹
cd vuecli-demo
//开启项目服务器
npm run serve
```

### @vue/cli 脚手架目录

```
 vuecil-demo        # 项目目录
    ├── node_modules # 项目依赖的第三方包
    ├── public       # 静态文件目录
      ├── favicon.ico# 浏览器小图标
      └── index.html # 单页面的html文件(网页浏览的是它)
    ├── src          # 业务文件夹
      ├── assets     # 静态资源
        └── logo.png # vue的logo图片
      ├── components # 组件目录
        └── HelloWorld.vue # 欢迎页面vue代码文件 
      ├── App.vue    # 整个应用的根组件
      └── main.js    # 入口js文件
    ├── .gitignore   # git提交忽略配置
    ├── babel.config.js  # babel配置
    ├── package.json  # 依赖包列表
    ├── README.md    # 项目说明
	└── yarn.lock    # 项目包版本锁定和缓存地址
```

#### 主要文件及功能

```javascript
node_modules       //下载的第三方包
public/index.html  //浏览器运行的网页
src/main.js        //webpack打包的入口文件
src/App.vue        //vue项目入口页面
package.json       //依赖包列表文件
```

若要在脚手架中配置自定义配置,则需在src同级目录下添加vue.config.js文件,基础配置如下;

```js
module.exports = {
lintOnSave:false,  //关闭代码检查工具=>eslint组件
devServer:{
  open: true,  //设置自动打开浏览器
  port:3000   //设置默认打开端口号
}
}
```

####  vue基础语法

```html
<template>
  <div>    //template文件中只能有一个根文件
  </div>

</template>

<script>
export default {
data () {
  return {
      //默认方法,用于定义template中使用的变量
  }
},
method:{
      //用于定义template中使用的函数
    }
}
</script>

<style>

</style>
```

#### vue基础指令

1. v-bind

   * 语法:`v-bind:属性名="vue变量"`

   * 简写: `:属性名="变量名"`

     > 将原生元素属性转化成vue属性,得以使用vue方法
     
     ```vue
     <template>
     <div>
         <a v-bind:url='vue'>hello,vue->这是基础写法</a>  
         <a :url='vue'>hello,vue->这是省略写法</a>  
     </div>
     </template>
     
     <script>
     export default {
     data(){
         return{
             vue:'https://cn.vuejs.org/'
         }
     }
     }
     </script>
     
     </style><style>
     ```

2. v-on
   * 语法
     * v-on:事件名="要执行的==少量代码=="
     * v-on:事件名="methods中的函数"
     * v-on:事件名="methods中的函数(实参)" 
     
   * 简写
   
     * @事件名="methods中的函数"
     
     ```vue
     <p>你要买商品的数量: {{count}}</p>
     <button v-on:click="count = count + 1">增加1</button>
     <button @click="addFn">增加1个</button>
     <button @click="addCountFn(5)">一次加5件</button>
      <a @click="one" href="http://www.baidu.com">阻止百度</a>
      <a @click="two(10, $event)" href="http://www.baidu.com">阻止去百度</a>
     <script>
         export default {
             // ...其他省略
             methods: {
                 addFn(){ // this代表export default后面的组件对象(下属有data里return出来的属性)
                     this.count++
                 },
                 addCountFn(num){
                     this.count += num
                 },
                 subFn(){
                     this.count--
                 }
                  one(e){
                      e.preventDefault()  //这是事件对象的两种使用方法
                 },
                  two(num, e){
                      e.preventDefault()  //这是事件对象的两种使用方法
                 }
             }
         }
     </script>
     ```
   
3. v-on修饰符
   * 语法:
     * @事件名.修饰符="methods里函数"
       * .stop - 阻止事件冒泡
       * .prevent - 阻止默认行为
       * .once - 程序运行期间, 只触发一次事件处理函数
   
       ```vue
       <template>
         <div @click="fatherFn">
           <!-- vue对事件进行了修饰符设置, 在事件后面.修饰符名即可使用更多的功能,支持链式编程-->
           <button @click.stop="btn">.stop阻止事件冒泡</button>
           <a href="http://www.baidu.com" @click.prevent="btn">.prevent阻止默认行为</a>
           <button @click.once="btn">.once程序运行期间, 只触发一次事件处理函数</button>
         </div>
       </template>
       
       <script>
       export default {
         methods: {
           fatherFn(){
             console.log("father被触发");
           },
           btn(){
             console.log(1);
           }
         }
       }
       </script>
       ```
   
4. v-on按键修饰符
   * 语法:
     * @keyup.enter  -  监测回车按键
     * @keyup.esc     -   监测返回按键
   
     ```vue
     <template>
       <div>
         <input type="text" @keydown.enter="enterFn">
         <hr>
         <input type="text" @keydown.esc="escFn">
       </div>
     </template>
     
     <script>
     export default {
      methods: {
        enterFn(){
          console.log("enter回车按键了");
        },
        escFn(){
          console.log("esc按键了");
        }
      }
     }
     </script>
     ```
   
5. v-model
   * 语法: v-model="vue数据变量"
   
   * 双向数据绑定
     * 数据变化 -> 视图自动同步
  * 视图变化 -> 数据自动同步
     * .number   以parseFloat转成数字类型
     * .trim          去除首尾空白字符
     * .lazy           在change时触发而非inupt时
     
     ```vue
     <template>
       <div>
         <!-- v-model:是实现vuejs变量和表单标签value属性, 双向绑定的指令 -->
         <div>
           <span>用户名:</span>
           <input type="text" v-model.trim="username" />
         </div>
         <div>
           <span>密码:</span>
           <input type="password" v-model="pass" />
         </div>
         <div>
           <span>年龄:</span>
           <input type="text" v-model.number="age">
         </div>
         <div>
           <span>来自于: </span>
           <!-- 下拉菜单要绑定在select上 -->
           <select v-model="from">
             <option value="北京市">北京</option>
             <option value="南京市">南京</option>
             <option value="天津市">天津</option>
           </select>
         </div>
         <div>
           <!-- (重要)
           遇到复选框, v-model的变量值
           非数组 - 关联的是复选框的checked属性
           数组   - 关联的是复选框的value属性
            -->
           <span>爱好: </span>
           <input type="checkbox" v-model="hobby" value="抽烟">抽烟
           <input type="checkbox" v-model="hobby" value="喝酒">喝酒
           <input type="checkbox" v-model="hobby" value="写代码">写代码
         </div>
         <div>
           <span>性别: </span>
           <input type="radio" value="男" name="sex" v-model="gender">男
           <input type="radio" value="女" name="sex" v-model="gender">女
         </div>
         <div>
           <span>自我介绍</span>
           <textarea v-model.lazy="intro"></textarea>
         </div>
       </div>
     </template>
     
     <script>
     export default {
       data() {
         return {
           username: "",
           pass: "",
           from: "",
           hobby: [], 
           sex: "",
           intro: "",
         };
         // 总结:
         // 特别注意: v-model, 在input[checkbox]的多选框状态
         // 变量为非数组, 则绑定的是checked的属性(true/false) - 常用于: 单个绑定使用
         // 变量为数组, 则绑定的是他们的value属性里的值 - 常用于: 收集勾选了哪些值
       }
     };
     </script>
     ```

6. v-text和v-html
   * 语法:
     * v-text="vue数据变量"    
     * v-html="vue数据变量"
   
     ```vue
     <template>
       <div>
         <p v-text="str"></p>
         <p v-html="str"></p>
       </div>
     </template>
     
     <script>
     export default {
       data() {
         return {
           str: "<span>我是一个span标签</span>"
         }
       }
     }
     </script>
     ```
   
7. v-show和v-if 

   * 语法:
     * v-show="vue变量"            
     * v-if="vue变量" 
     
   * 原理
     * v-show 用的display:none隐藏   (频繁切换使用)
     * v-if  直接从DOM树上移除
     
   * 高级
     
     * v-else使用
     
     ```vue
     <template>
       <div>
         <h1 v-show="isOk">v-show的盒子</h1>
         <h1 v-if="isOk">v-if的盒子</h1>
     
         <div>
           <p v-if="age > 18">我成年了</p>
           <p v-else>还得多吃饭</p>
         </div>
       </div>
     </template>
     
     <script>
     export default {
       data() {
         return {
           isOk: true,
           age: 15
         }
       }
     }
     </script>
     ```

8. v-for
   * 语法
     * v-for="(值, 索引) in 目标结构"
     * v-for="值 in 目标结构"
     
     ```vue
     <template>
       <div id="app">
         <div id="app">
           <!-- v-for 把一组数据, 渲染成一组DOM -->
           <!-- 口诀: 让谁循环生成, v-for就写谁身上 -->
           <!-- v-for的临时变量名不能用到v-for范围外 -->     
           <p>学生姓名</p>
           <ul>
             <li v-for="(item, index) in arr" :key="item">
               {{ index }} - {{ item }}
             </li>
           </ul>
           <p>学生详细信息</p>
           <ul>
             <li v-for="obj in stuArr" :key="obj.id">
               <span>{{ obj.name }}</span>
               <span>{{ obj.sex }}</span>
               <span>{{ obj.hobby }}</span>
             </li>
           </ul>
           <!-- v-for遍历对象(了解) -->
           <p>老师信息</p>
           <div v-for="(value, key) in tObj" :key="value">
             {{ key }} -- {{ value }}
           </div>
           <!-- v-for遍历整数(了解) - 从1开始 -->
           <p>序号</p>
           <div v-for="i in count" :key="i">{{ i }}</div>
         </div>
       </div>
     </template>
     
     <script>
     export default {
       data() {
         return {
           arr: ["小明", "小欢欢", "大黄"],
           stuArr: [
             {
               id: 1001,
               name: "孙悟空",
               sex: "男",
               hobby: "吃桃子",
             },
             {
               id: 1002,
               name: "猪八戒",
               sex: "男",
               hobby: "背媳妇",
             },
           ],
           tObj: {
             name: "小黑",
             age: 18,
             class: "1期",
           },
           count: 10,
         };
       },
     };
     </script>
     ```
     
     