var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var arc = 16;
// Hình con rắn và mồi
var ran ={
    x: 160,
    y: 160,
    dx: arc,
    dy: 0,      
    cells: [],
    maxCells: 1,
}
var count = 0;
var moi ={
    x: 320,
    y: 320,
}
var score = 0;

function getRandomInt(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}
function tocdo(){
    requestAnimationFrame(tocdo);
    if (++count <5) // Tốc độ rắn
	{
    return;
}   
    count = 0;
    context.clearRect(0,0,canvas.width,canvas.height);
    ran.x += ran.dx;
    ran.y += ran.dy;
    if (ran.x < 0) {
    ran.x = canvas.width - arc;
}
    else if (ran.x >= canvas.width) {
		ran.x = 0;
    }
    if (ran.y < 0) {
		ran.y = canvas.height - arc;
}
    else if (ran.y >= canvas.height) {
		ran.y = 0;
}
    ran.cells.unshift({x: ran.x, y: ran.y});
    if (ran.cells.length > ran.maxCells) {
		ran.cells.pop();
}
    context.fillStyle = 'red';
    context.fillRect(moi.x, moi.y, arc-1, arc-1);
    context.fillStyle = 'green';
    ran.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, arc-1, arc-1);
    if (cell.x === moi.x && cell.y === moi.y) {
		ran.maxCells++;
		moi.x = getRandomInt(0, 25) * arc;
		moi.y = getRandomInt(0, 25) * arc;
    }
    for (var i = index + 1; i < ran.cells.length; i++) {
    if (cell.x === ran.cells[i].x && cell.y === ran.cells[i].y) {
		ran.x = 160;
        ran.y = 160;
        ran.cells = [];
        ran.maxCells = 1;
        ran.dx = arc;
        ran.dy = 0;
        moi.x = getRandomInt(0, 25) * arc;
        moi.y = getRandomInt(0, 25) * arc;
        
      }
    }
  });
}

document.addEventListener('keydown', function(e) {
    if (e.which === 37 && ran.dx === 0) {  //tren
		ran.dx = -arc;
		ran.dy = 0;
}
    else if (e.which === 38 && ran.dy === 0) { //trai
		ran.dy = -arc;
		ran.dx = 0;
}
    else if (e.which === 39 && ran.dx === 0) { //phai
		ran.dx = arc;
		ran.dy = 0;
}
    else if (e.which === 40 && ran.dy === 0) { //duoi
		ran.dy = arc;
		ran.dx = 0;
    }
});
requestAnimationFrame(tocdo);
