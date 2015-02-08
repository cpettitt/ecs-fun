import {rnd} from "../util";

export default function() {
  return function(entities) {
    entities.forEach(function(entity) {
      if (entity.position) {
        var delta = rnd(5) - 2;
        if (rnd(2)) {
          entity.position.x += delta;
        } else {
          entity.position.y += delta;
        }
      }
    });
    return entities;
  };
}

