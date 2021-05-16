import { Coordinate } from './coordinate.model';

describe('Coordinate', () => {
  it('should create an instance', () => {
    expect(new Coordinate(1, -1, 0)).toBeTruthy();
  });
});
