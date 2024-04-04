import { CoordinateLike, GridLocator, LatLng, WGS84 } from "./types";

/**
 * Convert index to letter in the alphabet
 * @param index index of the letter in the alphabet
 * @returns letter
 */
const i2l = (index: number) => String.fromCharCode('A'.charCodeAt(0) + index)

/**
 * Convert letter in the alphabet to index
 * @param letter letter in the alphabet
 * @returns index of the letter in the alphabet
 */
const l2i = (letter: string): number => {
  if (letter.length !== 1 || !(/[A-Za-z]/.test(letter))) {
    throw new Error("invalid char input.");
  }
  return letter.toUpperCase().charCodeAt(0) - 'A'.charCodeAt(0);
};

/**
 * Validate grid locator
 * @param gridLocator grid locator
 * @returns true if the grid locator is valid
 */
const validateGridLocator = (gridLocator: GridLocator): boolean => {
  if (typeof gridLocator !== 'string') return false
  if (gridLocator.length % 2 !== 0) return false
  const regex = /^[A-R]{2}[0-9]{2}[A-Xa-x]{2}$/
  return regex.test(gridLocator)
}

/**
 * Convert WGS84 to Maidenhead
 * @param coord coordinate
 * @returns grid locator
 */
const WGS84ToMaidenhead = (coord: CoordinateLike): GridLocator => {
  if (typeof coord !== 'object' && !Array.isArray(coord)) throw new Error("invalid coord. it should be [number, number] or {lat: number, lng: number}")
  const { lat, lng }: WGS84 = Array.isArray(coord) ? { lat: coord[0], lng: coord[1] } : coord
  if (lat < -90 || lat > 90) throw new Error("invalid lat. it should be between -90 and 90")
  if (lng < -180 || lng > 180) throw new Error("invalid lng. it should be between -180 and 180")
  const latIndex = Math.floor((lat + 90) / 10)
  const lngIndex = Math.floor((lng + 180) / 20)
  const latRemainder = Math.floor(lat + 90) % 10
  const lngRemainder = Math.floor(Math.floor(lng + 180) % 20 / 2)
  const latSubIndex = Math.floor((lat - Math.floor(lat)) * 60 / 2.5)
  const lngSubIndex = Math.floor((lng - Math.floor(lng / 2) * 2) * 60 / 5)

  return `${i2l(lngIndex)}${i2l(latIndex)}${lngRemainder}${latRemainder}${(i2l(lngSubIndex) + i2l(latSubIndex)).toLowerCase()}`
}

/**
 * Convert Maidenhead to WGS84
 * @param gridLocator grid locator
 * @returns coordinate
 */
const maidenheadToWGS84 = (gridLocator: GridLocator): WGS84 => {
  if (!validateGridLocator(gridLocator)) throw new Error("invalid gridLocator")
  const lngIndex = l2i(gridLocator[0])
  const latIndex = l2i(gridLocator[1])
  const lngRemainder = parseInt(gridLocator[2])
  const latRemainder = parseInt(gridLocator[3])
  const lngSubIndex = l2i(gridLocator[4].toUpperCase())
  const latSubIndex = l2i(gridLocator[5].toUpperCase())
  const lng = lngIndex * 20 - 180 + lngRemainder * 2 + lngSubIndex * 5 / 60
  const lat = latIndex * 10 - 90 + latRemainder + latSubIndex * 2.5 / 60
  return { lat, lng } as WGS84
}

/**
 * Convert Maidenhead to bounding box coordinates
 * @param gridLocator grid locator
 * @returns A two-dimensional array containing two diagonal coordinates of bounds
 */
const maidenheadToBoundingBox = (gridLocator: GridLocator): [LatLng, LatLng] => {
  if (!validateGridLocator(gridLocator)) throw new Error("invalid gridLocator")
  let lng = l2i(gridLocator[0]) * 20 + parseInt(gridLocator[2]) * 2 + l2i(gridLocator[4]) * 5 / 60 - 180;
  let lat = l2i(gridLocator[1]) * 10 + parseInt(gridLocator[3]) + l2i(gridLocator[5]) * 2.5 / 60 - 90;

  return [
    [lat, lng],
    [lat + 2.5 / 60, lng + 5 / 60]
  ];
}

export {
  validateGridLocator,
  maidenheadToWGS84,
  WGS84ToMaidenhead,
  maidenheadToBoundingBox
}
