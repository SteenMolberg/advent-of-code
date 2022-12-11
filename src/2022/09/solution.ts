import { readLinesFomFile } from "../../utils"
import chalk from "chalk"

export function run() {
  console.log(chalk.yellow("december 9, 2022"))
  console.log(chalk.yellow("================"))

  console.log(
    chalk.green(
      "How many positions does the tail of the rope visit at least once?"
    )
  )
  console.log(chalk.white(solve1(__dirname + "/input.txt")))

  console.log(
    chalk.green(
      "How many positions does the tail of the rope visit at least once? WRONG"
    )
  )
  console.log(chalk.white(solve2(__dirname + "/input.txt")))
}

export type Position = {
  x: number
  y: number
}

export function solve1(filename: string): number {
  const lines = readLinesFomFile(filename)

  const map: Position[] = []
  const head: Position = { x: 0, y: 0 }
  const tail: Position = { x: 0, y: 0 }

  lines.map((move) => {
    moveHead(move, head, tail, map)
  })

  return map.length
}

export function solve2(filename: string): number {
  const lines = readLinesFomFile(filename)

  const map: Position[] = []
  const head: Position = { x: 0, y: 0 }
  const tail: Position[] = [
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
    { x: 0, y: 0 },
  ]

  lines.map((move) => {
    const [direction, steps] = move.split(" ")
    const step = {
      x: direction === "R" ? 1 : direction === "L" ? -1 : 0,
      y: direction === "U" ? 1 : direction === "D" ? -1 : 0,
    }

    for (let index = 0; index < Number.parseInt(steps); index++) {
      // movehead
      head.x = head.x + step.x
      head.y = head.y + step.y

      for (let i = 0; i < tail.length; i++) {
        if (i === 0) {
          tail[i] = { ...moveTailPart(head, tail[i]) }
        } else {
          tail[i] = { ...moveTailPart(tail[i - 1], tail[i]) }
        }

        if (i === tail.length - 1) {
          updateMap(tail[i], map)
        }
      }
    }
  })

  console.log(head)

  console.log(tail)

  return map.length
}

export function moveHead(
  move: string,
  head: Position,
  tail: Position,
  map: Position[]
) {
  const [direction, steps] = move.split(" ")
  const step = {
    x: direction === "R" ? 1 : direction === "L" ? -1 : 0,
    y: direction === "U" ? 1 : direction === "D" ? -1 : 0,
  }

  //console.log({ move, step, steps })
  for (let index = 0; index < Number.parseInt(steps); index++) {
    head.x = head.x + step.x
    head.y = head.y + step.y

    moveTail(head, tail, map)
  }
}

export function moveTail(head: Position, tail: Position, map: Position[]) {
  // check x
  if (Math.abs(head.x - tail.x) > 1) {
    // increase tail x
    tail.x = tail.x + (head.x - tail.x) / 2
    if (head.y != tail.y) tail.y = head.y
  }

  // check y
  if (Math.abs(head.y - tail.y) > 1) {
    // increase tail y
    tail.y = tail.y + (head.y - tail.y) / 2
    if (head.x != tail.x) tail.x = head.x
  }
  updateMap(tail, map)
}

export function moveTailPart(head: Position, tail: Position): Position {
  let newTailPosistion = { ...tail }

  // check x
  if (Math.abs(head.x - tail.x) > 1) {
    // increase tail x
    newTailPosistion.x = tail.x + (head.x - tail.x) / 2
    if (head.y != tail.y) newTailPosistion.y = head.y
  }

  // check y
  if (Math.abs(head.y - tail.y) > 1) {
    // increase tail y
    newTailPosistion.y = tail.y + (head.y - tail.y) / 2
    if (head.x != tail.x) newTailPosistion.x = head.x
  }
  return newTailPosistion
}

export function updateMap(tail: Position, map: Position[]) {
  // add posision if missing

  let found = false
  const result = map.some((o) => {
    if (o.x === tail.x && o.y === tail.y) {
      found = true
      return true
    }
  })
  if (!found) {
    map.push({ ...tail })
  }
}
