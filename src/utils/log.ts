// 优化终端打印样式
import logSymbol from "log-symbols"

const log = {
  success: (message: string) => {
    console.log(logSymbol.success, message)
  },
  error: (message: string) => {
    console.log(logSymbol.error, message)
  },
  info: (message: string) => {
    console.log(logSymbol.info, message)
  },
  warn: (message: string) => {
    console.log(logSymbol.warning, message)
  },
}

export default log
