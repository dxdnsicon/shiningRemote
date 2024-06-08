/**
 * 读取 .env 文件，输出 stringify 后的字符串
 * 这个脚本是给 OCI 使用，所以没有使用 ts
 */

const ENV_FILE = process.env.ENV_FILE

if (ENV_FILE || '.env') {
  console.log('ENV_FILE', ENV_FILE)
  const result = require('dotenv').config({ path: ENV_FILE })
  const envs = result.parsed
  const envArr = Object.keys(envs).reduce((arr, key) => {
    arr.push({name: key, value: envs[key]})
    return arr
  }, [])

  console.log(JSON.stringify(envArr))
} else {
  console.error('.env 文件路径错误')
  process.exit(1)
}