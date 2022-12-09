import { readLinesFomFile } from "../../utils"
import chalk from "chalk"

export function run() {
  console.log(chalk.yellow("december 1, 2022"))
  console.log(chalk.yellow("================"))

  console.log(chalk.green("How many total Calories is that Elf carrying?"))
  console.log(chalk.white(solve1(__dirname + "/input.txt")))

  console.log(
    chalk.green("How many Calories are those Elves carrying in total?")
  )
  console.log(chalk.white(solve2(__dirname + "/input.txt")))
}

type HighCounter = {
  highestElf: number
  currentElf: number
}

export function solve1(filename: string): number {
  const lines = readLinesFomFile(filename)

  const result = lines.reduce(
    (acc, line) => {
      if (!line) {
        return {
          highestElf:
            acc.currentElf > acc.highestElf ? acc.currentElf : acc.highestElf,
          currentElf: 0,
        }
      } else {
        return {
          highestElf: acc.highestElf,
          currentElf: acc.currentElf + Number.parseInt(line),
        }
      }
    },
    { highestElf: 0, currentElf: 0 } as HighCounter
  )

  return result.highestElf
}

export function solve2(filename: string) {
  const lines = readLinesFomFile(filename)

  let currentElfTotal = 0
  const elfs = lines.reduce((acc, line) => {
    if (line === "") {
      // reset currentElfTotal
      // add current total to array, sort desc, and return top 3
      acc.push(currentElfTotal)
      currentElfTotal = 0
      return acc.sort((a, b) => b - a).slice(0, 3)
    } else {
      // add line to currentTotal
      currentElfTotal += +Number.parseInt(line)
      return acc
    }
  }, [] as number[])

  const result = elfs.reduce((acc, obj) => (acc += obj), 0)

  return result
}
