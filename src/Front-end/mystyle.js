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