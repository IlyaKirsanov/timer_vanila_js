class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;

		if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}

		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}

	start = () => {
		if (this.onStart) {
			this.onStart(this.timeRemainig);
		}
		this.tick();
		this.interval = setInterval(this.tick, 50);

	}

	pause = () => {
		clearInterval(this.interval)
	}

	tick = () => {
		if (this.timeRemainig <= 0) {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		} else {
			this.timeRemainig = this.timeRemainig - .05;
			if (this.onTick) {
				this.onTick(this.timeRemainig);
			}
		}
	}

	get timeRemainig() {
		return parseFloat(this.durationInput.value);
	}

	set timeRemainig(time) {
		this.durationInput.value = time.toFixed(2);
	}
}
