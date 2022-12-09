import fs from "fs"

export function readLinesFomFile(filename: string): string[] {
  return fs.readFileSync(filename, { encoding: "utf8" }).split("\n")
}
