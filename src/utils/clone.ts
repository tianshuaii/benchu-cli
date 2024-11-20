import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git"
import createLogger from "progress-estimator"
import chalk from "chalk"
import log from "./log"
// import figlet from "figlet"
const figlet = require("figlet")

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100, // 100毫秒刷新一次
    frames: ["⠋", "⠙", "⠹", "⠸"].map((item) => chalk.blue(item)), // 进度条的样式
  },
})

const getOptions: Partial<SimpleGitOptions> = {
  baseDir: process.cwd(), // 指定 simple-git 操作的目录，默认为 process.cwd() 表示当前目录
  binary: "git", // 指定 git 的二进制文件位置
  maxConcurrentProcesses: 6, // 最大并发进程数
  trimmed: false, // git 输出的结果是否自动去除前后多余的空白字符
}

const goodPrinter = async (message: string) => {
  const data = await figlet(message)
  console.log(chalk.rgb(40, 156, 193).visible(data))
}

export const clone = async (
  url: string,
  projectName: string,
  branchOptions: string[]
) => {
  const git: SimpleGit = simpleGit(getOptions)
  try {
    await logger(git.clone(url, projectName, branchOptions), "代码下载中...", {
      estimate: 5000, // 预计下载时间
    })

    console.log()
    console.log(chalk.blackBright("======================================="))
    console.log(chalk.blackBright("========= 欢迎使用 benchu-cli ========="))
    console.log(chalk.blackBright("======================================="))
    console.log()

    log.success(`项目创建成功 ${chalk.blueBright(projectName)}`)
    console.log()
    log.success("执行以下命令启动项目")
    log.info(`cd ${chalk.blueBright(projectName)}`)
    log.info(`${chalk.yellow("pnpm")} install`)
    log.info(`${chalk.yellow("pnpm")} run dev`)

    goodPrinter("benchu-cli")
  } catch (e) {
    log.error(chalk.red("代码下载失败！"))
  }
}
