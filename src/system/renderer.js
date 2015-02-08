var PIXI = require("pixi");

export default function(root, w, h) {
  var stage = new PIXI.Stage(0x66CCFF);
  var renderer = PIXI.autoDetectRenderer(w, h, root);
  root.appendChild(renderer.view);

  return function(entities) {
    entities.forEach(function(entity) {
      if (entity.position && entity.sprite) {
        if (!entity.sprite.pixi) {
          var texture = PIXI.Texture.fromImage("img/" + entity.sprite.name + ".png");
          var sprite = new PIXI.Sprite(texture);
          stage.addChild(sprite);
          entity.sprite.pixi = sprite;
        }

        entity.sprite.pixi.position = entity.position;
      }
    });

    renderer.render(stage);

    return entities;
  };
}
