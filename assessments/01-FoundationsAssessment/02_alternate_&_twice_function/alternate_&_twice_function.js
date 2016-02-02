// specs did not always test `this`, return val, or arguments, but this is the correct way to wire up these inner function calls: `return originalFunc.apply(this, arguments);`.

function alternate (originalFunc) {
	var i = 0;
	return function alternator () {
		i++;
		if (i % 2) return originalFunc.apply(this, arguments);
	}
}

function twice (originalFunc) {
	var i = 0;
	return function twoTimer () {
		i++;
		if (i > 2) return 0;
		return originalFunc.apply(this, arguments);
	};
}
