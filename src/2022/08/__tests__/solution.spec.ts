import {
  solve1,
  solve2,
  calculateScenicView,
  calculateCumulatedScenicView,
} from "../solution"
import { readLinesFomFile } from "../../../utils"

describe("test", () => {
  it("test solve1", () => {
    const result = solve1(__dirname + "/../demo.txt")
    expect(result).toEqual(21)
  })

  it("test solve2", () => {
    const result = solve2(__dirname + "/../demo.txt")
    expect(result).toEqual(8)
  })

  it("should read lines from file", () => {
    const lines = readLinesFomFile(__dirname + "/../demo.txt")
    expect(lines.length).toEqual(5)
  })

  it("shoukd cumulate scenic view", () => {
    expect(calculateCumulatedScenicView(["33", "49", "3", "353"], 5)).toEqual(8)
    expect(calculateCumulatedScenicView(["52", "12", "353", "3"], 5)).toEqual(4)
  })

  it("should calculate scenic view", () => {
    expect(calculateScenicView("12344", 4)).toEqual(4)
    expect(calculateScenicView("42344", 4)).toEqual(1)
    expect(calculateScenicView("15344", 4)).toEqual(2)
    expect(calculateScenicView("12333", 4)).toEqual(5)
    expect(calculateScenicView("", 4)).toEqual(0)
  })
})
