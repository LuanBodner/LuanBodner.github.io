class Player extends Phaser.Sprite {
	constructor(game, x, y, asset) {
		super(game, x, y, asset)

		this.anchor.setTo(0.5, 0.5)
		this.inputEnabled = true
		this.scale.setTo(0.08)

		this.boostEffect = this.game.add.audio('BoostAudio', 0.3)

		this.game.physics.arcade.enable(this)
		this.body.maxVelocity.set(300)

		this.keys = {
			up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
			left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
			right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
			down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
			boost: this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
		}

		this.angle = 270
		this.body.setSize(300, 650, 195, 0)
		this.body.collideWorldBounds = true;

		this.fuel = 100
		this.speed = 100
		this.bounceValue = new Phaser.Point(0, 0)
		this.health = 100
		this.point = 0
	}

	addPlayerLevel(level) {
		this.playerLevel = level
	}

	update() {

		if ((this.keys.boost.isDown || this.game.input.pointer1.isDown) && this.fuel >= 1) {
			this.speed = this.speed + 100
			this.fuel = this.fuel - 1

			if (!this.boostEffect.isPlaying)
				this.boostEffect.play()

			if (this.speed >= 1000)
				this.speed = 1000
		} else if (this.speed > 100) {
			this.boostEffect.stop()
			this.speed = this.speed - 200
			if (this.speed <= 100)
				this.speed = 100
		}

		this.game.physics.arcade.accelerationFromRotation(
			this.rotation, this.speed, this.body.acceleration)

		this.body.acceleration.x += this.bounceValue.x * 4000
		this.body.acceleration.y += this.bounceValue.y * 4000

		this.bounceValue.x *= 0.75
		this.bounceValue.y *= 0.75
/*
		if (this.keys.left.isDown) {
			this.body.angularVelocity = o.y
		} else
		if (this.keys.right.isDown) {
			this.body.angularVelocity = o.y
		} else {
			this.body.angularVelocity = 0
		}
*/
		if (this.speed < 100)
			this.speed = 100

	}

}