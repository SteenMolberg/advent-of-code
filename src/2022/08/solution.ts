import { readLinesFomFile } from "../../utils"
import chalk from "chalk"

export function run() {
  console.log(chalk.yellow("december 8, 2022"))
  console.log(chalk.yellow("================"))

  console.log(
    chalk.green(
      "Consider your map; how many trees are visible from outside the grid?"
    )
  )
  console.log(chalk.white(solve1(__dirname + "/input.txt")))

  console.log(
    chalk.green("What is the highest scenic score possible for any tree?")
  )
  console.log(chalk.white(solve2(__dirname + "/input.txt")))
}

export function solve1(filename: string): number {
  const lines = readLinesFomFile(filename)

  let result = 0

  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[0].length; col++) {
      const height = Number.parseInt(lines[row][col])

      const left = lines[row].substring(0, col)
      const right = lines[row].substring(col + 1)

      const top = buildVerticalTreeLine(lines.slice(0, row), col)
      const bottom = buildVerticalTreeLine(lines.slice(row + 1), col)

      result += checkVisibility([left, right, top, bottom], height) ? 1 : 0
    }
  }

  return result
}

export function solve2(filename: string): number {
  const lines = readLinesFomFile(filename)

  let result = 0

  for (let row = 0; row < lines.length; row++) {
    for (let col = 0; col < lines[0].length; col++) {
      const height = Number.parseInt(lines[row][col])

      const left = lines[row].substring(0, col).split("").reverse().join("")
      const right = lines[row].substring(col + 1)
      const top = buildVerticalTreeLine(lines.slice(0, row), col)
        .split("")
        .reverse()
        .join("")
      const bottom = buildVerticalTreeLine(lines.slice(row + 1), col)

      const view = calculateCumulatedScenicView(
        [left, right, top, bottom],
        height
      )

      result = view > result ? view : result
    }
  }

  return result

  return 0
}

export function checkVisibility(treeLines: string[], height: number) {
  const result = treeLines.reduce((a, treeLine) => {
    if (a) return a
    return (
      treeLine.split("").filter((o) => Number.parseInt(o) < height).length ===
      treeLine.length
    )
  }, false)

  return result
}

export function calculateCumulatedScenicView(
  treeLines: string[],
  height: number
) {
  const result = treeLines.reduce((acc, treeLine) => {
    return acc * calculateScenicView(treeLine, height)
  }, 1)

  return result
}

export function calculateScenicView(treeline: string, height: number) {
  let count = 0
  treeline.split("").some((o) => {
    count += 1
    return Number.parseInt(o) >= height
  })
  return count
}

export function buildVerticalTreeLine(lines: string[], col: number) {
  const result = lines.reduce((a, o) => {
    return a + o[col]
  }, "")

  return result
}
