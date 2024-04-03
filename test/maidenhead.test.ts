import { describe, it, expect } from 'vitest'
import {
  GridLocator,
  WGS84,
  validateGridLocator,
  WGS84ToMaidenhead,
  maidenheadToWGS84,
  LatLng
} from '../src'

describe('Maidenhead', () => {
  const cases = [
    {
      grid: 'DM06gs' as GridLocator,
      latlng: [
        36.778261, 
        -119.4179324
      ] as LatLng
    },
    {
      grid: 'OL39do' as GridLocator,
      latlng: {
        lat: 29.617238,
        lng: 106.324862
      } as WGS84
    }
  ]

  for (const { grid, latlng } of cases) {
    it('should validate grid locator', () => {
      expect(validateGridLocator(grid)).toBe(true)
    })

    it('should convert WGS84 to Maidenhead', () => {
      expect(WGS84ToMaidenhead(latlng)).toBe(grid)
    })

    it('should convert Maidenhead to WGS84', () => {
      const result = maidenheadToWGS84(grid)
      console.log(result);
      
      if (Array.isArray(latlng)) {
        expect(result.lat).toBeCloseTo(latlng[0], 0)
        expect(result.lng).toBeCloseTo(latlng[1], 0)
      }
      if ('lat' in latlng && 'lng' in latlng) {
        expect(result.lat).toBeCloseTo(latlng.lat, 0)
        expect(result.lng).toBeCloseTo(latlng.lng, 0)
      }
    })
  }
})
