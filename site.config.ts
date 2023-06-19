import { defineSiteConfig } from 'valaxy'


export default defineSiteConfig({

lang: 'zh-CN',
  title: '山岸逢秋...',
  author: {
    name: '深秋',
    avatar: '/image/avator.jpg',
    email: 'yeluoqiushen@qq.com',
    status: {
      emoji: '🌱',
      message: '正在努力学习中',
    }
  },
  subtitle:'人间忽晚,山河已秋',
  description: '偷得浮生半日闲',
  url:"https://lateautumn.cn",
  social: [
    {
      name: 'RSS',
      link: '/atom.xml',
      icon: 'i-ri-rss-line',
      color: 'orange',
    },
    {
      name: 'GitHub',
      link: 'https://github.com/lateautumn2/',
      icon: 'i-ri-github-line',
      color: '#6e5494',
    },
    {
      name: 'E-Mail',
      link: 'mailto:yeluoqiushen@qq.com',
      icon: 'i-ri-mail-line',
      color: '#8E71C1',
    },
    {
      name: 'Travelling',
      link: 'https://travellings.link',
      icon: 'i-ri-train-line',
      color: 'var(--va-c-text)',
    },
  ],
  search: {
      enable: false,
      type:'fuse'
    // algolia: {
    //   appId: 'OBFL1UV9UY',
    //   apiKey: '0ca2cf85480e296dd1353447bc6b2ba6',
    //   indexName: 'blog_copur',
    // },
  },
  sponsor:{
    enable:false
  },
  //开启评论
  comment: {
    enable:true,
  },
  statistics: {
    enable: true,
    readTime: {
      /**
       * 阅读速度
       */
      speed: {
        cn: 300,
        en: 200,
      },
    },
  },
  mediumZoom: { enable: true }
})