import { defineConfig } from 'vitepress'
import { generateSidebar } from '../../public/sidebar.js'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CongYueBLOG",
  //TODO 记得改
  description: "A VitePress Site",
  base: "/CongYueBLOG/",
  cleanUrls: false,

  markdown: {
    vue: {
      scriptSetup: true
    }
  },

  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '日记', link: '/diaries/'},
      { text: '杂文', link: '/categories/essays/' },
      { text: '技术', 
        items:[
          { text: '简介', link: '/categories/technology/'},
          { text: '前端三剑客', link: '/categories/technology/frontend'},
          { text: 'vue', link: '/categories/technology/vue'},
          { text: 'uniapp', link: '/categories/technology/uniapp'},
          { text: 'java', link: '/categories/technology/java'},
          { text: 'python', link: '/categories/technology/python'},
        ]
      },
      { text: '人文社科', 
        items:[
          { text: '简介', link: '/categories/humanities/'},
          { text: '历史', link: '/categories/humanities/history'},
          { text: '政治经济学', link: '/categories/humanities/economics'},
          { text: '哲学思辨', link: '/categories/humanities/philosophy'},
        ]
      },
    ],

    sidebar: generateSidebar(),

    socialLinks: [
      { icon: 'github', link: 'https://github.com/Kumono24/CongYueBLOG.git'}
    ],

    search: {
      provider: 'local',
      options: {
        // 指定要包含的路径
        // exclude: 排除不想被搜索的路径
        exclude: ['/letters']
      }
    },
  },

  head: [

  ]
})
