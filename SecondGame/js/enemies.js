class Bird extends Phaser.Sprite {
	constructor(game, x, y, asset) {
		super(game, x, y, asset)
		this.game.physics.arcade.enable(this)
		this.body.allowGravity = false

		this.anchor.setTo(0.5, 0.5)

		this.tag = 'Bird'
		this.offset = 1

		this.animations.add('move')
		this.animations.play('move', 5, true)

	}
	update() {

		this.scale.x = this.offset
		this.body.x += this.offset * 2
	}
}

class UFO extends Phaser.Sprite {
	constructor(game, x, y, asset) {
		super(game, x, y, asset)
		this.game.physics.arcade.enable(this)
		this.body.allowGravity = false

		this.anchor.setTo(0.5, 0.5)

		this.tag = 'UFO'
		this.offset = 1

	}
	update() {

		this.body.y += this.offset * 2
	}
}