import { select, input } from "@inquirer/prompts"
import { clone } from "../utils/clone"
import fs from "fs-extra"
import { templateList, templates } from "../utils/template"
import { getProjectPath, isOverwrite } from "../utils/overwrite"
import { checkVersion } from "../utils/check-version"

export async function create(projectName?: string) {
  // 如果 create 时没有输入项目名称，则提示用户输入
  if (!projectName) {
    projectName = await input({ message: "请输入项目名称" })
  }

  // 尝试根据项目名获取项目路径
  const projectPath = getProjectPath(projectName)
  // 判断是否覆盖同名项目
  if (fs.existsSync(projectPath)) {
    const isRun = await isOverwrite("项目已存在，是否覆盖？")
    if (isRun) {
      await fs.remove(projectPath) // 移除已存在的项目
    } else {
      return
    }
  }

  // 检查版本更新
  await checkVersion()

  // 用户选择的模版信息
  const templateName = await select({
    message: "请选择模版",
    choices: templateList,
  })
  const info = templates.get(templateName)

  // 开始克隆
  if (info) {
    clone(info.downloadUrl, projectName, ["-b", info.branch])
  }
}
