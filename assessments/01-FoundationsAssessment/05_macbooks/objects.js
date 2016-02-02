
function Laptop (year, hd) {
	this.year = year;
	this.hd = hd;
};

Laptop.prototype.checkSpecs = function () {
	return 'Year: ' + this.year + ', HD: ' + this.hd;
};

var Macbook = function (year, hd, color) {
	this.color = color;
	// pass the current macbook instance into the Laptop constructor as `this` so that it gets everything a laptop gets.
	Laptop.apply(this, [year, hd]);
};

// child.someMethodFromParentClass -> not on child, so looks at:
// child.__proto__ -> this is child.prototype as usual
// child.prototype.someMethodFromParentClass -> not on child.prototype, so:
// child.prototype.__proto__ -> want this to be parent.prototype
// how? as follows:

var extendWithObjectCreate = function (child, parent) {
	child.prototype = Object.create(parent.prototype);
};

// or:

var extendWithNewKeyword = function (child, parent) {
	child.prototype = new parent();
};
