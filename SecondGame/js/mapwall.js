class MapWall extends Phaser.TileSprite {
	constructor(game, x, y, asset) {
		super(game, x, y, 32, 32, asset)
		this.game.physics.arcade.enable(this)
		this.body.syncBounds = true
		this.body.immovable = true
		this.tag = 'Rock'
	}
}

class Exit extends Phaser.TileSprite {
	constructor(game, x, y, asset) {
		super(game, x, y, 32, 32, asset)
		this.game.physics.arcade.enable(this)
		this.body.allowGravity = false
		this.body.immovable = true

		this.anchor.setTo(0.5, 0.5)

		this.tag = 'Exit'
	}
}