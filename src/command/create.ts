import { select, input } from "@inquirer/prompts"
import { clone } from "./clone"
import path from "path"
import fs from "fs-extra"

export interface TemplateInfo {
  name: string // 模板名称
  downloadUrl: string // 模板下载地址
  description: string // 模板描述
  branch: string // 模板分支
}

export const templates: Map<string, TemplateInfo> = new Map([
  [
    "Vite-Vue3-TypeScript-template",
    {
      name: "Vite-Vue3-TypeScript-template",
      downloadUrl: "git@gitee.com:tian__shuai/template-vite5--vue3.git",
      description: "vite + vue3 + ts初始模版",
      branch: "master",
    },
  ],
  [
    "Vite-Vue3-TypeScript-ElementUI-template",
    {
      name: "Vite-Vue3-TypeScript-ElementUI-template",
      downloadUrl: "git@gitee.com:tian__shuai/template-vite5--vue3.git",
      description: "vite + vue3 + ts + elementplus 初始模版",
      branch: "element",
    },
  ],
  [
    "Vite-Vue3-TypeScript-ElementUI-layout-template",
    {
      name: "Vite-Vue3-TypeScript-ElementUI-layout-template",
      downloadUrl: "git@gitee.com:tian__shuai/template-vite5--vue3.git",
      description: "vite + vue3 + ts + elementplus + layout 初始模版",
      branch: "element_layout",
    },
  ],
])
// 初始化模版列表
const templateList = Array.from(templates).map(
  (item: [string, TemplateInfo]) => {
    const [name, info] = item
    return {
      name,
      value: name,
      description: info.description,
    }
  }
)

// 是否覆盖同名项目
export function isOverwrite(projectName: string) {
  return select({
    message: "项目已存在，是否覆盖？",
    choices: [
      { name: "覆盖", value: true },
      { name: "不覆盖", value: false },
    ],
  })
}

export async function create(projectName?: string) {
  if (!projectName) {
    projectName = await input({ message: "请输入项目名称" })
  }
  // 判断是否覆盖同名项目
  const projectPath = path.resolve(`${process.cwd()}/project`, projectName) // 这里的路径保持和 clone.ts 中 simple-git 的 dirName 一致
  if (fs.existsSync(projectPath)) {
    const isRun = await isOverwrite(projectName)
    if (isRun) {
      await fs.remove(projectPath)
    } else {
      return
    }
  }

  const templateName = await select({
    message: "请选择模版",
    choices: templateList,
  })
  const info = templates.get(templateName)
  if (info) {
    clone(info.downloadUrl, projectName, ["-b", info.branch])
  }
}
