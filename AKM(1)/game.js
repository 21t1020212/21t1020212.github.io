var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
var banh={
    x: 20,
    y: 20,
    dx: 5,
    dy:2,
    bankinh:10
};
var paddle = {
    width:70,
    height:10,
    x: 0,y: canvas.height -10, speed: 10,
    IsNovingLeft:false,
    IsNovingRight:false
};
var isGameOver = false;
var BrickConfig ={
    OFFSETX:15,
    OFFSETy:15,
    MARGIN:15,
    width:60,
    height:10,
    totalrow:5,
    totalcol:13
};
var BrickList =[];
for(var i = 0; i<BrickConfig.totalrow; i++){
    for(var j =0; j< BrickConfig.totalcol; j++){
        BrickList.push({
            x: BrickConfig.OFFSETX + j * (BrickConfig.width+BrickConfig.MARGIN),
            y:BrickConfig.OFFSETy + i * (BrickConfig.width+BrickConfig.MARGIN),
         IsBroken:false
        });
    }
}

document.addEventListener('keyup',function(event){
    console.log('KEY UP');
    console.log(event);
    if(event.keyCode ==37){
        paddle.IsNovingLeft = false;
    } else if(event.keyCode ==39){
        paddle.IsNovingRight = false;
    }
});

document.addEventListener('keydown',function(event){
    console.log('KEY DOWN');
    console.log(event);

    if(event.keyCode ==37){
        paddle.IsNovingLeft = true;
    } else if(event.keyCode ==39){
        paddle.IsNovingRight = true;
    }
});

function bóng(){
    context.beginPath();
context.arc(banh.x, banh.y,banh.bankinh, 0, Math.PI * 2);
context.fillStyle = 'green';
context.fill();
context.closePath();
}
function drawPaddle(){
    context.beginPath();
context.rect(paddle.x, paddle.y, paddle.width,paddle.height);
context.fill();
context.closePath();
}
// 2 * OFSET + 10 * WIDTH + 8 * MARGIN =1000
// OFFSET = MARGIN =15
// WIDTH :60
// ROW = 5
// COL = 14
function drawBricks(){
    BrickList.forEach(function(b){
        if(!b.IsBroken){
            context.beginPath();
            context.rect(b.x,b.y,BrickConfig.width,BrickConfig.heigh );
            context.fill();
            context.closePath();}
            });
        }
            

function handleBallCollideBounds(){
     if(banh.x < banh.bankinh|| banh.x > canvas.width - banh.bankinh){
    banh.dx = -banh.dx;
} 
if(banh.y < banh.bankinh){
    banh.dy = -banh.dy;
}

}
function handleBallCollidePaddle(){
    if(banh.x + banh.bankinh >= paddle.x && banh.x + banh.bankinh <= paddle.x + paddle.width &&
        banh.y + banh.bankinh >= canvas.height - paddle.height){
            banh.dy = -banh.dy;
        }
}
function handleBallCollideBricks(){
     BrickList.forEach(function(b){
        if(!b.IsBroken){
             if(banh.x >= b.x && banh.x <= b.x + BrickConfig.width &&
                banh.y + banh.bankinh >= b.y && banh.y - banh.bankinh <= b.y + BrickConfig.height){
              banh.dy = -banh.dy;
                b.IsBroken = true;}
         }
     });
    }
   
function vitribong(){
    
    banh.x += banh.dx;
    banh.y += banh.dy;
}
function updatePaddlePosition(){

    if(paddle.IsNovingLeft){
        paddle.x -= paddle.speed;
    }else if(paddle.IsNovingRight){
        paddle.x += paddle.speed;
    }
    if(paddle.x < 0){paddle.x =0;
    }else if(paddle.x > canvas.width - paddle.width){paddle.x = canvas.width - paddle.width;
    }
}
function checkGameOver(){
    if(banh.y > canvas.height - banh.bankinh){
        isGameOver = true;
    }
}
function handlegameOver(){
    console.log('GAME OVER');
}
function vẽ(){
    if(!isGameOver){
    context.clearRect(0, 0, canvas.width, canvas.height);
    bóng();
    drawPaddle();
    updatePaddlePosition();
    drawBricks();
   
    handleBallCollideBounds();
    handleBallCollidePaddle();
    handleBallCollideBricks();
   vitribong();
   checkGameOver();
  
    requestAnimationFrame(vẽ);
} else{ handlegameOver();
    }
}
vẽ();