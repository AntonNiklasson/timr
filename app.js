window.onload = function() {

	// Grab the input and the button.
	var input = document.querySelector('input');

	// Setup a change listener on the input.
	input.addEventListener('input', function(e) {
		checkInput(input.value);
		setFontSize(input);
	});

	// Initially call the conversion function
	checkInput(input.value);
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
function stringToSeconds(input) {

	var secondsPattern = /[0-9]+s/i;
	var minutesPattern = /[0-9]+m/i;
	var hoursPattern   = /[0-9]+h/i;

	var timestamp = 0;

	// Grab the amount of seconds.
	var match = input.match(secondsPattern);

	if(match) {
		
		// Grab the seconds, without the "s".
		var secondsString = match[0];
		var seconds = secondsString.substring(0, secondsString.length - 1);

		// Add milliseconds to the timestamp.
		timestamp += seconds;

		// Trim the input string.
		input = input.substring(match.index, secondsString.length);
	} else {
		console.warn('No match, input = ', input);
	}

	return timestamp;
}

/***
 * Start a countdown with `amount` number of milliseconds.
 ***/
function startCountdown(amount) {
	var secondsLeft = amount;
	var input = document.querySelector('input');

	var countdown = setInterval(function() {
		if(secondsLeft === 0) {
			clearInterval(countdown);
			console.log('Done! 😍');
		} else {
			secondsLeft -= 1;
			input.value = '3m' + secondsLeft + 's';
			console.log('Seconds left:', secondsLeft);
		}
	}, 1000);
};


function setFontSize(input) {
	var maxSize = 50;
	var numberOfCharacters = input.value.length || 1;
	var fontSize = maxSize / (numberOfCharacters);
	input.style.fontSize = fontSize + 'vw';
}
