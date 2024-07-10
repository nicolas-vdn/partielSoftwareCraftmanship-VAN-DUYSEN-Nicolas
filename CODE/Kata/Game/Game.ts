import { Orientation, ResourceType } from "../enums/enums";
import { Map } from "../Map/Map";
import { Resource } from "../Resource/Resource";
import { Survivor } from "../Survivor/Survivor";

export class Game {
  private survivor: Survivor;
  private map: Map;

  private resources: Resource[];

  private runs: boolean;

  constructor(survivor: Survivor, map: Map) {
    this.survivor = survivor;
    this.map = map;
    this.resources = [];
    this.runs = true;
  }

  public nextFrame(): void {
    if (!this.runs) return console.log("La partie est terminée !");

    this.survivor.move();

    this.checkOutOfBounds();
  }

  public checkOutOfBounds() {
    const survivorCoordinates = this.survivor.getCoordinates();
    const mapSize = this.map.getSize();

    if (
      survivorCoordinates.find(
        (coordinate, index) => coordinate < 0 || coordinate > mapSize[index] - 1
      )
    ) {
      console.log("Vous êtes en dehors de la carte, vous avez perdu !");

      this.survivor.setHealth(0);
      this.setRunning(false);
    }
  }

  public setRunning(runs: boolean) {
    this.runs = runs;
  }

  public isRunning(): boolean {
    return this.runs;
  }

  public getResourceFromCoordinates(positionX: number, positionY: number) {
    const coordinates = JSON.stringify([positionX, positionY]);

    return this.resources.find(
      (resource: Resource) =>
        JSON.stringify(resource.getCoordinates()) === coordinates
    );
  }

  public addResource(resource: Resource) {
    const coordinates = resource.getCoordinates();
    if (this.getResourceFromCoordinates(coordinates[0], coordinates[1]))
      return console.log(
        "Une ressource existe déjà, veuillez supprimer celle-ci avant de continuer"
      );

    this.resources.push(resource);
  }
}
