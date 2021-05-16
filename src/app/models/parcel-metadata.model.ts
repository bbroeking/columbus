import { Coordinate } from "./coordinate.model"

export class ParcelMetadata {
    'location': Coordinate
    'neighbors': {
        'eastTile': Coordinate
        'northEastTile': Coordinate
        'northWesternTile': Coordinate
        'westTile': Coordinate
        'southEastTile': Coordinate
        'southWestTile': Coordinate
    }
}
