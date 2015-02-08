var PIXI = require("pixi");

import {rnd} from "./src/util";
import ai from "./src/system/ai";
import renderer from "./src/system/renderer";

var width = 800,
    height = 600;

function game(domRoot) {
  // Preload assets...
  var assets = [];
  for (var i = 1; i <= 7; ++i) {
    assets.push("img/ch" + i + ".png");
  }
  var assetLoader = new PIXI.AssetLoader(assets, false);
  assetLoader.once("onComplete", function() {
    var entities = [];

    // Create our minions
    for (var i = 0; i < 200; ++i) {
      entities.push(attachPosition(attachSprite({}, "ch" + (rnd(7) + 1)),
                    rnd(width/2) + width/4, rnd(height/2) + height/4));
    }

    var systems = [
      ai(),
      renderer(domRoot, width, height)
    ];

    var loop = function() {
      entities = step(entities, systems);
      requestAnimFrame(loop);
    };
    requestAnimFrame(loop);
  });
  assetLoader.load();
}

function step(entities, systems) {
  systems.forEach(function(system) {
    entities = system(entities);
  });
  console.log("Done with step");
  return entities;
}

function attachSprite(obj, name) {
  obj.sprite = {
    name: name
  };
  return obj;
}

function attachPosition(obj, x, y) {
  obj.position = {
    x: x,
    y: y
  };
  return obj;
}

export default game;
