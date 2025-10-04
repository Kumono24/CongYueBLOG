import { defineConfig } from 'vitepress'
import { generateSidebar } from '../../public/sidebar.js'


// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "CongYueBLOG",
  //TODO 记得改
  description: "A VitePress Site",
  base: "/CongYueBLOG/",
  cleanUrls: false,

  // 这里是 Vite 的构建配置
  build: {
    outDir: 'docs/.vitepress/dist', // 显式指定输出目录
    emptyOutDir: true,             // 清空输出目录
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js'
      }
    }
  },

  build: {
    publicPath: '/CongYueBLOG/' // 确保资源路径正确
  },

  server: {
    base: '/CongYueBLOG/' // 开发服务器的 base
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
    
  
    // TODO 记得改地址
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    search: {
      provider: 'local'
    }
  },
  
  head: [
      // ['link', { rel: 'stylesheet', href: './styles.css' }]
    ]
})
