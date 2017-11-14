IM  = document.getElementById('input-mask');
CI1 = document.getElementById('color-input-1');
CP1 = document.getElementById('color-picker-1');
CB1 = document.getElementById('color-block-1');
CS1 = document.getElementById('color-strip-1');
CI2 = document.getElementById('color-input-2');
CP2 = document.getElementById('color-picker-2');
CB2 = document.getElementById('color-block-2');
CS2 = document.getElementById('color-strip-2');

var toggleIM = false;

IM.addEventListener('click', function(){
  if(toggleIM){
    CP1.style.setProperty('display', 'none');
    CP2.style.setProperty('display', 'none');
    IM.style.setProperty('display', 'none');
    toggleCI1 = false;
    toggleIM = false;
  }
  else{
    CP1.style.setProperty('display', 'block');
    CP2.style.setProperty('display', 'block');
    IM.style.setProperty('display', 'block');
    toggleCI1 = true;
    toggleIM = true;
  }
});


// WHEN INPUT1 IS CLICKED
// SHOW PICKER1 + INPUT MASK
// HIDE PICKER2
// HIDE INPUT1 + INPUT MASK WHEN ANYTHING ELSE IS CLICKED

var toggleCI1 = false;
var toggleCI2 = false;

CI1.addEventListener('click', function(){
  if(toggleCI1){
    IM.style.setProperty('display', 'none');
    CP1.style.setProperty('display', 'none');
    CP2.style.setProperty('display', 'none');
    toggleCI1 = false;
    toggleIM = false;
  }
  else{
    IM.style.setProperty('display', 'block');
    CP1.style.setProperty('display', 'block');
    CP2.style.setProperty('display', 'none');
    toggleIM = true;
    toggleCI1 = true;
    toggleCI2 = false;
  }
})

CI2.addEventListener('click', function(){
  if(toggleCI2){
    IM.style.setProperty('display', 'none');
    CP1.style.setProperty('display', 'none');
    CP2.style.setProperty('display', 'none');
    toggleCI2 = false;
    toggleIM = false;
  }
  else{
    IM.style.setProperty('display', 'block');
    CP1.style.setProperty('display', 'none');
    CP2.style.setProperty('display', 'block');
    toggleIM = true;
    toggleCI1 = false;
    toggleCI2 = true;
  }
})



// 
// 
// COLOR PICKER 1: SELECT LINE COLOR
// 
// 

// DRAW COLOR PICKER WITH BLOCK AND STRIP

var ctx1 = CB1.getContext('2d');
var width1 = CB1.width;
var height1 = CB1.height;

var ctx2 = CS1.getContext('2d');
var width2 = CS1.width;
var height2 = CS1.height;

var x = 0;
var y = 0;
var drag = false;

var rgbaColor = 'rgba(255,255,255,1)';

ctx1.rect(0, 0, width1, height1);
fillGradient();

function fillGradient() {
  ctx1.fillStyle = rgbaColor;
  ctx1.fillRect(0, 0, width1, height1);

  var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx1.fillStyle = grdWhite;
  ctx1.fillRect(0, 0, width1, height1);

  var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx1.fillStyle = grdBlack;
  ctx1.fillRect(0, 0, width1, height1);
}

ctx2.rect(0, 0, width2, height2);
var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd1.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd1.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd1.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd1.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd1.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx2.fillStyle = grd1;
ctx2.fill();

// UPDATE COLOR BLOCK WHEN STRIP IS CLICKED

function CS1click(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx2.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ', 1)';
  fillGradient();
}

function CB1mousedown(e) {
  drag = true;
  changeColor(e);
}

function CB1mousemove(e) {
  if (drag) {
    changeColor(e);
  }
}

function CB1mouseup(e) {
  drag = false;
}

// UPDATE TREE WHEN COLOR BLOCK IS CLICKED

function changeColor(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx1.getImageData(x, y, 1, 1).data;
  rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ', ' + alpha + ')';
  CI1.style.backgroundColor = rgbaColor;
  drawTreeFromSliders();
}

CS1.addEventListener("click", CS1click, false);
CB1.addEventListener("mousedown", CB1mousedown, false);
CB1.addEventListener("mouseup",   CB1mouseup, false);
CB1.addEventListener("mousemove", CB1mousemove, false);


// 
// 
// COLOR PICKER 2: SELECT GROUND COLOR
// 
// 



// DRAW COLOR PICKER WITH BLOCK AND STRIP

var ctx3 = CB2.getContext('2d');
var width3 = CB2.width;
var height3 = CB2.height;

var ctx4 = CS2.getContext('2d');
var width4 = CS2.width;
var height4 = CS2.height;

var x2 = 0;
var y2 = 0;
var drag = false;

var rgbaColorGround = 'rgba(255,255,255,1)';

ctx3.rect(0, 0, width3, height3);
fillGradient2();

function fillGradient2() {
  ctx3.fillStyle = rgbaColorGround;
  ctx3.fillRect(0, 0, width3, height3);

  var grdWhite = ctx4.createLinearGradient(0, 0, width3, 0);
  grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
  grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
  ctx3.fillStyle = grdWhite;
  ctx3.fillRect(0, 0, width3, height3);

  var grdBlack = ctx4.createLinearGradient(0, 0, 0, height3);
  grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
  grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
  ctx3.fillStyle = grdBlack;
  ctx3.fillRect(0, 0, width3, height3);
}

ctx4.rect(0, 0, width4, height4);
var grd3 = ctx4.createLinearGradient(0, 0, 0, height3);
grd3.addColorStop(0, 'rgba(255, 0, 0, 1)');
grd3.addColorStop(0.17, 'rgba(255, 255, 0, 1)');
grd3.addColorStop(0.34, 'rgba(0, 255, 0, 1)');
grd3.addColorStop(0.51, 'rgba(0, 255, 255, 1)');
grd3.addColorStop(0.68, 'rgba(0, 0, 255, 1)');
grd3.addColorStop(0.85, 'rgba(255, 0, 255, 1)');
grd3.addColorStop(1, 'rgba(255, 0, 0, 1)');
ctx4.fillStyle = grd1;
ctx4.fill();

// UPDATE COLOR BLOCK WHEN STRIP IS CLICKED

function CS2click(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx4.getImageData(x, y, 1, 1).data;
  rgbaColorGround = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ', 1)';
  fillGradient2();
  console.log('CS2click');
}

function CB2mousedown(e) {
  drag = true;
  changeColor2(e);
  console.log('CB2click');
}

function CB2mousemove(e) {
  if (drag) {
    changeColor2(e);
  }
}

function CB2mouseup(e) {
  drag = false;
}

// UPDATE GROUND WHEN COLOR BLOCK IS CLICKED

body  = document.getElementById('body');

function changeColor2(e) {
  x = e.offsetX;
  y = e.offsetY;
  var imageData = ctx3.getImageData(x, y, 1, 1).data;
  rgbaColorGround = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ', ' + alpha + ')';
  CI2.style.backgroundColor = rgbaColorGround;
  console.log('changeColor2');
  body.style.backgroundColor = rgbaColorGround;
}

CS2.addEventListener("click",     CS2click, false);
CB2.addEventListener("mousedown", CB2mousedown, false);
CB2.addEventListener("mouseup",   CB2mouseup, false);
CB2.addEventListener("mousemove", CB2mousemove, false);
