'use strict';

module.exports = function(game, opts) {
  return new Skyhook(game, opts);
};

function Skyhook(game, opts) {

  this.registry = game.plugins.get('voxel-registry');
  if (!this.registry) throw new Error('voxel-skyhook requires voxel-registry plugin');

  this.enable();
}

Skyhook.prototype.enable = function() {
  this.registry.registerBlock('skyhook', 
      {texture: 'iron_block', // TODO
       displayName: 'Sky Hook',
       onUse: this.use.bind(this)
       });
};

Skyhook.prototype.disable = function() {
  // TODO
};

Skyhook.prototype.use = function(held, target) {
  console.log('USING SKYHOOK');
};
