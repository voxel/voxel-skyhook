'use strict';

module.exports = function(game, opts) {
  return new Skyhook(game, opts);
};

function Skyhook(game, opts) {
  this.game = game;
  this.distance = opts.distance || 2;
  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-skyhook requires voxel-registry plugin');

  this.enable();
}

Skyhook.prototype.enable = function() {
  this.registry.registerBlock('skyhook', 
      {texture: 'cauldron_bottom', // TODO
       displayName: 'Sky Hook',
       onUse: this.use.bind(this)
       });
};

Skyhook.prototype.disable = function() {
  // TODO
};


Skyhook.prototype.use = function(held, target) {
  var avatar = this.game.plugins.get('voxel-player').avatar;

  var camera = this.game.cameraVector();

  var x = Math.round(avatar.position.x) + Math.round(camera[0]) * this.distance;
  var y = Math.round(avatar.position.y) + Math.round(camera[1]) * this.distance;
  var z = Math.round(avatar.position.z) + Math.round(camera[2]) * this.distance;

  console.log('USING SKYHOOK',x,y,z);

  if (!this.game.createBlock([x, y, z], this.registry.getBlockID('skyhook'))) {
    console.log('skyhook occupied');
    return undefined; // failed to place, nothing taken
  }

  return 1; // use up item
};
