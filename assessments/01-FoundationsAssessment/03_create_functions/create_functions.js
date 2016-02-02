// function createFunction (num) {
// 	return function() {
// 		return num;
// 	}
// }
// function createFunctions (num) {
// 	var funcs = [];
// 	for (var i = 0; i < num; i++) {
// 		funcs.push(createFunction(i));
// 	}
// 	return funcs;
// }

// same idea as above but in an IIFE:
function createFunctions (num) {
	var funcs = [];
	for (var i = 0; i < num; i++) {
		funcs.push(function IIFE (fixedNum) {
			return function whatWeWant (){
				return fixedNum;
			};
		}(i)); // Immediately-Invoking the Function Expression
	}
	return funcs;
}
