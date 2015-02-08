var PIXI = require("pixi");

export default function(root, w, h) {
  var stage = new PIXI.Stage(0x66CCFF);
  var renderer = PIXI.autoDetectRenderer(w, h, root);
  root.appendChild(renderer.view);

  return function(entities) {
    stage.removeChildren();

    var visibles = entities.filter(function(entity) {
      return entity.position && entity.sprite;
    });
    visibles.sort(function(l, r) {
      return l.position.y - r.position.y;
    });

    visibles.forEach(function(entity) {
      var texture = PIXI.Texture.fromImage("img/" + entity.sprite.name + ".png");
      var sprite = new PIXI.Sprite(texture);
      stage.addChild(sprite);
      sprite.position = entity.position;
    });

    renderer.render(stage);

    return entities;
  };
}
