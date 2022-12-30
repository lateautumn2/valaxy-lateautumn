---

layout: 
title: vue组件
date: 2021-09-04 20:35:59
tags: 
  - vue
---

组件化:封装的思想,把页面上可重用的部分,封装为组件,从而方便项目的开发和维护
一个页面,可以拆分成一个个组件,一个组件就是一个整体,每个组件都可以有自己独立的结构样式和行为

<!-- more -->

## 组件通信

每个组件的变量和值都是独立的,在进行值传递时,则需要用到组件通信

1.父传子

* 示例

  创建一个父文件,father.vue

  ``` vue
  <template>
    <div>
      <!-- 
        目标: 父(App.vue) -> 子(MyProduct.vue) 分别传值进入
        需求: 每次组件显示不同的数据信息
        步骤(口诀):
          1. 子组件 - props - 变量 (准备接收)
          2. 父组件 - 传值进去
       -->
      <Product title="好吃的口水鸡" price="50" intro="开业大酬宾, 全场8折"></Product>
      <Product title="好可爱的可爱多" price="20" intro="老板不在家, 全场1折"></Product>
      <Product title="好贵的北京烤鸭" price="290" :intro="str"></Product>
    </div>
  </template>
  
  <script>
  // 1. 引入子组件
  import Product from './components/MyProduct'
  export default {
    data(){
      return {
        str: "好贵啊, 快来啊, 好吃"
      }
    },
    // 3. 注册组件
    components: {
      // Product: Product // key和value变量名同名 - 简写
      Product
    }
  }
  </script>
  
  <style>
  </style>
  ```

  * 创建一个字文件MyProduct

  ``` vue
  <template>
    <div>
      <h3>标题: {{ title }}</h3>
      <p>价格: {{ price }}元</p>
      <p>{{ intro }}</p>
    </div>
  </template>
  
  <script>
  export default {
      //通过props属性定义接收的key
    props: ['title', 'price', 'intro']
  }
  </script>
  
  <style>
  </style>
  ```

  #### 单向数据流

  > 从父组件传至子组件的数据,不能被子组件所修改,遵循单向数据流的原则,子组件只有只读的属性

  

  2.子传父

  

  ``` vue
  <template>
    <div class="my-product">
      <h3>标题: {{ title }}</h3>
      <p>价格: {{ price }}元</p>
      <p>{{ intro }}</p>
      <button @click="subFn">宝刀-砍1元</button>
    </div>
  </template>
  
  <script>
  import eventBus from '../EventBus'
  export default {
    props: ['index', 'title', 'price', 'intro'],
    methods: {
      subFn(){
          //在子组件中通过this.$emit方法传值给父组件
          //第一个为父组件接收时使用的方法名,第二个为需要传递的值
        this.$emit('subprice', this.index, 1) // 子向父
        eventBus.$emit("send", this.index, 1) // 跨组件
      }
    }
  }
  </script>
  
  <style>
  </style>
  ```

  接收

  ``` vue
  template>
    <div>
      <!-- 目标: 子传父 -->
      <!-- 1. 父组件, @自定义事件名="父methods函数" -->
      <MyProduct v-for="(obj, ind) in list" :key="obj.id"
      :title="obj.proname"
      :price="obj.proprice"
      :intro="obj.info"
      :index="ind"
      @subprice="fn"  //key为子组件设置的方法名,value为函数名
      ></MyProduct>
    </div>
  </template>
  
  <script>
  
  import MyProduct from './components/MyProduct_sub'
  export default {
    data() {
      return {
      ..........
      };
    },
    components: {
      MyProduct
    },
    methods: {
        //形参接收传过来的实参
      fn(inde, price){
        // 逻辑代码
        this.list[inde].proprice > 1 && (this.list[inde].proprice = (this.list[inde].proprice - price).toFixed(2))
      }
    }
  };
  </script>
  
  <style>
  </style>
  ```

  3.子与子互传

  > 目标: 常用于跨组件通信时使用

  * 创建空白vue对象EventBus.vue-监听事件

    ```vue
    import Vue from 'vue'
    //导出空白对象
    export default new Vue()
    ```
  
  * 组件1传值
  
  ```vue
  <template>
    <div class="my-product">
      <h3>标题: {{ title }}</h3>
      <p>价格: {{ price }}元</p>
      <p>{{ intro }}</p>
      <button @click="subFn">宝刀-砍1元</button>
    </div>
  </template>
  
  <script>
      //导入空白vue对象,监听事件
  import eventBus from '../EventBus'
  export default {
    props: ['index', 'title', 'price', 'intro'],
    methods: {
      subFn(){
        this.$emit('subprice', this.index, 1) 
      }
    }
  }
  </script>
  
  <style>
  </style>
  ```
  
  * 组件2接收
  
    ```vue
    <template>
      <ul class="my-product">
        <li v-for="(item, index) in arr" :key="index">
          <span>{{ item.proname }}</span>
          <span>{{ item.proprice }}</span>
        </li>
      </ul>
    </template>
    
    <script>
    // 目标: 跨组件传值
    // 1. 引入空白vue对象(EventBus)
    // 2. 接收方 - $on监听事件
    import eventBus from "../EventBus";
    export default {
      props: ["arr"],
      // 3. 组件创建完毕, 监听send事件
      created() {
          //使用eventBus.$on接收传值
        eventBus.$on("send", (index, price) => {
            console.log(index,price)
        });
      },
    };
    </script>
    
    <style>
    </style>
    ```

## 生命周期

> 组件从创建到销毁的整个过程就是生命周期

### _钩子函数

> 目标: **Vue** 框架内置函数，随着组件的生命周期阶段，自动执行

作用: 特定的时间点，执行特定的操作

场景: 组件创建完毕后，可以在created 生命周期函数中发起Ajax 请求，从而初始化 data 数据

分类: 4大阶段8个方法

- 初始化
- 挂载
- 更新
- 销毁

```vue
<template>
<!-- vue生命周期 -->
  <div>
    <h1>{{msg}}</h1>
    <button @click="complte">数据更新</button>
  </div>
</template>

<script>
export default {
data () {
  return {
    msg:'hello,vue'
  }
},
methods: {
  complte(){
    this.msg = 'hello.world'
    this.$destroy()
  }
},
//初始化函数及事件
beforeCreate () {
  console.log('初始化函数及事件,无法打印出数据',this.msg)
},
//初始化数据
created () {
  console.log('初始化数据,可以打印出数据',this.msg)
},
//挂载前事件
beforeMount () {
   console.log('虚拟dom挂载成真实dom前,无法打印出dom元素',document.querySelector('h1'))
},
//挂载后事件
mounted () {
   console.log('虚拟dom挂载成真实dom,可以打印出dom元素',document.querySelector('h1'))
},
//dom数据更新前事件
beforeUpdate () {
   console.log('打印出数据更新之前的dom元素',document.querySelector('h1'))
},
updated () {
  console.log('打印出数据更新之后的dom元素',document.querySelector('h1'))
},
//实例销毁前事件
beforeDestroy () {
   console.log('移除所有组件')
},
//实例销毁后事件
destroyed () {
   console.log('实例销毁后事件,更新事件无法打印')
}
}
</script>

<style>
</style>
```




​    
​    