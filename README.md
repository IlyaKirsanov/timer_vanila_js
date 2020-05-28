https://peaceful-neumann-710ffb.netlify.app/

# Timer (animated round timer)


Базовая конструкция страницы

```html
<body>
    <input type="text" id="duration" />
    <button id="start">Start</button>
    <button id="pause">Pause</button>
  </body>
```

Основная логика программы будет находится в классе Timer,  конструктор принимает данные ввода и кнопок старт / пауза.  В классе будет описание методов, которые будут навешиваться на кнопки

Event Listener должны быть добавлены кнопкам в конструкторе, чтобы при инициализации экземпляра, эти обработчики уже сразу были

```jsx
class Timer {
	constructor(durationInput, startButton, pauseButton) {
		this.durationInput = durationInput;
		this.startButton = startButton;
		this.pauseButton = pauseButton;

		this.startButton.addEventListener('click', this.start);
		this.pauseButton.addEventListener('click', this.pause);
	}

	start() {
		console.log('Start timer');
	}
}

const durationInput = document.getElementById('duration')
const start = document.getElementById('start')
const pause = document.getElementById('pause')

const timer = new Timer(durationInput, start, pause);
```

Нужен tick метод и вызываем его каждую секунду. Пока он ничего не делает. В методе старт мы вызываем this.tick(), чтобы сразу напечаталось что-то, а не ждать 1 секунду. Затем используем создание интервалов и передаем в this.interval т.к. сетинтервал отдает id таймера. Этот id нужен для сброса. Чтобы достучаться к этому айдишнику мы передаем его через this, так он становится доступен будто создан конструкторе и нам не нужно возвращать его в какую-то переменную из start. На кнопку паузы вешаем листенер и метод pause()

```jsx
	constructor(durationInput, startButton, pauseButton) {
		.......................
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
		console.log('tick')
	}
```

Хранение инфо сколько осталось времени 


```jsx
tick = () => {
		const timeRemainig = parseFloat(this.durationInput.value);
		this.durationInput.value = timeRemainig - 1;
}
```

method tick () будет считывать данные из инпута, передавать во временную переменную timeRemaining и возвращает обратно в value инпута уменьшив значение каждую секунду на 1. Старт и пауза теперь работают, можно изменить число в инпуте и таймер будет использовать новое значение 

[https://skr.sh/v2OkKrygp7q?a](https://skr.sh/v2OkKrygp7q?a)

Используя getter & setter  нужно изменить код:

```jsx
tick = () => {
		this.timeRemainig = this.timeRemainig - 1;
	}

	get timeRemainig() {
		return parseFloat(this.durationInput.value);
	}

	set timeRemainig(time) {
		this.durationInput.value = time;
	}
```

Добавим проверку, чтобы таймер не уходил в минус

```jsx
tick = () => {
		if (this.timeRemainig <= 0) {
			this.pause();
		} else {
			this.timeRemainig = this.timeRemainig - 1;
		}
	}
```

Готова основная логика таймера

```jsx
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
```

```html
<body>
    <input type="text" id="duration" value="30" />
    <button id="start">Start</button>
    <button id="pause">Pause</button>
  </body>
```
## Часть 2.

Чтобы дополнительно научить приложение общаться с внешним миром в конструктор будет опционально передаваться объект с несколькими методами. Таймер может работать и без этих callbacks, поэтому в конструкторе есть проверка на наличие дополнительного параметра.

```jsx
class Timer {
	constructor(durationInput, startButton, pauseButton, callbacks) {
		...

		if (callbacks) {
			this.onStart = callbacks.onStart;
		}

	...
	}
```

Передаем cb при создании таймера 

```jsx
const timer = new Timer(durationInput, start, pause, **{
	onStart() {
		console.log('Timer started')
	},
	onTick() {

	},
	onComplete() {

	}**
});
```

Далее в методе старт класса Таймер вызываем опциональный метод

```jsx
start = () => {
		if (this.onStart) {
			this.onStart();
		}
		this.tick();
		this.interval = setInterval(this.tick, 1000);

	}
```

Аналогично с onTick & onComplete

```jsx
//class Timer constructor
if (callbacks) {
			this.onStart = callbacks.onStart;
			this.onTick = callbacks.onTick;
			this.onComplete = callbacks.onComplete;
		}
```

```jsx
//class Timer
tick = () => {
		if (this.timeRemainig <= 0) {
			this.pause();
			if (this.onComplete) {
				this.onComplete();
			}
		} else {
			this.timeRemainig = this.timeRemainig - 1;
			if (this.onTick) {
				this.onTick();
			}
		}
	}
```

```jsx
const timer = new Timer(durationInput, start, pause, {
	onStart() {
		console.log('Timer started')
	},
	onTick() {
		console.log('Timer tick')
	},
	onComplete() {
		console.log('Timer finish')
	}
});
```

## SVG part

В body добавим svg 

```jsx
<svg height="400" width="400">
      <circle
        r="190"
        cx="200"
        cy="200"
        fill="transparent"
        stroke="blue"
        stroke-width="15"
        transform="rotate(-90 200 200)"
      />
    </svg>
```

в js найдем этот круг и поместим его в переменную

```jsx
const circle = document.querySelector('circle');
```

Идея в том, что у круга будет заполная окружность при помощи атрибута тега stroke-dasharrya. Этот атрибут принимает 2 значения, 1 - размер заполненного сегмента в пикселях и размер пустого пробела если передать ему только 1 параметр, то пустоты будут = заполненным, но в данном случае мы передадим ему туда длину всей окружности

```jsx
const perimetr = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimetr);

let currentOffset = 0;
```

currentOffset это то, что будет отвечать за отрисовку исчезновения сегментов. У тега  circle атрибут stroke-dashoffset отвечает за размер сегмента без заполненного цвета. Если ему задать отрицательную величину, то круг будет как будто исчезать по часовой стрелке. Для этого в cb onTick() будем передавать значение currentOffset  и постепенного его уменьшать каждую секунду на величину исчезающего сегмента в зависимости от выставленного таймера.

```jsx
const timer = new Timer(durationInput, start, pause, {
	...,
	onTick() {
		circle.setAttribute('stroke-dashoffset', currentOffset);
		currentOffset = currentOffset - 50
	},
	...
});
```

Для более плавной анимации нужно уменьшить время интервалов до 50 мсек 

this.interval = setInterval(this.tick, 50);

, остаток времени в tick () тоже уменьшать не на 1 сек, а на 0.05 сек, 

this.timeRemainig = this.timeRemainig - .05;

чтобы в поле вводе отображалась более менее нормальная цифра, нужно округлить в сеттере 

this.durationInput.value = time.toFixed(2);

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1565f9b7-513b-4d1c-9857-6a6fd331ac5e/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/1565f9b7-513b-4d1c-9857-6a6fd331ac5e/Untitled.png)

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/20202a83-0aa8-4ced-b9f7-f072e68786d7/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/20202a83-0aa8-4ced-b9f7-f072e68786d7/Untitled.png)

Используя формулы делаем изменения и обмен данными о начале отсчета, количестве секунд между классом и самим инстансом таймера, который будет отвечать за отрисовку и отправку атрибутов на  svg 

```jsx
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
			***this.onStart(this.timeRemainig);***
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
				***this.onTick(this.timeRemainig);***
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
```

```jsx
const durationInput = document.getElementById('duration')
const start = document.getElementById('start')
const pause = document.getElementById('pause')
const circle = document.querySelector('circle');

const perimetr = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimetr);

let duration;

const timer = new Timer(durationInput, start, pause, {
	**onStart(totalDuration) {
		duration = totalDuration;
	},
	onTick(timeRemaining) {
		circle.setAttribute('stroke-dashoffset',
			perimetr * timeRemaining / duration - perimetr
		);**

	},
	onComplete() {
		console.log('Timer finish')
	}
});
```

В финале изменим html и добавим стилей

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css"
    />
    <link rel="stylesheet" href="style.css" />
  </head>
  <body>
    <div class="timer">
      <div class="controls">
        <input id="duration" value="3" />
        <div>
          <button id="start"><i class="fas fa-play"></i></button>
          <button id="pause"><i class="fas fa-pause"></i></button>
        </div>
      </div>
      <svg class="dial">
        <circle
          fill="transparent"
          stroke="green"
          stroke-width="15"
          r="190"
          cx="0"
          cy="200"
          transform="rotate(-90 100 100)"
        />
      </svg>
    </div>

    <script src="timer.js" defer></script>
    <script src="index.js" defer></script>
  </body>
</html>
```

```css
.dial {
  height: 400px;
  width: 400px;
}

.timer {
  position: relative;
  display: inline-block;
}

* {
  font: inherit;
}

body {
  font-family: "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Fira Sans",
    "Droid Sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
}

.timer input {
  display: block;
  border: none;
  width: 240px;
  font-size: 90px;
  text-align: center;
}

.timer button {
  border: none;
  font-size: 36px;
  cursor: pointer;
}

.timer button:focus {
  outline: none;
}

.timer input:focus {
  outline: none;
}

.controls {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
```
