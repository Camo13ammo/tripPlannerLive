var vowels = {
	a: true,
	e: true,
	i: true,
	o: true,
	u: true
}

// function vowelsCount (str) {
// 	var chars = str.split(''),
// 			count = 0;

// 	chars.forEach(function(char){
// 		if (vowels[char.toLowerCase()]) count++;
// 	});

// 	return count;
// }

// function vowelsCount (str) {
// 	var chars = str.split('');
// 	return chars.reduce(function(sum, char){
// 		return sum + (vowels[char.toLowerCase()] ? 1 : 0);
// 	}, 0);
// }

function vowelsCount (str) {
	var matches = str.match(/[aeiou]/ig);
	return matches ? matches.length : 0;
}
