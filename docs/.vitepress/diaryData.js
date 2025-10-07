// .vitepress/diaryData.js
// 浏览器端可用，不依赖 Node 模块
export const diaryFiles = import.meta.glob('../diaries/**/*.md', { eager: true })

// 生成 Map：{ year: { month: Set(day) } }
export const diaryMap = {}

for (const filePath in diaryFiles) {
  // filePath 示例: '../diaries/2025/10/2025-10-07.md'
  const match = filePath.match(/diaries\/(\d{4})\/(\d{1,2})\/(\d{4}-\d{2}-\d{2})\.md$/)
  if (!match) continue
  const [_, year, month, fullDate] = match

  diaryMap[year] = diaryMap[year] || {}
  diaryMap[year][parseInt(month, 10)] = diaryMap[year][parseInt(month, 10)] || new Set()
  diaryMap[year][parseInt(month, 10)].add(parseInt(fullDate.split('-')[2]))
}

console.log('diaryMap', diaryMap)
