class Timer {
	constructor(durationInput, startButton, pauseButton) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;

		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}

	start = () => {
		this.tick();
		this.interval = setInterval(this.tick, 1000);

	}

	pause = () => {
		clearInterval(this.interval)
	}

	tick = () => {
		if (this.timeRemainig <= 0) {
			this.pause();
		} else {
			this.timeRemainig = this.timeRemainig - 1;
		}
	}

	get timeRemainig() {
		return parseFloat(this.durationInput.value);
	}

	set timeRemainig(time) {
		this.durationInput.value = time;
	}
}

const durationInput = document.getElementById('duration')
const start = document.getElementById('start')
const pause = document.getElementById('pause')

const timer = new Timer(durationInput, start, pause);

