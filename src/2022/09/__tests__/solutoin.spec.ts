import { solve1, solve2, moveTail, Position, updateMap } from "../solution"

describe.only("december 9", () => {
  it("test solve1", () => {
    const result = solve1(__dirname + "/../demo.txt")
    expect(result).toEqual(13)
  })

  it("test solve2", () => {
    const result = solve2(__dirname + "/../demo2.txt")
    expect(result).toEqual(36)
  })

  it("should move tail", () => {
    const head = { x: 4, y: 4 }

    const tail0 = { x: 4, y: 4 }
    moveTail(head, tail0, [])
    expect(tail0).toEqual({ x: 4, y: 4 })

    const tail01 = { x: 5, y: 4 }
    moveTail(head, tail01, [])
    expect(tail01).toEqual({ x: 5, y: 4 })

    const tail02 = { x: 4, y: 5 }
    moveTail(head, tail02, [])
    expect(tail02).toEqual({ x: 4, y: 5 })

    const tail1 = { x: 2, y: 4 }
    moveTail(head, tail1, [])
    expect(tail1).toEqual({ x: 3, y: 4 })

    const tail2 = { x: 6, y: 4 }
    moveTail(head, tail2, [])
    expect(tail2).toEqual({ x: 5, y: 4 })

    const tail3 = { x: 4, y: 2 }
    moveTail(head, tail3, [])
    expect(tail3).toEqual({ x: 4, y: 3 })

    const tail4 = { x: 4, y: 6 }
    moveTail(head, tail4, [])
    expect(tail4).toEqual({ x: 4, y: 5 })

    const tail5 = { x: 3, y: 6 }
    moveTail(head, tail5, [])
    expect(tail5).toEqual({ x: 4, y: 5 })

    const tail6 = { x: 5, y: 2 }
    moveTail(head, tail6, [])
    expect(tail6).toEqual({ x: 4, y: 3 })
  })

  it("should keep map", () => {
    const map: Position[] = []

    updateMap({ x: 1, y: 1 }, map)

    expect(map.length).toBe(1)
    updateMap({ x: 1, y: 1 }, map)
    expect(map.length).toBe(1)

    updateMap({ x: 2, y: 1 }, map)
    updateMap({ x: 3, y: 1 }, map)
    updateMap({ x: 3, y: 2 }, map)
    expect(map.length).toBe(4)
  })
})
