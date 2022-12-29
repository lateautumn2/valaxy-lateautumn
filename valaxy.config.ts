import type { UserConfig } from 'valaxy'
import type { ThemeUserConfig } from 'valaxy-theme-yun'
import { addonWaline } from 'valaxy-addon-waline/node'

/**
 * User Config
 * do not use export const
 */
const config: UserConfig<ThemeUserConfig> = {
  lang: 'zh-CN',
  title: '山岸逢秋',
  author: {
    name: '深秋',
    avatar: '/image/avatar.webp',
    email: 'yeluoqiushen@qq.com',
    status: {
      emoji: '🌱',
      message: '正在努力学习中',
    }
  },
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
    algolia: {
      enable: false,
      appId: 'OBFL1UV9UY',
      apiKey: '0ca2cf85480e296dd1353447bc6b2ba6',
      indexName: 'blog_copur',
    },
  },

  theme: 'yun',

  themeConfig: {
    bg_image: {
      enable: true,
      url: '/image/wallhaven.webp',
    },
    banner: {
      enable: true,
      title: '山岸逢秋',
    },

    pages: [
      {
        name: '我的小伙伴们',
        url: '/links/',
        icon: 'i-ri-genderless-line',
        color: 'dodgerblue',
      },
      {
        name: '英语听力解析',
        url: '/englisten/',
        icon: 'i-ri-customer-service-line',
        color: '#F293B0',
      },
      {
        name: 'Baidu-light-33主题',
        url: '/posts/baidu-light/',
        icon: 'i-ri-baidu-line',
        color: '#13c2c2',
      },
    ],

    footer: {
      since: 2021,
      beian: {
        enable: false,
        icp: '浙ICP备2021035374号',
      },
      powered: true,
    },
  },
  comment: {
    enable:false,
  },

  addons: [
    addonWaline({
      serverURL: 'https://waline.yunyoujun.cn',
    }),
  ],
  unocss: {
    safelist: [
      'i-ri-home-line',
    ],
  },
}

/**
 * add your icon to safelist
 * if your theme is not yun, so you can add it by yourself
 */
config.themeConfig?.pages?.forEach((item) => {
  config.unocss?.safelist?.push(item?.icon)
})

export default config
