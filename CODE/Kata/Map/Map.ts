export class Map {
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }

  public getSize(): number[] {
    return [this.width, this.height];
  }
}
