import { solve1, solve2 } from "../solution"
import { readLinesFomFile } from "../../../utils"

describe("test", () => {
  it("test solve1", () => {
    const result = solve1(__dirname + "/../demo.txt")
    expect(result).toEqual(24000)
  })

  it("test solve2", () => {
    const result = solve2(__dirname + "/../demo.txt")
    expect(result).toEqual(45000)
  })

  it("should read lines from file", () => {
    const lines = readLinesFomFile(__dirname + "/../demo.txt")
    expect(lines.length).toEqual(15)
  })
})
