window.onload = function() {

	// The interval ID.
	var timerID = null;

	// The amount of seconds remaining in the current timer.
	var timerSecondsRemaining = 0;

	// Is the timer currently paused?
	var timerIsPaused = false;

	// Attach various event listeners.
	attachListeners();

	function attachListeners() {
		var input = document.querySelector('input');
		input.addEventListener('focus', onInputFocus);
		input.addEventListener('keypress', onInputKeypress);
	}

	function onInputKeypress(e) {
		if(e.keyCode === 13) {
			startTimer();
		}
	}

	function onInputFocus() {
		timerIsPaused = true;
	}

	/***
	* Possible inputs to this function:
	* 
	* 60s
	* 10M30S
	* 1H20m30s
	* 1h
	***/
	function readableStringToSeconds(input) {
		var totalSeconds = 0;
		var secondsPattern = /[0-9]+s/i;
		var minutesPattern = /[0-9]+m/i;
		var hoursPattern   = /[0-9]+h/i;

		// Hours.
		var match = input.match(hoursPattern);
		if(match != null) {
			var str = match[0];
			var hours = str.substring(0, str.length - 1);
			totalSeconds += hours * 3600;
			input = input.substring(match.index + str.length);
		}

		// Minutes.
		var match = input.match(minutesPattern);
		if(match != null) {
			var str = match[0];
			var minutes = str.substring(0, str.length - 1);
			totalSeconds += minutes * 60;
			input = input.substring(match.index + str.length);
		}

		// Seconds.
		var match = input.match(secondsPattern);
		if(match != null) {
			var str = match[0];
			var seconds = str.substring(0, str.length - 1);

			// TODO: Don't assume data types.
			totalSeconds += seconds * 1;

			input = input.substring(match.index + str.length);
		}

		return totalSeconds;
	}

	function secondsToReadableString(seconds) {
		var readableString = '';
		var hours = 0;
		var minutes = 0;

		while(seconds > 3600) {
			hours++;
			seconds -= 3600;
		}

		while(seconds > 60) {
			minutes++;
			seconds -= 60;
		}

		if(hours > 0)
			readableString += hours + 'h';
		if(minutes > 0)
			readableString += minutes + 'm';

		readableString += seconds + 's';

		return readableString;
	}

	/***
	 * Start a timer with `amount` number of milliseconds.
	 ***/
	function startTimer() {
		timerIsPaused = false;
		var input = document.querySelector('input');

		input.blur();

		if(!timerID) {
			timerID = setInterval(timerTick, 1000);
		}
	};

	function pauseTimer() {
		timerIsPaused = false;
	};

	function timerTick() {
		var input = document.querySelector('input');
		var seconds = readableStringToSeconds(input.value);

		if(seconds === 0) {
			clearInterval(timerID);
			timerDone();
			reset();
		} else if(!timerIsPaused) {
			seconds -= 1;
			input.value = secondsToReadableString(seconds);
		}
	}

	function timerDone() {
		Notification.requestPermission()
			.then(function(result) {
				if(result === 'granted') {
					var notification = new Notification('Timr', {
						body: 'Done!',
						sticky: true
					});
				}
			});
	}

	function reset() {
		timerID = null;
		timerSecondsRemaining = 0;
		timerIsPaused = false;
	}
}

