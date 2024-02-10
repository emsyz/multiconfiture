var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
var sliderImgDiv = document.querySelector(".sliderImgDiv");

output.innerHTML = slider.value;

slider.oninput = function () {
  output.innerHTML = this.value;
  var scrollValue =
    (this.value / 100) * (sliderImgDiv.scrollWidth - sliderImgDiv.clientWidth);

  sliderImgDiv.scrollLeft = scrollValue;
};
