import path from "path"

const serverPath = (staticFilePath: string) => {
  return path.join(process.cwd(), "public", staticFilePath)
}

export default serverPath
