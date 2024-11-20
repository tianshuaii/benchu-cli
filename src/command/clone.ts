import { simpleGit, SimpleGit, SimpleGitOptions } from "simple-git"
import createLogger from "progress-estimator"
import chalk from "chalk"

// 初始化进度条
const logger = createLogger({
  spinner: {
    interval: 100, // 100毫秒刷新一次
    frames: ["⠋", "⠙", "⠹", "⠸"].map((item) => chalk.blue(item)), // 进度条的样式，
  },
})

const getOptions: Partial<SimpleGitOptions> = {
  baseDir: `${process.cwd()}/project`, // 指定 simple-git 操作的目录，默认为 process.cwd() 表示当前目录
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
    console.log()
    console.log(chalk.green("代码下载完成！"))
    console.log("=====================================================")
    console.log("================= 欢迎使用 benchu-cli ===============")
    console.log("=====================================================")
    console.log()
    console.log(
      "======== pnpm install 安装依赖， pnpm run dev 运行项目 ======="
    )
  } catch (e) {
    console.log("clone error", e)
  }
}
