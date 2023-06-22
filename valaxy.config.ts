import {defineValaxyConfig} from 'valaxy'
import type { UserThemeConfig } from 'valaxy-theme-yun'
import { addonWaline } from 'valaxy-addon-waline'

/**
 * User Config
 * do not use export const
 */
export default defineValaxyConfig<UserThemeConfig>  ({
  theme: 'yun',

  themeConfig: {
    bg_image: {
      enable: true,
      dark: '/image/dark.jpg',
      url: '/image/auto.jpg',
    },
    banner: {
      enable: true,
      title: '山岸逢秋',
    },
    say: {
      enable: true,
      api: "/poetry.json",
    },
    pages: [
      {
        name: '我的小伙伴们',
        url: '/links/',
        icon: 'i-ri-genderless-line',
        color: 'dodgerblue',
      },
    ],

    footer: {
      since: 2021,
      beian: {
        enable: false,
        icp: '浙ICP备2021035374号',
      },
      powered: true,
      icon:{
        enable:false
      }
    },
  },
  addons: [
    addonWaline({
      serverURL: 'https://waline.lateautumn.cn',
      comment:true
    }),
  ],
  unocss: {
    safelist: [
      'i-ri-home-line',
    ],
  },
})


