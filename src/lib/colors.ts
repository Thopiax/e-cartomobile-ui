import { RGBAColor } from "@deck.gl/core"
import isNil from "lodash/isNil"

export function getScoreClassname(score?: number | null): string {
  let classname = "text-gray-400"

  if (isNil(score)) {
    return classname
  } else if (score >= 0 && score <= 0.2) {
    classname = "text-red-400"
  } else if (score > 0.2 && score <= 0.3) {
    classname = "text-orange-400"
  } else if (score > 0.3 && score <= 0.5) {
    classname = "text-yellow-400"
  } else if (score > 0.5 && score <= 0.7) {
    classname = "text-green-400"
  } else if (score > 0.7 && score <= 0.8) {
    classname = "text-emerald-500"
  } else if (score > 0.8 && score <= 1) {
    classname = "text-blue-400"
  }

  return classname
}

export function getScoreColor(score?: number | null, alpha = 128): RGBAColor {
  let color: RGBAColor = [128, 128, 128, 55]

  if (isNil(score)) {
    return color
  } else if (score >= 0 && score <= 0.2) {
    color = [255, 102, 102, alpha] // Light Coral (Red)
  } else if (score > 0.2 && score <= 0.3) {
    color = [255, 153, 51, alpha] // Dark Orange (Orange)
  } else if (score > 0.3 && score <= 0.5) {
    color = [255, 204, 51, alpha] // Goldenrod (Yellow)
  } else if (score > 0.5 && score <= 0.7) {
    color = [153, 204, 51, alpha] // Olive Green (Green)
  } else if (score > 0.7 && score <= 0.8) {
    color = [51, 153, 102, alpha] // Sea Green (Blue-Green)
  } else if (score > 0.8 && score <= 1) {
    color = [51, 102, 204, alpha] // Dodger Blue (Blue)
  }

  return color
}

function getRandomValue(seed: number): number {
  const x = Math.sin(seed++) * 10000
  return Math.floor((x - Math.floor(x)) * 256)
}

export function getColorByDepartmentCode(
  regionCode: number,
  alpha = 128
): RGBAColor {
  // Set the seed for consistent random colors based on the region code
  const seed = regionCode * 100

  // Generate random RGB values
  const red = getRandomValue(seed)
  const green = getRandomValue(seed + 1)
  const blue = getRandomValue(seed + 2)

  return [red, green, blue, alpha]
}
