var orgImage = null;
var greyImage = null;
var orgCanvas;
var greyCanvas;

function loadOrigionalImage() {
  var file = document.getElementById("orgfile");
  orgImage = new SimpleImage(file);
  orgCanvas = document.getElementById("orgcan");
  orgImage.drawTo(orgCanvas);
}

function createGreysc() {
  // this function creates a new image with the dimensions of the original image and returns the grey scale image
  greyImage = new SimpleImage(orgImage.getWidth(),orgImage.getHeight());
  for (var pixel of orgImage.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
  	greyImage.setPixel(x,y,pixel);
  }

  for (var pixel of greyImage.values()) {
    var avg=(pixel.getRed() + pixel.getGreen() + pixel.getBlue())/3;
	pixel.setRed(avg);
	pixel.setGreen(avg);
	pixel.setBlue(avg);
  }

}

function makeGrey() {
  //check that images are loaded
	if (orgImage == null  || ! orgImage.complete()) {
    	alert("Image not loaded");
	}

  // call createComposite, which does green screen algorithm and returns a composite image
	createGreysc();

	greyCanvas = document.getElementById("greycan");
	greyImage.drawTo(greyCanvas);
}

function clearCanvas() {
	doClear(orgCanvas);
	doClear(greyCanvas);
}

function doClear(canvas) {
	var context = canvas.getContext("2d");
	context.clearRect(0,0,canvas.width,canvas.height);
}
