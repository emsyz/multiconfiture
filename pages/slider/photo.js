import gsap from "gsap";

let photos = document.querySelector("#PHOTOS");
console.log(photos);

let CurrentPosition = 0;

let list = document.querySelector(".photos-list");
let height = list.offsetHeight;
let photosets = list.querySelectorAll(".photoset");

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

    if (i != (photosets.length -1)) {
        but.addEventListener(
            "click",
            function() {
                // let newPos = (height / photosets.length) * (i + 1);
                let newPos = (i + 1) * window.outerHeight * 1.05;
                // photos.scrollTop = newPos;
                console.log(`${height} / ${photosets.length} = ${newPos}`);

                gsap.to(photos, { scrollTop: newPos, duration: 1, ease: "power2.inOut" });
            }
        );
    } else {
        // but.addEventListener(
        //     "click",
        //     function() {
        //     }
        // );
    }
}

const mouseMove = (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = (event.clientY / sizes.height) * 2 + 1;
  };