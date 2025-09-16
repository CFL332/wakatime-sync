// 本地测试WakaTime数据获取脚本
require('dotenv').config()
const dayjs = require('dayjs')
const Axios = require('axios')

const { WAKATIME_API_KEY } = process.env
const BASE_URL = 'https://wakatime.com/api/v1'
const summariesApi = `${BASE_URL}/users/current/summaries`

// 测试函数：查询指定日期的数据
async function testFetchData(date) {
  console.log(`正在查询 ${date} 的数据...`)
  try {
    const response = await Axios.get(summariesApi, {
      params: {
        start: date,
        end: date,
        api_key: WAKATIME_API_KEY
      }
    })

    console.log('查询成功！')
    console.log('数据概览：')

    if (response.data.data && response.data.data.length > 0) {
      const { projects, grand_total, languages, categories, editors } = response.data.data[0]
      console.log(`总时间：${grand_total.text}`)

      console.log('\n项目列表：')
      projects.slice(0, 5).forEach(project => {
        console.log(`- ${project.name}: ${project.text}`)
      })

      console.log('\n编程语言：')
      languages.slice(0, 5).forEach(lang => {
        console.log(`- ${lang.name}: ${lang.text}`)
      })
    } else {
      console.log('未找到数据')
    }

    return response.data
  } catch (error) {
    console.error('查询失败:', error.message)
    if (error.response) {
      console.error('错误状态码:', error.response.status)
      console.error('错误详情:', error.response.data)
    }
    throw error
  }
}

// 运行测试
async function runTest() {
  try {
    // 环境变量检查
    if (!WAKATIME_API_KEY) {
      console.error('错误：请在.env文件中设置WAKATIME_API_KEY')
      return
    }

    const today = dayjs().format('YYYY-MM-DD')
    const yesterday = dayjs()
      .subtract(1, 'day')
      .format('YYYY-MM-DD')

    console.log('=== WakaTime API 测试 ===')
    console.log(`当前日期：${today}`)
    console.log(`昨天日期：${yesterday}`)

    // 测试昨天的数据（当前代码使用的）
    console.log('\n测试昨天的数据：')
    await testFetchData(yesterday)

    // 测试今天的数据
    console.log('\n测试今天的数据：')
    await testFetchData(today)

    console.log('\n测试完成！')
  } catch (error) {
    console.error('测试过程中发生错误:', error)
  }
}

runTest()
