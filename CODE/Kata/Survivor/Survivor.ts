import { Orientation } from "../enums/enums";

export class Survivor {
  private positionX: number;
  private positionY: number;
  private orientation: Orientation;
  private health: number;
  private alive: boolean;

  constructor(
    positionX: number,
    positionY: number,
    orientation: Orientation,
    health: number
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.orientation = orientation;
    this.health = health;
    this.alive = true;
  }

  public setOrientation(orientation: Orientation): void {
    this.orientation = orientation;
  }

  public getOrientation(): Orientation {
    return this.orientation;
  }

  public move(): void {
    let positionX = this.getPositionX();
    let positionY = this.getPositionY();

    switch (this.getOrientation()) {
      case Orientation.NORTH:
        positionY -= 1;
        break;
      case Orientation.SOUTH:
        positionY += 1;
        break;
      case Orientation.WEST:
        positionX -= 1;
        break;
      case Orientation.EAST:
        positionX += 1;
        break;
    }

    this.setPositionX(positionX);
    this.setPositionY(positionY);
  }

  public getPositionX(): number {
    return this.positionX;
  }

  public setPositionX(positionX: number): void {
    this.positionX = positionX;
  }

  public getPositionY(): number {
    return this.positionY;
  }

  public setPositionY(positionY: number): void {
    this.positionY = positionY;
  }

  public getCoordinates(): number[] {
    return [this.positionX, this.positionY];
  }

  public setHealth(health: number): void {
    this.health = health;

    this.updateStatus();
  }

  public getHealth(): number {
    return this.health;
  }

  public updateStatus(): void {
    if (!this.alive || this.health <= 0) {
      this.setAlive(false);
    }
  }

  public setAlive(alive: boolean) {
    this.alive = alive;
  }

  public isAlive(): boolean {
    return this.alive;
  }
}
