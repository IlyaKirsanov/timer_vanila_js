# Timer (animated round timer)

![Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled.png](Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled.png)

![Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%201.png](Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%201.png)

![Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%202.png](Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%202.png)

![Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%203.png](Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%203.png)

![Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%204.png](Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%204.png)

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

![Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%205.png](Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%205.png)

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

В первом варианте данные хранятся в js коде

![Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%206.png](Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%206.png)

Тут данные будут лежать напрямую в html, более устаревший вариант работы

![Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%207.png](Timer%20animated%20round%20timer%20fd18c6d90727420084cc7c7941cd0480/Untitled%207.png)

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
