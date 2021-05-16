export class Coordinate {
    x: number;
    y: number;
    z: number;

    constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
    }

    isEqual(coords: Coordinate): boolean {
        if(this.x == coords.x &&
            this.y == coords.y &&
            this.z == coords.z){
                return true;
        }
        return false;
    }

    isEqualComponents(x: number, y: number, z:number): boolean {
        if(this.x == x && this.y == y && this.z == z) return true
        return false
    }
    
    getNorthWest(){
        return new Coordinate(this.x, this.y+1, this.z-1);
    }

    getNorthEast(){
        return new Coordinate(this.x+1, this.y, this.z-1);
    }

    getEast() {
        return new Coordinate(this.x+1, this.y-1, this.z);
    }

    getSouthEast() {
        return new Coordinate(this.x, this.y-1, this.z+1);
    }

    getSouthWest(){
        return new Coordinate(this.x-1, this.y, this.z+1);
    }

    getWest(){
        return new Coordinate(this.x-1, this.y+1, this.z);
    }
}
