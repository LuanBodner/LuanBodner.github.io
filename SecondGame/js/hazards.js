class Spike extends Phaser.Sprite {
	constructor(game, x, y, asset) {
		super(game, x, y, asset)
		this.game.physics.arcade.enable(this)
		this.body.allowGravity = false

		this.anchor.setTo(0.5, 0.5)

		this.tag = 'Spike'

	}
	update() {

	}
}
class Mud extends Phaser.Sprite {
	constructor(game, x, y, asset) {
		super(game, x, y, asset)
		this.game.physics.arcade.enable(this)
		this.body.allowGravity = false

		this.anchor.setTo(0.5, 0.5)
		this.body.setSize(200, 200, 100, 100)
		this.tag = 'Mud'

	}
	update() {

	}
}

class Stone extends Phaser.Sprite {
	constructor(game, x, y, asset) {
		super(game, x, y, asset)
		this.game.physics.arcade.enable(this)
		this.body.allowGravity = false
		this.body.immovable = true
		this.anchor.setTo(0.5, 0.5)

		this.tag = 'Stone'

	}
	update() {

	}
}

class Thump extends Phaser.Sprite {
	constructor(game, x, y, asset) {
		super(game, x, y, asset)
		this.game.physics.arcade.enable(this)
		this.body.allowGravity = false
		this.anchor.setTo(0.5, 0.5)
		this.body.velocity.y = 100
		this.body.bounce.set(1,1);

		this.tag = 'Thump'

	}
	update() {


	}
}