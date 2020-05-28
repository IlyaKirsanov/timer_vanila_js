
const durationInput = document.getElementById('duration')
const start = document.getElementById('start')
const pause = document.getElementById('pause')

const timer = new Timer(durationInput, start, pause, {
	onStart() {
		console.log('Timer started')
	},
	onTick() {
		console.log('Timet tick')
	},
	onComplete() {
		console.log('Timer finish')
	}
});

