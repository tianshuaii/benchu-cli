import { Command } from "commander"
import { version } from "../package.json"
import { create } from "./command/create"
import { update } from "./command/update"

const program = new Command("benchu")
program.version(version, "-v, --version", "版本号")

// create 指令
program
  .command("create")
  .description("初始化新项目")
  .argument("[name]", "项目名称") // "[name]"表示可选参数，"name"表示必填参数
  .action((dirName) => {
    create(dirName) // 不考虑不传参的情况，统一交予 create 函数处理
  })

// update 指令
program
  .command("update")
  .description("更新 benchu-cli 工具")
  .action(async () => {
    await update()
  })

program.parse()
