import gsap from "gsap";
import * as THREE from "three";
import {random} from "./header.js";

let photos = document.querySelector("#PHOTOS");
// console.log(photos);

let CurrentPosition = 0;

let list = document.querySelector(".photos-list");
let height = list.offsetHeight;
let photosets = list.querySelectorAll(".photoset");

let photosetButtons = document.querySelectorAll('.js-photoset__button');
let ALL_PHOTOS = {};

// photos.addEventListener(
//     "scroll",
//     (event) => {
//         console.log(`X: ${photos.scrollLeft} - Y: ${photos.scrollTop}`);
//         photos.scrollTop = list.offsetHeight;
//     }
// );

for (let i = 0; i < photosets.length; i++) {
    let photoset = photosets[i];
    photoset.dataset.id = i;
    
    let but = photoset.querySelector(".js-photoset__button");
    let img = photoset.querySelector(".photoset__img");
    let text = photoset.querySelector(".photoset__text");

    ALL_PHOTOS[i] = {
        photoset: photoset,
        but: but,
        img: img,
        text: text
    };

    text.style.transform = `rotate(${random(-10, 10)}deg)`;

    if (i != (photosets.length -1)) {
        but.addEventListener(
            "click",
            function() {
                // let newPos = (height / photosets.length) * (i + 1);
                let newPos = (i + 1) * window.outerHeight * 1.05;
                // photos.scrollTop = newPos;
                console.log(`${height} / ${photosets.length} = ${newPos}`);

                gsap.to(photos, { scrollTop: newPos, duration: 1.5, ease: "power2.inOut" });
            }
        );
    } else {

        but.addEventListener(
            "click",
            function() {
                gsap.to(photos, { scrollTop: 0, duration: 0.5, ease: "power2.inOut" });

                let buts = document.querySelectorAll('.js-photoset__button');

                for (let but of buts) {
                    but.classList.remove('visible');
                }
            }
        );
    }
}

const mouseMove = (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = (event.clientY / window.innerHeight) * 2 + 1;
    let multiplier = 15;

    modifyButtons(mouse.x * multiplier, mouse.y * multiplier);
};
const mouse = new THREE.Vector2();

document.addEventListener(
    "mousemove",
    mouseMove
);

function modifyButtons(x, y) {
    for (let i in ALL_PHOTOS) {
        ALL_PHOTOS[i].but.style.left = x + 'px';
        ALL_PHOTOS[i].but.style.top = y + 'px';

        ALL_PHOTOS[i].img.style.left = (x + (0.5 * y)) + 'px';
        ALL_PHOTOS[i].img.style.top = (y + (0.5 * x)) + 'px';
    }
}

