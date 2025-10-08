<template>
  <div class="calendar">
    <!-- 年/月导航 -->
    <div class="header">
      <div class="nav-buttons">
        <button @click="prevYear">«</button>
        <button @click="prevMonth">‹</button>
      </div>
      <div class="current">{{ year }} 年 {{ month + 1 }} 月</div>
      <div class="nav-buttons">
        <button @click="nextMonth">›</button>
        <button @click="nextYear">»</button>
      </div>
    </div>

    <!-- 输入跳转 -->
    <div class="jump">
      <input v-model.number="inputYear" type="number" min="1" max="9999" placeholder="年份" />
      <input v-model.number="inputMonth" type="number" min="1" max="12" placeholder="月份" />
      <button @click="jumpTo">跳转</button>
    </div>

    <!-- 日历表 -->
    <div class="main">
      <table>
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, wIndex) in weeks" :key="wIndex">
            <td
              v-for="(day, dIndex) in week"
              :key="dIndex"
              :class="{ empty: !day }"
            >
              <template v-if="day">
                <a
                  :href="hasDiary(day) ? getDiaryLink(day) : 'javascript:void(0)'"
                  :class="{'has-diary': hasDiary(day), 'no-diary': !hasDiary(day)}"
                >
                  {{ day.getDate() }}
                </a>
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { diaryMap } from '../../diaryData.js'

const currentDate = ref(new Date())
const inputYear = ref(currentDate.value.getFullYear())
const inputMonth = ref(currentDate.value.getMonth() + 1)

const daysOfWeek = ['日', '一', '二', '三', '四', '五', '六']

const year = computed(() => currentDate.value.getFullYear())
const month = computed(() => currentDate.value.getMonth())

// 判断某天是否有日记
const hasDiary = (day) => {
  if (!day) return false
  const y = day.getFullYear()
  const m = day.getMonth() + 1
  const d = day.getDate()
  return diaryMap[y] && diaryMap[y][m] && diaryMap[y][m].has(d)
}

// 点击跳转链接
const getDiaryLink = (day) => {
  const y = day.getFullYear()
  const m = String(day.getMonth() + 1).padStart(2, '0')
  const d = String(day.getDate()).padStart(2, '0')
  return `./${y}/${m}/${y}-${m}-${d}`
}

// 生成每周日期
const weeks = computed(() => {
  const firstDay = new Date(year.value, month.value, 1)
  const lastDay = new Date(year.value, month.value + 1, 0)
  const firstWeekDay = firstDay.getDay()
  const totalDays = lastDay.getDate()

  const days = []
  let week = Array(7).fill(null)
  let dayCounter = 1

  // 填第一周
  for (let i = firstWeekDay; i < 7; i++) {
    week[i] = new Date(year.value, month.value, dayCounter++)
  }
  days.push(week)

  // 填剩余周
  while (dayCounter <= totalDays) {
    week = Array(7).fill(null)
    for (let i = 0; i < 7 && dayCounter <= totalDays; i++) {
      week[i] = new Date(year.value, month.value, dayCounter++)
    }
    days.push(week)
  }
  return days
})

// 年月翻页
const prevMonth = () => currentDate.value = new Date(year.value, month.value - 1, 1)
const nextMonth = () => currentDate.value = new Date(year.value, month.value + 1, 1)
const prevYear = () => currentDate.value = new Date(year.value - 1, month.value, 1)
const nextYear = () => currentDate.value = new Date(year.value + 1, month.value, 1)
const jumpTo = () => {
  if (inputYear.value && inputMonth.value >= 1 && inputMonth.value <= 12) {
    currentDate.value = new Date(inputYear.value, inputMonth.value - 1, 1)
  }
}
</script>

<style scoped>
@media (prefers-color-scheme: dark){
.calendar {
  font-family: "Microsoft YaHei", Arial, sans-serif;
  max-width: 480px;
  margin: 2rem auto;
  padding: 1rem;
  border: 1px solid #565656;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(15, 13, 13, 0.1);
  background: var(--vp-c-bg);
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.nav-buttons button {
  padding: 0.25rem 0.6rem;
  margin: 0 0.1rem;
  background-color: var(--vp-c-bg);
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
.nav-buttons button:hover { background-color: #dcdcdc; color: #444444}

.current { font-weight: bold; font-size: 1.1rem; text-align: center; }

.jump {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.jump input { width: 70px; text-align: center; padding: 0.25rem; border-radius: 6px; border: 1px solid #ccc; }
.jump button { padding: 0.3rem 0.8rem; background: #409eff; color: #fff; border-radius: 6px; cursor: pointer; }
.jump button:hover { background: #66b1ff; }

table {
  width: 90%;
  border-collapse: separate;
  border-spacing: 8px;
  margin: 0 auto;
  text-align: center;
}

thead tr th{
  text-align: center;   /* 文字水平居中 */
  vertical-align: middle; /* 垂直居中 */
}

th {
  padding: 0.6rem;
  background-color: var(--vp-c-bg);
  font-weight: 600;
  border-bottom: 2px solid #7f7f7f;
}
td {
  padding: 0.6rem 0.8rem;
  border-radius: 6px;
  border: 1px solid #595959;
  background-color: var(--vp-c-bg);
  transition: background-color 0.2s, transform 0.1s;
}
td.empty { 
  color:var(--vp-c-text);
  background: var(--vp-c-bg);
  border: none; }
td:not(.empty):hover { background-color: #444444; transform: scale(1.05); }
a { text-decoration: none; display: inline-block; width: 100%; height: 100%; line-height: 40px; }
.has-diary { color: var(--vp-c-text); border-radius: 4px; }
.no-diary { color: #969696; cursor: default; }
}
</style>
