// ---------- Name of Plans ----------

let temp1 = document.getElementById("two");
let temp2 = document.getElementById("three");
let temp3 = document.getElementById("four");


// ---------- Change Price color ----------

let new1 = document.getElementById("toggle-class1");
let new2 = document.getElementById("toggle-class2");
let new3 = document.getElementById("toggle-class3");
temp2.addEventListener('click', function () {
    new1.classList.remove("plan-grid-cell-select");
    new2.classList.add("plan-grid-cell-select");
    new3.classList.remove("plan-grid-cell-select");
})

temp1.addEventListener('click', function () {
    new1.classList.add("plan-grid-cell-select");
    new2.classList.remove("plan-grid-cell-select");
    new3.classList.remove("plan-grid-cell-select");
})

temp3.addEventListener('click', function () {
    new3.classList.add("plan-grid-cell-select");
    new2.classList.remove("plan-grid-cell-select");
    new1.classList.remove("plan-grid-cell-select");
})


// ---------- Change Video color ----------

let new4 = document.getElementById("toggle-class-video-1");
let new5 = document.getElementById("toggle-class-video-2");
let new6 = document.getElementById("toggle-class-video-3");
temp2.addEventListener('click', function () {
    new4.classList.remove("plan-grid-cell-select");
    new5.classList.add("plan-grid-cell-select");
    new6.classList.remove("plan-grid-cell-select");
})

temp1.addEventListener('click', function () {
    new4.classList.add("plan-grid-cell-select");
    new5.classList.remove("plan-grid-cell-select");
    new6.classList.remove("plan-grid-cell-select");
})

temp3.addEventListener('click', function () {
    new6.classList.add("plan-grid-cell-select");
    new5.classList.remove("plan-grid-cell-select");
    new4.classList.remove("plan-grid-cell-select");
})


// ---------- Change Resolution color ----------

let new10 = document.getElementById("toggle-class-quality-1");
let new11= document.getElementById("toggle-class-quality-2");
let new12= document.getElementById("toggle-class-quality-3");
temp2.addEventListener('click', function () {
    new10.classList.remove("plan-grid-cell-select");
    new11.classList.add("plan-grid-cell-select");
    new12.classList.remove("plan-grid-cell-select");
})

temp1.addEventListener('click', function () {
    new10.classList.add("plan-grid-cell-select");
    new11.classList.remove("plan-grid-cell-select");
    new12.classList.remove("plan-grid-cell-select");
})

temp3.addEventListener('click', function () {
    new12.classList.add("plan-grid-cell-select");
    new11.classList.remove("plan-grid-cell-select");
    new10.classList.remove("plan-grid-cell-select");
})


// ---------- CHange Devices color ----------

let new7 = document.getElementById("toggle-class-device-1");
let new8 = document.getElementById("toggle-class-device-2");
let new9= document.getElementById("toggle-class-device-3");
temp2.addEventListener('click', function () {
    new7.classList.remove("plan-grid-cell-select");
    new8.classList.add("plan-grid-cell-select");
    new9.classList.remove("plan-grid-cell-select");
})

temp1.addEventListener('click', function () {
    new7.classList.add("plan-grid-cell-select");
    new8.classList.remove("plan-grid-cell-select");
    new9.classList.remove("plan-grid-cell-select");
})

temp3.addEventListener('click', function () {
    new9.classList.add("plan-grid-cell-select");
    new8.classList.remove("plan-grid-cell-select");
    new7.classList.remove("plan-grid-cell-select");
})



const slider = document.querySelector(".slider");
const btnLeft = document.getElementById("moveLeft");
const btnRight = document.getElementById("moveRight");
const indicators = document.querySelectorAll(".indicator");
let baseSliderWidth = slider.offsetWidth;
let activeIndex = 0; // the current page on the slider
let movies = [
  {
    src: "../../images/slide-show-image-1.jpg",
  },
  {
    src: "../../images/slide-show-image-2.jpg",
  },
  {
    src: "../../images/slide-show-image-3.jpg",
  },
  {
    src: "../../images/slide-show-image-4.png",
  },
  {
    src: "../../images/slide-show-image-1.jpg",
  },
  {
    src: "../../images/slide-show-image-3.jpg",
  },
  {
    src: "../../images/slide-show-image-2.jpg",
  },
  // ...
];
// Fill the slider with all the movies in the "movies" array
function populateSlider() {
  movies.forEach((image) => {
    // Clone the initial movie thats included in the html, then replace the image with a different one
    const newMovie = document.getElementById("movie0");
    let clone = newMovie.cloneNode(true);
    let img = clone.querySelector("img");
    img.src = image.src;
    slider.insertBefore(clone, slider.childNodes[slider.childNodes.length - 1]);
  });
}
populateSlider();
populateSlider();
// delete the initial movie in the html
const initialMovie = document.getElementById("movie0");
initialMovie.remove();
// Update the indicators that show which page we're currently on
function updateIndicators(index) {
  indicators.forEach((indicator) => {
    indicator.classList.remove("active");
  });
  let newActiveIndicator = indicators[index];
  newActiveIndicator.classList.add("active");
}
// Scroll Left button
btnLeft.addEventListener("click", (e) => {
  let movieWidth = document.querySelector(".movie").getBoundingClientRect()
    .width;
  let scrollDistance = movieWidth * 8; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)
  slider.scrollBy({
    top: 0,
    left: -scrollDistance,
    behavior: "smooth",
  });
  activeIndex = (activeIndex - 1) % 3;
  console.log(activeIndex);
  updateIndicators(activeIndex);
});
// Scroll Right button
btnRight.addEventListener("click", (e) => {
  let movieWidth = document.querySelector(".movie").getBoundingClientRect()
    .width;
  let scrollDistance = movieWidth * 8; // Scroll the length of 6 movies. TODO: make work for mobile because (4 movies/page instead of 6)
  console.log(`movieWidth = ${movieWidth}`);
  console.log(`scrolling right ${scrollDistance}`);
  // if we're on the last page
  if (activeIndex == 2) {
    // duplicate all the items in the slider (this is how we make 'looping' slider)
    populateSlider();
    slider.scrollBy({
      top: 0,
      left: +scrollDistance,
      behavior: "smooth",
    });
    activeIndex = 0;
    updateIndicators(activeIndex);
  } else {
    slider.scrollBy({
      top: 0,
      left: +scrollDistance,
      behavior: "smooth",
    });
    activeIndex = (activeIndex + 1) % 3;
    console.log(activeIndex);
    updateIndicators(activeIndex);
  }
});
