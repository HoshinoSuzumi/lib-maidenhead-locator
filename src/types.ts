export type LatLng = [number, number];
export interface WGS84 {
  lat: number;
  lng: number;
}
export type CoordinateLike = LatLng | WGS84;
export type LatLngBounds = [LatLng, LatLng];

export type GridLocator = string;
