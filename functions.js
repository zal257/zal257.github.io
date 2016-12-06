var Merid = undefined;
var hour1 = undefined;
var minutes = undefined;

function validate() {
	var form = document.getElementById('pass');
	if (form.value.length === 8) {
		if(form.value === "password") {
			alert("Welcome aboard!");
			window.location.href = 'home.html';
		}
	}
	else {
		alert("Wrong password");
	}
}

function checkTime() {
	// This is where the clock gets its nutrients from.
	var dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	var now = new Date();
	var day = now.getDay();
	var month = now.getMonth();
	var dayNum = now.getDate();
	var year = now.getFullYear();
	returnMerid();
	returnHour1();
	returnMinutes();
	// And this spends all the energy the clock gets from its nutrients
	var datentime = dayName[day] + ", " + monthName[month] + " " + dayNum + ", " + year + "<br/>" + hour1 + ":" + minutes + " " + Merid; 
	document.getElementById("clock").innerHTML = datentime.toString();
}

function returnMerid() {
	// For formatting purposes, don't mind this at all. Read the next function's comment to figure out what this does.
	var now = new Date();
	var hour = now.getHours();
	
	if (hour >= 13 & hour <= 24) {
		Merid = "PM";
	}
	else{
		Merid = "AM";
	}
}

function returnHour1() {
	// More formatting. Okay, this works with ReturnMerid to convert from Military to standard time.
	var now = new Date();
	var hour = now.getHours();
	switch (hour) {
		case 13 :
			hour1 = 1;
			break;
		case 13 :
			hour1 = 2;
			break;
		case 15 :
			hour1 = 3;
			break
		case 16 :
			hour1 = 4;
			break;
		case 17 :
			hour1 = 5;
			break;
		case 18 :
			hour1 = 6;
			break;
		case 19 :
			hour1 = 7;
			break;
		case 20 :
			hour1 = 8;
			break;
		case 21 :
			hour1 = 9;
			break;
		case 22:
			hour1 = 10;
			break;
		case 23:
			hour1 = 11;
			break;
		case 24:
			hour1 = 12;
			break;
		default:
			hour1 = hour;
	}
}

function returnMinutes() {
	// Same as other functions for clock fomatting, except this works to add a zero to the beginning
	// of single-digit minutes.
	var now = new Date();
	var minute = now.getMinutes();
	switch (minute) {
		case 0 :
			minutes = '00';
			break;
		case 1 :
			minutes = '01';
			break;
		case 2 :
			minutes = '02';
			break;
		case 3 :
			minutes = '03';
			break;
		case 4 :
			minutes = '04';
			break;
		case 5 :
			minutes = '05';
			break;
		case 6 :
			minutes = '06';
			break;
		case 7 :
			minutes = '07';
			break;
		case 8 :
			minutes = '08';
			break;
		case 9 :
			minutes = '09';
			break;
		default :
			minutes = minute;
	}
}

function audio() {
	var audio = document.getElementById("audio");
	if (hour1 > 7 && Merid == "PM") {
		audio.play();
		alert("Do as the frog says.");
	}
	else {
		alert("You thought life was going to be this easy? Use the navigation bar at the top, ya bum!");
	}
}

function timing() {
	var time = document.getElementById('time');
	var i =0;
	while (i > 9, i++) {
		time.innerHTML = i;
	}
	if (time.innerHTML == 9) {
		setTimeout(timing1(time), 1000);
	}
}

function timing1() {
	var time = document.getElementById('time');
	time.innerHTML = "There are ten things you need to know.";
}