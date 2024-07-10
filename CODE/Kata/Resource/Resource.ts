import { ResourceType } from "../enums/enums";

export class Resource {
  private positionX: number;
  private positionY: number;
  private resourceType: ResourceType;

  constructor(
    positionX: number,
    positionY: number,
    resourceType: ResourceType
  ) {
    this.positionX = positionX;
    this.positionY = positionY;
    this.resourceType = resourceType;
  }

  public getCoordinates(): number[] {
    return [this.positionX, this.positionY];
  }

  public getResourceType(): ResourceType {
    return this.resourceType;
  }
}
