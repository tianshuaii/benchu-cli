import process from "child_process"
import chalk from "chalk"
import ora from "ora"

// 进度条
const spinner = ora({
  text: "benchu-cli 正在更新",
  spinner: {
    interval: 100, // 100毫秒刷新一次
    frames: ["⠋", "⠙", "⠹", "⠸"].map((item) => chalk.blue(item)), // 进度条的样式
  },
})
export const update = () => {
  spinner.start() // 开始动画
  process.exec("npm install benchu-cli@latest -g", (error, stdout) => {
    // spinner.stop() // 停止动画
    if (error) {
      spinner.fail()
      console.log(chalk.red(error))
    } else {
      spinner.succeed()
      console.log(chalk.green("更新成功"))
    }
  })
}
