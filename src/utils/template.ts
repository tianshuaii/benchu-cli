export interface TemplateInfo {
  name: string // 模板名称
  downloadUrl: string // 模板下载地址
  description: string // 模板描述
  branch: string // 模板分支
}

export const templates: Map<string, TemplateInfo> = new Map([
  [
    "Vite-Vue3-TypeScript",
    {
      name: "Vite-Vue3-TypeScript",
      downloadUrl: "https://gitee.com/tian__shuai/template-vite5--vue3.git",
      description: "vite + vue3 + ts初始模版",
      branch: "master",
    },
  ],
  [
    "Vite-Vue3-TypeScript-ElementUI",
    {
      name: "Vite-Vue3-TypeScript-ElementUI",
      downloadUrl: "https://gitee.com/tian__shuai/template-vite5--vue3.git",
      description: "vite + vue3 + ts + elementplus 初始模版",
      branch: "element",
    },
  ],
  [
    "Vite-Vue3-TypeScript-ElementUI-layout",
    {
      name: "Vite-Vue3-TypeScript-ElementUI-layout",
      downloadUrl: "https://gitee.com/tian__shuai/template-vite5--vue3.git",
      description: "vite + vue3 + ts + elementplus + layout 初始模版",
      branch: "element_layout",
    },
  ],
])

// 初始化模版列表
export const templateList = Array.from(templates).map(
  (item: [string, TemplateInfo]) => {
    const [name, info] = item
    return {
      name,
      value: name,
      description: info.description,
    }
  }
)
