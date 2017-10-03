var fgImage = null;
var bgImage = null;
var fgCanvas;
var bgCanvas;

function loadForegroundImage() {
  var file = document.getElementById("fgfile");
  fgImage = new SimpleImage(file);
  fgCanvas = document.getElementById("fgcan");
  fgImage.drawTo(fgCanvas);
}

function loadBackgroundImage() {
  var file = document.getElementById("bgfile");
  bgImage = new SimpleImage(file);
  bgCanvas = document.getElementById("bgcan");
  bgImage.drawTo(bgCanvas);
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}

//encryption functions--------------------------------------------------------------------------------------

function encrypt(){
  var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  alert("5");
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();   
    if (x<=bgImage.getWidth() && y<=bgImage.getHeight()){
      var bgPixel = bgImage.getPixel(x,y);
      var r= (pixel.getRed()/16)*16 + bgPixel.getRed()%16;
      var g= ((pixel.getGreen()/16)*16 + bgPixel.getGreen()%16);
      var b= (pixel.getBlue()/16)*16 + bgPixel.getBlue()%16;
      if(r>255 || g>255 || b>255);
      bgPixel.setRed(r);
      bgPixel.setGreen(g);
      bgPixel.setBlue(b);
      output.setPixel(x,y,bgPixel);
    }
    else {
      output.setPixel(x,y,pixel);
    }
  }
  return output;
}

function encryptImage(){
  if (fgImage == null  || ! fgImage.complete()) {
    alert("Foreground image not loaded");
  }
  if (bgImage == null || ! bgImage.complete()) {
    alert("Background image not loaded");
  }
    if(fgImage.getWidth()<bgImage.getWidth() || fgImage.getHeight()< bgImage.getHeight())
  {
  	alert("Size of image to be hidden is smaller than size of hiding image. Choose another image bigger in dimensions");
  }
  clearCanvas();
  var finalImage = encrypt();
  finalImage.drawTo(fgCanvas);
}

//---------------------------------------------------------------------------------------------------

//decryption functions-------------------------------------------------------------------------------

function decrypt(){
  var output = new SimpleImage(fgImage.getWidth(),fgImage.getHeight());
  for (var pixel of fgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();   
	var r= (pixel.getRed()%16)*16;
	var g= (pixel.getGreen()%16)*16;
	var b= (pixel.getBlue()%16)*16;
	pixel.setRed(r);
	pixel.setGreen(g);
	pixel.setBlue(b);
	output.setPixel(x,y,pixel);
  }
  return output;
}

function decryptImage(){
  if (fgImage == null  || ! fgImage.complete()) {
    alert("image not loaded");
  }
  bgCanvas = document.getElementById("bgcan");
  doClear(bgCanvas);
  var finalImage = decrypt();
  finalImage.drawTo(bgCanvas);
}

