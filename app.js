window.onload = function() {

	// Grab the input and the button.
	var input = document.querySelector('input');

	// Setup a change listener on the input.
	input.addEventListener('input', function(e) {
		checkInput(input.value);
		setFontSize(input);
	});

	startCountdown();
}

function checkInput(input) {
	var result = stringToSeconds(input);
	console.log(result);
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

	// Grab the amount of hours.
	var match = input.match(hoursPattern);
	if(match != null) {
		var str = match[0];
		var hours = str.substring(0, str.length - 1);
		timestamp += hours * 3600;
		input = input.substring(match.index, str.length);
	}

	// Grab the amount of minutes.
	var match = input.match(minutesPattern);
	if(match != null) {
		var str = match[0];
		var minutes = str.substring(0, str.length - 1);
		timestamp += minutes * 60;
		input = input.substring(match.index, str.length);
	}

	// Grab the amount of seconds.
	var match = input.match(secondsPattern);
	if(match != null) {
		var str = match[0];
		var seconds = str.substring(0, str.length - 1);
		timestamp += seconds;
		input = input.substring(match.index, str.length);
	}

	return timestamp;
}

function secondsToReadableString(seconds) {
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

	var string = '';

	if(hours > 0) string += hours + 'h';
	if(minutes > 0) string += minutes + 'm';

	string += seconds + 's';

	return string;
}

/***
 * Start a countdown with `amount` number of milliseconds.
 ***/
function startCountdown(amount) {
	var input = document.querySelector('input');
	var seconds = readableStringToSeconds(input.value);
	
	var countdown = setInterval(function() {
		if(seconds === 0) {
			clearInterval(countdown);
		} else {
			seconds -= 1;
			input.value = secondsToReadableString(seconds);
		}
	}, 1000);
};


function setFontSize(input) {
	var maxSize = 40;
	var numberOfCharacters = input.value.length || 1;
	var fontSize = maxSize / (numberOfCharacters);
	input.style.fontSize = fontSize + 'vw';
}
