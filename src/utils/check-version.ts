// 用于检查 npm 包的版本，是否需要更新 npm 包
import { name, version } from "../../package.json"
import { gt } from "lodash"
import axios, { AxiosResponse } from "axios"
import chalk from "chalk"

// 获取 npm 包的最新版本
const getNpmInfo = async (cliName: string) => {
  const npmUrl = `https://registry.npmjs.org/${cliName}`
  let res = {}
  try {
    res = await axios.get(npmUrl)
  } catch (e) {
    console.log(e)
  }
  return res
}
const getNpmLatestVersion = async (cliName: string) => {
  const { data } = (await getNpmInfo(cliName)) as AxiosResponse
  return data["dist-tags"].latest
}

// 检查版本
export const checkVersion = async () => {
  const lastestVersion = await getNpmLatestVersion(name)
  const needUpdate = gt(lastestVersion, version)
  if (needUpdate) {
    console.warn(
      `${chalk.green(name)} 版本需要更新，当前版本：${chalk.blue(
        version
      )}, 最新版本：${chalk.blueBright(lastestVersion)}`
    )
    console.log(
      `可使用${chalk.yellow(
        "npm install benchu-cli@latest -g"
      )} 或 ${chalk.yellow("benchu update")} 更新`
    )
  }
}
