var Day = function(title){
	this.title = title;
	this.hotels = [];
	this.restaurants = [];
	this.activities = [];
}

var Day1 = new Day("Day 1");

var daysObj = {
	1 : Day1
}

var day = $('.current-day').text();


var removeButton = function(ref, index){
	return '\n' + '<button class="btn btn-xs btn-danger remove btn-circle" onclick="deleteEl('+ref+','+index+')">x</button>';
}

var addSpan = function(item, thing){
	return '<span id=' + thing + ' class="title">' + item + '</span>';
}


//click add restaurant
$('#hotels button').on('click', hotelAdd);
function hotelAdd(){
	$('#my-hotel').empty();
	//get value from select
	var value = $('#hotels select').val();
	//add the value to THAT days restaurants obj
	daysObj[day].hotels[0] = value;
	console.log(daysObj);
	//forEach value of the array, creates the <span>'s' with <button>
	daysObj[day].hotels.forEach(function(aHotel, index){
		$('#my-hotel').append(addSpan(aHotel, "hot"+index) + removeButton("hot"+index, index) + "<br>");
	});
}

$('#restaurants button').on('click', resAdd);
function resAdd(){
	$('#my-restaurants').empty();
	//get value from select
	var value = $('#restaurants select').val();
	//add the value to THAT days restaurants obj
	daysObj[day].restaurants.push(value);
	//forEach value of the array, creates the <span>'s' with <button>
	daysObj[day].restaurants.forEach(function(aRes, index){
		$('#my-restaurants').append(addSpan(aRes, "res"+index) + removeButton("res"+index, index) + "<br>");
	});
}

$('#activities button').on('click', actAdd);
function actAdd(){
	$('#my-activities').empty();
	//get value from select
	var value = $('#activities select').val();
	//add the value to THAT days restaurants obj
	daysObj[day].activities.push(value);
	//forEach value of the array, creates the <span>'s' with <button>
	daysObj[day].activities.forEach(function(aAct, index){
		$('#my-activities').append(addSpan(aAct, "act"+index) + removeButton("act"+index, index) + "<br>");
	});
}


function deleteEl(element, index){
	if($(element).attr('id').slice(0,3) === 'res'){
		daysObj[day].restaurants.splice(index,1);
	}
	if($(element).attr('id').slice(0,3) === 'act'){
		daysObj[day].activities.splice(index,1);
	}
	if($(element).attr('id').slice(0,3) === 'hot'){
		daysObj[day].hotels.splice(index,1);
	}

	$(element).next().remove();
	$(element).next().remove();
	$(element).remove();
}








