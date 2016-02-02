// using loop
function interleave () {
	var result = '';
	var maxLength = 0;
	var strings = [].slice.call(arguments);
	for (var i = 0; i < arguments.length; i++) {
		maxLength = Math.max(arguments[i].length, maxLength);
	}
	for (var i = 0; i < maxLength; i++) {
		for (var j = 0; j < arguments.length; j++) {
			result += arguments[j].charAt(i);
		}
	}
	return result;
}

// using reduce
function interleave () {
	var strings = [].slice.call(arguments);
	var maxLength = strings.reduce(function (longestYet, str) {
		return Math.max(str.length, longestYet);
	}, 0);
	var result = '';
	for (var i = 0; i < maxLength; i++) {
		result = strings.reduce(function (soFar, str) {
			return soFar + str.charAt(i);
		}, result);
	}
	return result;
}

// // possible code for native reduce
// Array.prototype.reduce = function (fn, init) {
// 	var accum = init;
// 	for (var i = 0; i < this.length; i++) {
// 		accum = fn(accum, this[i]);
// 	}
// 	return accum;
// };