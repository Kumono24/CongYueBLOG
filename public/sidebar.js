import fs from 'fs'
import path from 'path'

// 扫描目录生成 sidebar 项
function getSidebar(dir) {
  const fullPath = path.join(process.cwd(), 'docs', dir)
  if (!fs.existsSync(fullPath)) return []

  const files = fs.readdirSync(fullPath)

  // 先找到 index.md
  const indexFile = files.find(f => f.toLowerCase() === 'index.md')
  const otherMdFiles = files.filter(f => f.endsWith('.md') && f.toLowerCase() !== 'index.md')
  const subDirs = files.filter(f => fs.statSync(path.join(fullPath, f)).isDirectory())

  const sidebarItems = []

  // 1️⃣ 首页
  if (indexFile) {
    sidebarItems.push({
      text: '首页',
      link: `/${dir}/`
    })
  }

  // 2️⃣ 其他 Markdown 文件
  otherMdFiles.forEach(f => {
    const name = f.replace(/\.md$/, '')
    sidebarItems.push({
      text: name,
      link: `/${dir}/${name}`
    })
  })

  // 3️⃣ 子目录（递归）
  subDirs.forEach(sub => {
    sidebarItems.push({
      text: sub,
      collapsed: true,
      items: getSidebar(path.join(dir, sub))
    })
  })

  return sidebarItems
}


// 导出 sidebar 配置
export function generateSidebar() {
  return {
    '/diaries/': getSidebar('diaries'),
    '/categories/essays/': getSidebar('categories/essays'),
    '/categories/dearheart/': getSidebar('categories/dearheart/'),
    '/categories/dearheart/essays/': getSidebar('categories/dearheart/essays'),
    '/categories/dearheart/music/': getSidebar('categories/dearheart/music'),
    '/categories/technology/': getSidebar('categories/technology/'),
    '/categories/technology/frontend/': getSidebar('categories/technology/frontend'),
    '/categories/technology/java/': getSidebar('categories/technology/java'),
    '/categories/technology/python/': getSidebar('categories/technology/python'),
    '/categories/technology/uniapp/': getSidebar('categories/technology/uniapp'),
    '/categories/technology/vue/': getSidebar('categories/technology/vue'),
    '/letters': getSidebar('letters')
  }
}
