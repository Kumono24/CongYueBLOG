import fs from 'fs'
import path from 'path'

// 获取今天日期
const today = new Date()
const year = today.getFullYear()
const month = String(today.getMonth() + 1).padStart(2, '0')
const day = String(today.getDate()).padStart(2, '0')

// 文件夹路径
const baseDir = path.join(process.cwd(), 'docs', 'diaries', String(year), month)

// 确保目录存在
fs.mkdirSync(baseDir, { recursive: true })

// 文件名：完整日期
const fileName = `${year}-${month}-${day}.md`
const filePath = path.join(baseDir, fileName)

// 模板内容
const content = `# ${year}-${month}-${day}

## 今天做了什么

## 对今天满意吗（对于今天计划完成程度）

## 特殊日期纪念

## 感想
`

// 如果文件已存在就不覆盖
if (!fs.existsSync(filePath)) {
  fs.writeFileSync(filePath, content, 'utf-8')
  console.log(`✅ 新日记已创建: ${filePath}`)
} else {
  console.log(`⚠️ 日记已存在: ${filePath}`)
}
