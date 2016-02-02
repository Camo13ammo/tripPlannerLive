// keyAdder function always is called with a specific context (i.e. `this`)
// it doesn't rely on arguments

function keyAdder () {
	var total = 0;

	for (var key in this) {
		if (this.hasOwnProperty(key) && typeof this[key] === 'number') {
			total += this[key];
		}
	}

	return total;
};
