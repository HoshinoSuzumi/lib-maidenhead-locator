# @hamset/maidenhead-locator

![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/HoshinoSuzumi/lib-maidenhead-locator/ci.yml)
![NPM Downloads](https://img.shields.io/npm/dm/%40hamset%2Fmaidenhead-locator)
![NPM Version (with dist tag)](https://img.shields.io/npm/v/%40hamset%2Fmaidenhead-locator/latest)
![npm bundle size](https://img.shields.io/bundlephobia/min/%40hamset%2Fmaidenhead-locator)
![GitHub License](https://img.shields.io/github/license/HoshinoSuzumi/lib-maidenhead-locator)

Maidenhead grid locator and WGS84 coordinate calculation and transformation

## Usage

```bash
npm i @hamset/maidenhead-locator
```

```typescript
import {
  validateGridLocator,
  WGS84ToMaidenhead,
  maidenheadToWGS84,
  GridLocator,
  WGS84,
  LatLng
} from '@hamset/maidenhead-locator';

// convert maidenhead grid locator to WGS84 coordinate
const grid_locator = 'DM06gs'
const coordinate: WGS84 = maidenheadToWGS84(grid_locator);        // output: { lat: 36.75, lng: -119.5 }

// convert WGS84 coordinate to maidenhead grid locator
const coordinate: LatLng = { lat: 36.75, lng: -119.5 }
const grid_locator: GridLocator = WGS84ToMaidenhead(coordinate);  // output: 'DM06gs'
```

## API

```typescript
import { CoordinateLike, GridLocator, WGS84 } from "./types";
/**
 * Validate grid locator
 * @param gridLocator grid locator
 * @returns true if the grid locator is valid
 */
declare const validateGridLocator: (gridLocator: GridLocator) => boolean;
/**
 * Convert WGS84 to Maidenhead
 * @param coord coordinate
 * @returns grid locator
 */
declare const WGS84ToMaidenhead: (coord: CoordinateLike) => GridLocator;
/**
 * Convert Maidenhead to WGS84
 * @param gridLocator grid locator
 * @returns coordinate
 */
declare const maidenheadToWGS84: (gridLocator: GridLocator) => WGS84;

//
// types
//
export type LatLng = [number, number];
export interface WGS84 {
    lat: number;
    lng: number;
}
export type CoordinateLike = LatLng | WGS84;
export type LatLngBounds = [LatLng, LatLng];
export type GridLocator = string;
```
