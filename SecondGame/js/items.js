class Fuel extends Phaser.Sprite {
	constructor(game, x, y, asset) {
		super(game, x, y, asset)
		this.game.physics.arcade.enable(this)
		this.body.syncBounds = true
		this.body.immovable = true
		this.tag = 'Fuel'
		this.body.setSize(32,32)
	}

	update(){}
}

class Star extends Phaser.Sprite {
	constructor(game, x, y, asset) {
		super(game, x, y, asset)
		this.game.physics.arcade.enable(this)
		this.body.syncBounds = true
		this.body.immovable = true
		this.tag = 'Star'
		this.body.setSize(32,32)
	}

	update(){}
}