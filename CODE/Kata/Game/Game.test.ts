import { beforeAll, describe, expect, test } from "@jest/globals";
import { Orientation, ResourceType } from "../enums/enums";
import { Game } from "./Game";
import { Map } from "../Map/Map";
import { Survivor } from "../Survivor/Survivor";
import { Resource } from "../Resource/Resource";

describe("Le survivant et la carte existent tous deux, le survivant peut se déplacer mais peut également mourir s'il sort de la carte", () => {
  let game: Game;
  let survivor: Survivor;
  let map: Map;

  beforeAll(() => {
    survivor = new Survivor(0, 0, Orientation.SOUTH, 100);

    map = new Map(10, 10);

    game = new Game(survivor, map);
  });

  test("Le survivant existe et est orienté vers le sud", () => {
    expect(survivor).not.toBe(null);

    expect(survivor.getOrientation()).toBe("Sud");
  });

  test("Le survivant se déplace deux fois vers le sud, une fois vers l'est et arrive en position 1-2", () => {
    game.nextFrame();
    game.nextFrame();

    survivor.setOrientation(Orientation.EAST);

    game.nextFrame();

    expect(survivor.getCoordinates()).toStrictEqual([1, 2]);
  });

  test("Le survivant se déplace maintenant deux fois vers l'ouest et meurt, la partie est terminée.", () => {
    survivor.setOrientation(Orientation.WEST);

    game.nextFrame();

    game.nextFrame();

    expect(survivor.isAlive()).toBe(false);

    expect(game.isRunning()).toBe(false);
  });

  test("Le survivant est replacé en 9-9, est réanimé et la partie est relancé. Il se déplace vers le sud et meurt.", () => {
    game.setRunning(true);
    survivor.setAlive(true);

    survivor.setPositionX(9);
    survivor.setPositionY(9);

    survivor.setOrientation(Orientation.SOUTH);

    game.nextFrame();

    expect(survivor.isAlive()).toBe(false);

    expect(game.isRunning()).toBe(false);
  });
});

describe("Des ressources sont disposées aléatoirement sur la carte, si le joueur marche dessus il les ajoute à son inventaire", () => {
  let survivor: Survivor;
  let map: Map;
  let game: Game;

  beforeAll(() => {
    survivor = new Survivor(0, 0, Orientation.SOUTH, 100);

    map = new Map(10, 10);

    game = new Game(survivor, map);
  });

  test("Une ressource 'arme' et une ressource 'nourriture' sont ajoutées aux mêmes coordonnées 0-5 mais une seule reste (la première arrivée)", () => {
    const resourceWeapon = new Resource(0, 5, ResourceType.WEAPON);
    const resourceFood = new Resource(0, 5, ResourceType.FOOD);

    game.addResource(resourceWeapon);

    game.addResource(resourceFood);

    const resourceAt05 = game.getResourceFromCoordinates(0, 5);

    console.log(resourceAt05);
    expect(resourceAt05).not.toBe(undefined);

    if (resourceAt05)
      expect(resourceAt05.getResourceType()).toBe(ResourceType.WEAPON);
    else expect(true).toBe(false);
  });
});
