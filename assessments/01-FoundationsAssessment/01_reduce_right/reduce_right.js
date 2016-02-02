function reverse (arr) {
	var newArr = [];
	arr.forEach(function(el){
		newArr.unshift(el);
	});
	return newArr;
}


function reduceRight (arr, start, reducer) {
	arr = reverse(arr);
	var accumulated = start;
	arr.forEach(function(el){
		accumulated = reducer(accumulated, el);
	});
	return accumulated;
}

function reduceRightRecursive (arr, start, reducer) {
	if (!arr.length) return start;
	var smallerArr = arr.slice(0, -1);
	var newAccum = reducer(start, arr[arr.length - 1]);
	return reduceRightRecursive(smallerArr, newAccum, reducer);
}
