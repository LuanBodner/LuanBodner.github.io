class TitleState extends GameState {

	preload() {
		this.game.load.image('Title', 'assets/Title.jpg')
		this.game.load.image('Name', 'assets/Name.png')
		this.game.load.audio('TitleAudio', 'assets/TitleScreen.mp3');
		this.game.load.image('Fullscreen', `assets/Fullscreen.png`);

	}
	create() {

		super.create()
		this.isFinished = false
		this.bmd = this.game.make.bitmapData();
		this.bmd.load('Title').cls();
		this.bmd.addToWorld(this.game.world.centerX,
			this.game.world.centerY, 0.5, 0.5, 0, 0);

		this.game.stage.smoothed = false;

		this.titleEffect = this.game.add.audio('TitleAudio', 0.3)
		this.titleEffect.play()

		this.area = new Phaser.Rectangle(0, this.bmd.height,
			this.bmd.width, 1);

		this.dropTime = this.game.time.now - 500;

		super.initFullScreenButtons()
	}

	update() {

		if (this.area.y > 0 && this.game.time.now > this.dropTime) {
			for (var y = 0; y < this.area.y; y = y + 5) {
				this.bmd.copyRect('Title', this.area, 0, y);
			}

			this.area.y -= 5;
			this.dropTime = this.game.time.now;
		} else if (this.isFinished == false) {
			this.isFinished = true
			this.createText();
		}
	}

	createText() {

		this.pressStart = this.game.add.text(0, 0, 'Touch to begin', {
			fontSize: '16px',
			fill: '#ffffff'
		})
		this.pressStart.anchor.setTo(0.5, 0.5)
		this.pressStart.x = this.game.width / 2
		this.pressStart.y = this.game.height / 2 + 100

		this.titleName = this.game.add.image(50, 100, 'Name');

		//let startButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
		//startButton.onDown.add(this.startFade, this)

		this.game.input.onDown.add(this.startFade, this)

	}

	startFade() {

		if (!this.pressed) {
			this.pressed = true
			this.game.camera.fade(0x000000, 1000)
			this.game.camera.onFadeComplete.add(this.startGame, this)
		}
	}

	startGame() {

		this.titleEffect.stop()
		this.game.camera.onFadeComplete.removeAll(this)
		this.game.state.start('IntroCutscene')
	}
}

class EndState extends GameState {
	preload() {
		this.game.load.image('End', `assets/End.jpg`);
	}
	create() {
		super.create()
		this.imgTitle = this.game.add.image(0, 0, 'End')
			//this.imgTitle.scale.setTo(1.0,1.0)
		this.imgTitle.anchor.setTo(0.5, 0.5)
		this.imgTitle.x = this.game.width / 2 - 35
		this.imgTitle.y = this.game.height / 2 - 50
		this.pressStart = this.game.add.text(0, 0, 'TOUCH to RESTART', {
			fontSize: '32px',
			fill: '#ffffff'
		})
		this.pressStart.anchor.setTo(0.5, 0.5)
		this.pressStart.x = this.game.width / 2
		this.pressStart.y = this.game.height / 2 - 150


		/* MUDAR PARA CELULAR */
		//let startButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
		//startButton.onDown.add(this.startFade, this)
		this.game.input.onDown.add(this.startFade, this)

		this.imgTitle.alpha = 0.3
		this.game.add.tween(this.imgTitle).to({
			alpha: 1
		}, 2000).to({
			alpha: 0.3
		}, 2000).loop(-1).start()
		this.game.add.tween(this.pressStart).to({
			alpha: 0
		}, 500).to({
			alpha: 1
		}, 500).loop(-1).start()
		this.pressed = false
	}
	startFade() {
		if (!this.pressed) {
			this.pressed = true
			this.game.camera.fade(0x000000, 1000)
			this.game.camera.onFadeComplete.add(this.startGame, this)
		}
	}
	startGame() {
		//Config.Level = 1
		Config.Fuel = 100
		Config.Health = 100
		Config.Points = 0
		this.game.camera.onFadeComplete.removeAll(this)
		this.game.state.start('Play')
	}
	update() {}
}

class WinState extends GameState {
	preload() {
		this.game.load.image('Win', `assets/NightSky.jpg`);
	}
	create() {
		super.create()
		this.imgTitle = this.game.add.image(0, 0, 'Win')
			//this.imgTitle.scale.setTo(1.0,1.0)
		this.imgTitle.anchor.setTo(0.5, 0.5)
		this.imgTitle.x = this.game.width / 2 - 35
		this.imgTitle.y = this.game.height / 2 - 50
		this.pressStart = this.game.add.text(0, 0, "YOU WIN!!", {
			fontSize: '64px',
			fill: '#ffffff'
		})
		this.pressStart.anchor.setTo(0.5, 0.5)
		this.pressStart.x = this.game.width / 2 - 20
		this.pressStart.y = this.game.height / 2 - 50


		/* MUDAR PARA CELULAR */
		//let startButton = this.game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
		//startButton.onDown.add(this.startFade, this)
		this.game.input.onDown.add(this.startFade, this)

		this.imgTitle.alpha = 0.3
		this.game.add.tween(this.imgTitle).to({
			alpha: 1
		}, 2000).to({
			alpha: 0.3
		}, 2000).loop(-1).start()
		this.game.add.tween(this.pressStart).to({
			alpha: 0
		}, 500).to({
			alpha: 1
		}, 500).loop(-1).start()
		this.pressed = false
	}
	startFade() {
		if (!this.pressed) {
			this.pressed = true
			this.game.camera.fade(0x000000, 1000)
			this.game.camera.onFadeComplete.add(this.startGame, this)
		}
	}
	startGame() {
		//Config.Level = 1
		Config.Fuel = 100
		Config.Health = 100
		Config.Points = 0
		this.game.camera.onFadeComplete.removeAll(this)
		this.game.state.start('Play')
	}
	update() {}
}


class IntroCutscene extends GameState {
	create() {
		super.create()

		this.content = [
			"Um dia, uma nave espacial estava investigando",
			"um planeta muito distante, em uma outra galáxia,",
			"tentando 'adquirir' a tecnologia mais avançada dos",
			"seus habitantes. Porém, esta nave foi descoberta",
			"e a tripulação foi capturada!",
			"A sua missão é guiar remotamente essa nave para",
			"o seu planeta original!",
			"",
			"",
			"BOA SORTE!"
		]

		this.line = []
		this.wordIndex = 0
		this.lineIndex = 0

		this.wordDelay = 120
		this.lineDelay = 400

		this.text = this.game.add.text(32, 32, '', {
			font: "32px Arial",
			fill: "#19de65"
		});

		this.nextLine()

	}

	nextLine() {

		if (this.lineIndex == this.content.length) {

			this.startFade()
		} else {

			this.line = this.content[this.lineIndex].split(' ')

			this.wordIndex = 0

			this.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this)
			this.lineIndex++
		}
	}

	nextWord() {

		this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");
		this.wordIndex++;

		if (this.wordIndex === this.line.length) {

			this.text.text = this.text.text.concat("\n");
			this.game.time.events.add(this.lineDelay, this.nextLine, this);
		}

	}

	startFade() {
		if (!this.pressed) {
			this.pressed = true
			this.game.camera.fade(0x000000, 1000)
			this.game.camera.onFadeComplete.add(this.startGame, this)
		}
	}
	startGame() {
		//Config.Level = 1
		Config.Fuel = 100
		Config.Health = 100
		Config.Points = 0
		this.game.camera.onFadeComplete.removeAll(this)
		this.game.state.start('Play')
	}
	update() {}
}

class EndingCutscene extends GameState {
	create() {
		super.create()

		this.content = [
			"Você conseguiu derrotar os alienígenas",
			"e as armadilhas que eles colocaram no seu caminho!",
			"Agora a nave espacial com a tecnologia secreta",
			"chegou ao seu planeta!",
			"",
			"",
			"Parabéns!",
		]

		this.line = []
		this.wordIndex = 0
		this.lineIndex = 0

		this.wordDelay = 120
		this.lineDelay = 400

		this.text = this.game.add.text(32, 32, '', {
			font: "32px Arial",
			fill: "#19de65"
		});

		this.nextLine()

	}

	nextLine() {

		if (this.lineIndex == this.content.length) {

			this.startFade()
		} else {

			this.line = this.content[this.lineIndex].split(' ')

			this.wordIndex = 0

			this.game.time.events.repeat(this.wordDelay, this.line.length, this.nextWord, this)
			this.lineIndex++
		}
	}

	nextWord() {

		this.text.text = this.text.text.concat(this.line[this.wordIndex] + " ");
		this.wordIndex++;

		if (this.wordIndex === this.line.length) {

			this.text.text = this.text.text.concat("\n");
			this.game.time.events.add(this.lineDelay, this.nextLine, this);
		}

	}

	startFade() {
		if (!this.pressed) {
			this.pressed = true
			this.game.camera.fade(0x000000, 1000)
			this.game.camera.onFadeComplete.add(this.startGame, this)
		}
	}
	startGame() {
		//Config.Level = 1
		Config.Fuel = 100
		Config.Health = 100
		Config.Points = 0
		this.game.camera.onFadeComplete.removeAll(this)
		this.game.state.start('Win')
	}
	update() {}
}