// docs/.vitepress/diaryList.js
// 目前没用

import fs from 'fs'
import path from 'path'

function walkDiaries(dir) {
  const entries = []

  if (!fs.existsSync(dir)) return entries

  const items = fs.readdirSync(dir)
  for (const item of items) {
    const fullPath = path.join(dir, item)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      entries.push(...walkDiaries(fullPath))
    } else if (stat.isFile() && item.endsWith('.md')) {
      const relative = path.relative(path.join(process.cwd(), 'docs'), fullPath)
      const link = '/' + relative.replace(/\\/g, '/').replace(/\.md$/, '')
      const dateParts = fullPath.match(/(\d{4})[\\/](\d{2})[\\/](\d{2})\.md$/)
      const date = dateParts ? `${dateParts[1]}-${dateParts[2]}-${dateParts[3]}` : null
      if (date) entries.push({ date, link })
    }
  }

  return entries
}

export function getDiaryList() {
  const diaryDir = path.join(process.cwd(), 'docs', 'diaries')
  return walkDiaries(diaryDir).sort((a, b) => a.date.localeCompare(b.date))
}
