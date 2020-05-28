
const durationInput = document.getElementById('duration')
const start = document.getElementById('start')
const pause = document.getElementById('pause')
const circle = document.querySelector('circle');

const perimetr = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimetr);

let duration;

const timer = new Timer(durationInput, start, pause, {
	onStart(totalDuration) {
		duration = totalDuration;
	},
	onTick(timeRemaining) {
		circle.setAttribute('stroke-dashoffset',
			perimetr * timeRemaining / duration - perimetr
		);


	},
	onComplete() {
		console.log('Timer finish')
	}
});

