var lat, lng, category, loop;
var canvas, ctx, bgimg;
var count = 0;
var ob1, ob2;
var charX, charY;
var up = false, down = false, left = false, right = false;
var bgloaded = false;

function initGame(nlat, nlng, ncategory) {
	canvas = document.getElementById('minigameCanvas');
	ctx = canvas.getContext('2d');
	lat = nlat;
	lng = nlng;
	category = ncategory;

	charX = 250;
	charY = 250;
	
	$(function() {
		$.getJSON('https://api.nasa.gov/planetary/earth/imagery?lon='+lng+'&lat='+lat+'&date=2014-02-01&cloud_score=True&api_key=YiSsr6JNgEpcszd0LoaIWsR4yGEv4OqemQMkwOMm',function(data) {
			var bgurl = data['url'];
			bgimg = new Image;
			bgimg.src = bgurl;
            bgloaded = true;
		});
	});
	
	ob1 = {
		img: null,
		x: 100,
		y: 100,
		touch: false
	};
	ob2 = {
		img: null,
		x: 300,
		y: 350,
		touch: false
	};
	console.log("Wildfires " + category);
	if (category == "Wildfires") {
		ob1.img = new Image;
		ob1.img.src = 'https://rawgithub.com/srafi2/spaceapps/master/img/fire.png';
		ob2.img = new Image;
		ob2.img.src = 'https://rawgithub.com/srafi2/spaceapps/master/img/fire.png';
	}

	loop = setInterval(update, 17);
}

function update() {
	if (down) charY++;
    if (up) charY--;
    if (right) charX++;
    if (left) charX--;
    
    if (charX > 100 && charX < 200 && charY > 100 && charY < 250) ob1.touch = true;
    if (charX > 300 && charX < 400 && charY > 350 && charY < 500) ob2.touch = true;
    if (ob1.touch && ob2.touch) {
        swal.enableButtons();
        var point = {lat: lat, lng:lng}
        var marker = new google.maps.Marker({
              position: point,
              map: map,
			  url: 'http://google.com',
	          icon: '/img/check.png'
        });
    }
    
	draw();
}

function draw() {
    ctx.clearRect(0,0, canvas.width, canvas.height);
	ctx.fillStyle = "#ffffff";
	ctx.fillRect(0, 0, 512, 512);
	if(bgloaded) {
        ctx.drawImage(bgimg, 0, 0);
    }   
	if (!ob1.touch) ctx.drawImage(ob1.img, ob1.x, ob1.y, 100, 140);
	if (!ob2.touch) ctx.drawImage(ob2.img, ob2.x, ob2.y, 100, 140);
console.log(charX + ", " + charY);
	ctx.fillRect(charX, charY, 20, 20);
}

function getkey(e) {
if ( window.event.keyCode == 37 ) {
	left = true;
}

if ( window.event.keyCode == 38 ) {
	up = true;
}

if ( window.event.keyCode == 39 ) {
	right = true;
}

if ( window.event.keyCode == 40 ) {
	down = true;
    console.log('down key pressed.')
    charY+= 10;
}

console.log(charX + ", " + charY);
}

function falsekey(e) {
if ( window.event.keyCode == 37 ) {
	left = false;
}

if ( window.event.keyCode == 38 ) {
	up = false;
}

if ( window.event.keyCode == 39 ) {
	right = false;
}

if ( window.event.keyCode == 40 ) {
	down = false;
    console.log('down key pressed.')
}

console.log(charX + ", " + charY);
}
