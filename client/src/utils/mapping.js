export function noteToRank(note, map) {
  if (typeof note !== "string" && !(note instanceof String)) {
    throw new TypeError(`String expected, got ${note} instead`)
  }

  map = map || noteMap

  for (let [rank, value] of map.entries()) {
    if (value === note) {
      return rank
    }
  }
  throw new Error(`Failed to retrieve rank for note ${note}`)
}

export function rankToNote(rank, map) {
  if (!Number.isInteger(rank)) {
    throw new TypeError(`Number expected, got ${rank} instead`)
  }

  map = map || noteMap

  const note = map.get(rank)
  if (note === undefined) {
    throw new Error(`Failed to retrieve note for rank ${rank}`)
  }

  return note
}

export const noteMap = new Map([
  [60, "C3"],
  [59, "B2"],
  [58, "A#2"],
  [57, "A2"],
  [56, "G#2"],
  [55, "G2"],
  [54, "F#2"],
  [53, "F2"],
  [52, "E2"],
  [51, "D#2"],
  [50, "D2"],
  [49, "C#2"],
  [48, "C2"],
  [47, "B1"],
  [46, "A#1"],
  [45, "A1"],
  [44, "G#1"],
  [43, "G1"],
  [42, "F#1"],
  [41, "F1"],
  [40, "E1"],
  [39, "D#1"],
  [38, "D1"],
  [37, "C#1"],
  [36, "C1"],
  [35, "B0"],
  [34, "A#0"],
  [33, "A0"],
  [32, "G#0"],
  [31, "G0"],
  [30, "F#0"],
  [29, "F0"],
  [28, "E0"],
  [27, "D#0"],
  [26, "D0"],
  [25, "C#0"],
  [24, "C0"],
  [23, "B-1"],
  [22, "A#-1"],
  [21, "A-1"],
])
