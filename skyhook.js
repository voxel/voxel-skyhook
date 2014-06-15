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
       transparent: true,
       displayName: 'Sky Hook',
       onUse: this.use.bind(this)
       });
};

Skyhook.prototype.disable = function() {
  // TODO
};


Skyhook.prototype.use = function(held, target) {
  var avatar = this.game.controls.target().avatar;

  var camera = this.game.cameraVector();

  var x = Math.round(avatar.position.x) + Math.round(camera[0]) * this.distance;
  var y = Math.round(avatar.position.y) + Math.round(camera[1]) * this.distance;
  var z = Math.round(avatar.position.z) + Math.round(camera[2]) * this.distance;

  if (this.game.getBlock([x, y, z]) !== 0) {
    console.log('skyhook blocked');
    return false;
  }

  if (!this.game.createBlock([x, y, z], this.registry.getBlockIndex('skyhook'))) {
    console.log('skyhook occupied');
    return false;
  }

  return true; // use up item
};
