import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git"
import createLogger from "progress-estimator"
import chalk from "chalk"
import log from "./log"
import { successTip } from "./success-tip"
import fs from "fs-extra"
import path from "path"

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

    // 删除 .git 目录，取消 Git 仓库关联
    const gitDir = path.join(process.cwd(), projectName, ".git")
    if (fs.existsSync(gitDir)) {
      fs.rmSync(gitDir, { recursive: true, force: true })
    }

    successTip(projectName)
  } catch (e) {
    log.error(chalk.red("代码下载失败！"))
  }
}
