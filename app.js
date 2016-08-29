window.onload = function() {
	var countdown = null;
	var countdownSeconds = 0;
	var countdownPaused = false;

	// Grab the input and the button.
	var input = document.querySelector('input');

	input.addEventListener('input', onInputInput);
	input.addEventListener('focus', onInputFocus);
	input.addEventListener('keypress', onInputKeypress);
		
	function onInputKeypress(e) {
		if(e.keyCode === 13) {
			console.log('enter');
			startCountdown();
		}
	}

	function onInputFocus() {
		console.log('focus');
		countdownPaused = true;
	}

	function onInputInput() {

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
		var timestamp = 0;
		var secondsPattern = /[0-9]+s/i;
		var minutesPattern = /[0-9]+m/i;
		var hoursPattern   = /[0-9]+h/i;

		// Hours.
		var match = input.match(hoursPattern);
		if(match != null) {
			var str = match[0];
			var hours = str.substring(0, str.length - 1);
			timestamp += hours * 3600;
			input = input.substring(match.index + str.length);
		}

		// Minutes.
		var match = input.match(minutesPattern);
		if(match != null) {
			var str = match[0];
			var minutes = str.substring(0, str.length - 1);
			timestamp += minutes * 60;
			input = input.substring(match.index + str.length);
		}

		// Seconds.
		var match = input.match(secondsPattern);
		if(match != null) {
			var str = match[0];
			var seconds = str.substring(0, str.length - 1);
			timestamp += seconds * 1; // Watch out for this being appended as a string instead of added as a number.
			input = input.substring(match.index + str.length);
		}

		return timestamp;
	}

	function secondsToReadableString(seconds) {
		var readableString = '';
		var hours = 0;
		var minutes = 0;
		var hourInSeconds = 3600;
		var minuteInSeconds = 60;

		while(seconds > hourInSeconds) {
			hours++;
			seconds -= hourInSeconds;
		}

		while(seconds > minuteInSeconds) {
			minutes++;
			seconds -= minuteInSeconds;
		}

		if(hours > 0)
			readableString += hours + 'h';
		if(minutes > 0)
			readableString += minutes + 'm';

		readableString += seconds + 's';

		return readableString;
	}

	/***
	 * Start a countdown with `amount` number of milliseconds.
	 ***/
	function startCountdown() {
		countdownPaused = false;
		var input = document.querySelector('input');

		input.blur();

		if(!countdown)
			countdown = setInterval(countdownTick, 1000);
	};

	function pauseCountdown() {
		countdownPaused = true;	
	};

	function countdownTick() {
		var input = document.querySelector('input');
		var seconds = readableStringToSeconds(input.value);

		if(seconds === 0) {
			clearInterval(countdown);
			countdownDone();
		} else if(!countdownPaused) {
			seconds -= 1;
			input.value = secondsToReadableString(seconds);
		}
	}

	function countdownDone() {
		Notification.requestPermission()
			.then(function(result) {
				if(result === 'granted') {
					var notification = new Notification('Done!');
				}
			});
	}
}

