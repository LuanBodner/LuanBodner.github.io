class Config {}
Config.Level = 1
Config.Points = 0
Config.Fuel = 100
Config.Health = 100
Config.x = 400
Config.y = 1800
Config.Dead = false


var spaceShip

class FramesPerSecond extends Phaser.Text {
	constructor(game, x, y) {
		super(game, x, y, 'FPS 00')
		this.setStyle({
			font: 'bold 16px Arial',
			fill: 'white'
		})
		this.setShadow(3, 3, 'rgba(0, 0, 0, 0.5)', 2)
		this.anchor.setTo(0.5, 0.5)
		this.fixedToCamera = true
		this.startTime = Date.now()

		// controle de atualizacao do calculo e mostrador
		this.frames = 0
		this.nextUpdate = this.startTime + 500 // atualiza a cada 0,5 segundos
		this.accumulated = 0
	}

	update() {
		// calcula e mostra fps
		this.accumulated += 1000 / (Date.now() - this.startTime)
		this.frames++
			this.startTime = Date.now()

		if (Date.now() >= this.nextUpdate) {
			this.text = 'FPS ' + Math.floor(this.accumulated / this.frames)
			this.nextUpdate = this.startTime + 500
			this.accumulated = 0
			this.frames = 0
		}
	}
}

class PlayState extends GameState {
	preload() {

		this.game.load.image('Rock', 'assets/Rock.png')
		this.game.load.image('Spaceship', 'assets/Spaceship.png')
		this.game.load.image('Fuel', 'assets/Fuel.png')
		this.game.load.image('Exit', 'assets/Arrow.png')
		this.game.load.image('Star', 'assets/Star.png')
		this.game.load.image('Mud', 'assets/Mud.png')
		this.game.load.image('Thump', 'assets/Thump.png')
		this.game.load.image('Stone', 'assets/Stone.png')
		this.game.load.image('UFO', 'assets/UFO.png')
		this.game.load.image('Spike', 'assets/Spike.png')

		this.game.load.spritesheet('Bird', 'assets/Birds.png', 50, 38)

		this.game.load.audio('LevelMusic', 'assets/Level.mp3');
		this.game.load.audio('HitAudio', 'assets/Hit.mp3');
		this.game.load.audio('SlugAudio', 'assets/Slug.mp3');
		this.game.load.audio('BoostAudio', 'assets/Boost.mp3');
		this.game.load.audio('CoinAudio', 'assets/Coin.mp3');
		this.game.load.audio('FuelAudio', 'assets/Water.mp3');
		this.game.load.audio('TitleAudio', 'assets/TitleScreen.mp3');

		this.game.load.image('BackgroundLevel', 'assets/DaySky.jpg')
		this.game.load.image('End', `assets/End.jpg`);
		this.game.load.image('Fullscreen', `assets/Fullscreen.png`);

		let ll = "assets/Map" + Config.Level + ".json"

		this.game.load.tilemap('Level', ll, null, Phaser.Tilemap.TILED_JSON);

	}

	create() {

		this.game.physics.arcade.gravity.y = 100

		this.game.world.setBounds(0, 0, 1920, 1920);
		this.game.renderer.roundPixels = true
		this.game.physics.startSystem(Phaser.Physics.ARCADE)

		//Map and Background
		this.createBackground()
		this.createMap()
		this.createExit()

		//Player
		this.createPlayer()

		//Items
		this.createFuel()
		this.createStar()

		//Enemies
		this.createBird()
		this.createUFO()

		//Hazards		
		this.createSpike()
		this.createMud()
		this.createStone()
		this.createThump()

		//Hud
		this.createHUD()

		//Audio
		this.createAudio()
		this.playAudio()


		//this.fps = new FramesPerSecond(this.game, this.game.width / 2, 50)
		//this.game.add.existing(this.fps)
		super.initFullScreenButtons()

		gyro.frequency = 10;

		gyro.startTracking(function(o) {
			// updating player velocity
			spaceShip.body.angularVelocity = o.y * 100
			//console.log()
		});

	}

	createHUD() {

		this.fuelText = this.game.add.text(0, 0, "Fuel: " + spaceShip.fuel);
		this.speedText = this.game.add.text(0, 25, "Speed: " + spaceShip.speed);
		this.healthText = this.game.add.text(0, 50, "Health: " + spaceShip.health);
		this.pointText = this.game.add.text(0, 75, "Points: " + spaceShip.point);

		this.fuelText.fixedToCamera = true
		this.healthText.fixedToCamera = true
		this.speedText.fixedToCamera = true
		this.pointText.fixedToCamera = true
	}

	updateHUD() {

		this.fuelText.text = "Fuel: " + spaceShip.fuel
		this.speedText.text = "Speed: " + spaceShip.speed
		this.healthText.text = "Health: " + spaceShip.health
		this.pointText.text = "Points: " + spaceShip.point
	}

	createAudio() {

		this.musicLevel = this.game.add.audio('LevelMusic')
		this.hitEffect = this.game.add.audio('HitAudio', 0.25)
		this.slugEffect = this.game.add.audio('SlugAudio', 0.5)
		this.coinEffect = this.game.add.audio('CoinAudio', 0.3)
		this.fuelEffect = this.game.add.audio('FuelAudio', 0.3)
	}

	playAudio() {


		this.musicLevel.play()
		this.musicLevel.loopFull()

		if (Config.Dead == true) {
			this.musicLevel.play()
			this.musicLevel.loopFull()
			Config.Dead = false
		}
	}

	createPlayer() {

		spaceShip = new Player(this.game, 400, 1800, 'Spaceship')
		this.game.add.existing(spaceShip)
		this.game.camera.follow(spaceShip)

		spaceShip.point = Config.Points
		spaceShip.fuel = Config.Fuel
		spaceShip.health = Config.Health
	}

	createBackground() {

		this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height, 'BackgroundLevel')
		this.background.fixedToCamera = true
	}

	createMap() {

		this.mainMap = this.game.add.tilemap('Level');
		this.game.world.setBounds(0, 0, this.mainMap.widthInPixels, this.mainMap.heightInPixels);

		this.mapGroup = this.game.add.group()
		this.mainMap.createFromObjects('MapLayer', 1, 'Rock', 0, true, false, this.mapGroup, MapWall);
	}

	createExit() {

		this.exitMap = this.game.add.group()
		this.mainMap.createFromObjects('ExitLayer', 11, 'Exit', 0, true, false, this.exitMap, Exit)
	}

	createFuel() {

		this.fuelBonus = this.game.add.group()
		this.mainMap.createFromObjects('FuelLayer', 2, 'Fuel', 0, true, false, this.fuelBonus, Fuel)
	}

	createStar() {

		this.starBonus = this.game.add.group()
		this.mainMap.createFromObjects('StarLayer', 3, 'Star', 0, true, false, this.starBonus, Star)
	}

	createBird() {

		this.birdEnemy = this.game.add.group()
		this.mainMap.createFromObjects('BirdLayer', 4, 'Bird', 0, true, false, this.birdEnemy, Bird)
	}

	createUFO() {

		this.UFOEnemy = this.game.add.group()
		this.mainMap.createFromObjects('UfoLayer', 7, 'UFO', 0, true, false, this.UFOEnemy, UFO)
	}

	createMud() {

		this.mudHazard = this.game.add.group()
		this.mainMap.createFromObjects('MudLayer', 8, 'Mud', 0, true, false, this.mudHazard, Mud)
	}

	createStone() {

		this.stoneHazard = this.game.add.group()
		this.mainMap.createFromObjects('StoneLayer', 9, 'Stone', 0, true, false, this.stoneHazard, Stone)
	}

	createThump() {

		this.thumpHazard = this.game.add.group()
		this.mainMap.createFromObjects('ThumpLayer', 10, 'Thump', 0, true, false, this.thumpHazard, Thump)
	}

	createSpike() {

		this.spikeHazard = this.game.add.group()
		this.mainMap.createFromObjects('SpikeLayer', 6, 'Spike', 0, true, false, this.spikeHazard, Spike)
	}

	reFuel(spaceShip, fuelBonus) {

		fuelBonus.destroy()
		spaceShip.fuel += 100
		this.fuelEffect.play()
	}

	rePoint(spaceShip, starBonus) {

		starBonus.destroy()
		spaceShip.point += 100
		this.coinEffect.play()
	}

	flipBird(birdEnemy, mapGroup) {

		birdEnemy.offset *= -1
	}

	flipUFO(UFOEnemy, mapGroup) {

		UFOEnemy.offset *= -1
	}

	hitBird(spaceShip, birdEnemy) {

		spaceShip.health -= 10
		birdEnemy.destroy()

		this.game.camera.shake(0.05, 100);
		this.hitEffect.play()

	}

	hitUFO(spaceShip, UFOEnemy) {

		spaceShip.health -= 15
		UFOEnemy.destroy()

		this.game.camera.shake(0.05, 100);
		this.hitEffect.play()

	}

	slowDownSpaceship() {

		spaceShip.body.velocity.x = 0
		spaceShip.body.drag.set(10000)
		spaceShip.speed = 10
		if (!this.slugEffect.isPlaying)
			this.slugEffect.play()
	}

	hitStone(spaceShip, stoneHazard) {

		spaceShip.fuel = Math.floor(spaceShip.fuel / 2)

		let pointA = stoneHazard.position
		let pointB = spaceShip.position
		let dir = new Phaser.Point();

		Phaser.Point.subtract(pointB, pointA, dir)

		dir = dir.normalize()

		spaceShip.bounceValue = dir

		this.hitEffect.play()
	}

	loadNextLevel(spaceShip, map) {

		Config.Points = spaceShip.point
		Config.Fuel = spaceShip.fuel
		Config.Health = spaceShip.health

		this.game.camera.fade(0x000000, 1000)
		this.game.camera.onFadeComplete.add(this.changeLevel, this)
	}

	changeLevel() {

		Config.Level += 1
		this.game.camera.onFadeComplete.removeAll(this)
		this.musicLevel.stop()
		this.game.state.restart()
	}

	killSpaceship(a, b) {

		Config.Dead = true
		spaceShip.kill()

		this.musicLevel.stop()
		this.hitEffect.stop()
		this.slugEffect.stop()
		this.coinEffect.stop()
		this.fuelEffect.stop()
		spaceShip.boostEffect.stop()
		this.hitEffect.play()
		this.game.state.start('End')
	}

	update() {

		//Collide map
		this.game.physics.arcade.collide(spaceShip, this.exitMap, this.loadNextLevel.bind(this))
		this.game.physics.arcade.collide(spaceShip, this.mapGroup)
		this.game.physics.arcade.collide(this.thumpHazard, this.mapGroup)
		this.game.physics.arcade.collide(this.birdEnemy, this.mapGroup, this.flipBird.bind(this))
		this.game.physics.arcade.collide(this.UFOEnemy, this.mapGroup, this.flipUFO.bind(this))

		//Collide/Overlap Hazards
		this.game.physics.arcade.collide(this.spikeHazard, spaceShip, this.killSpaceship.bind(this))
		if (this.game.physics.arcade.overlap(this.mudHazard, spaceShip)) {
			this.slowDownSpaceship()
		}

		if (spaceShip.health <= 0) {
			this.killSpaceship(0, 0)
		}
		this.game.physics.arcade.collide(spaceShip, this.stoneHazard, this.hitStone.bind(this))
		this.game.physics.arcade.collide(spaceShip, this.thumpHazard, this.killSpaceship.bind(this))

		//Overlap items
		this.game.physics.arcade.overlap(spaceShip, this.fuelBonus, this.reFuel.bind(this))
		this.game.physics.arcade.overlap(spaceShip, this.starBonus, this.rePoint.bind(this))

		//Enemy movement
		this.game.physics.arcade.collide(spaceShip, this.birdEnemy, this.hitBird.bind(this))
		this.game.physics.arcade.collide(spaceShip, this.UFOEnemy, this.hitUFO.bind(this))


		this.background.tilePosition.x = -this.game.camera.x / 5
		this.background.tilePosition.y = -this.game.camera.y / 5
		this.updateHUD()
	}

	renderGroup(member) {

		this.game.debug.body(member)
	}

	render() {
		//this.mapGroup.forEachAlive(this.renderGroup, this)
		//this.game.debug.body(spaceShip)
		//this.game.debug.body(this.thumpHazard)
		//this.mudHazard.forEachAlive(this.renderGroup, this)
		//this.stoneHazard.forEachAlive(this.renderGroup, this)
		//this.spikeHazard.forEachAlive(this.renderGroup, this)

		//this.game.debug.pointer(this.game.input.pointer1);

	}
}

window.onload = function() {
	// funciona como singleton
	const GAME = new Game()
}