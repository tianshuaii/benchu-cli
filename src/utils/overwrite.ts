import { select } from "@inquirer/prompts"
import path from "path"

export const getProjectPath = (projectName: string) => {
  return path.resolve(process.cwd(), projectName) // 这里的路径保持和 clone.ts 中 simple-git 的 baseDir 一致
}

// 是否覆盖同名项目
export function isOverwrite(message: string) {
  return select({
    message,
    choices: [
      { name: "覆盖", value: true },
      { name: "不覆盖", value: false },
    ],
  })
}
