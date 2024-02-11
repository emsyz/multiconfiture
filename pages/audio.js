let audiosSection = document.querySelector("#AUDIOS");
let ALL_AUDIOS = {
    isPlaying: function(audio) {
        return !audio.paused && !audio.ended;
    },

    play: function(targets) {
        try {
            for (let target of targets) {
                target.play();
            }
        } catch (e) {
            targets.play();
        }
    },

    pause: function(targets) {
        try {
            for (let target of targets) {
                target.pause();
            }
        } catch (e) {
            targets.pause();
        }
    },

    toggle: function(targets) {
        try {
            for (let target of targets) {
                if (this.isPlaying(target)) {
                    target.pause();
                } else {
                    target.play();
                }
            }
        } catch (e) {
            if (this.isPlaying(targets)) {
                targets.pause();
            } else {
                targets.play();
            }
        }
    },

    rewind: function(targets) {
        try {
            for (let target of targets) {
                target.currentTime = 0;
                target.play();
            }
        } catch (e) {
            targets.currentTime = 0;
            targets.play();
        }
    }
};


ALL_AUDIOS.all = document.querySelectorAll(".audio");
ALL_AUDIOS.musics = document.querySelectorAll(".audio.music");
ALL_AUDIOS.effect = document.querySelector(".audio.effect");
ALL_AUDIOS.voff = document.querySelectorAll("audio.voff");

// console.log(">>>>>>>>>>> ALL AUDIOS <<<<<<<<<<<<<<<<<<")

let audiocontrollers = document.querySelectorAll(".JS_AUDIOMANAGE");

for (let controller of audiocontrollers) {
    let fct = controller.dataset.audiofct;

    let targetName = controller.dataset.audiotarget;
    let targets;
    
    if (targetName == '*') {
        targets = ALL_AUDIOS.all;
    }
    else if (targetName != undefined) {
        targets = targetName.split(/\s*,\s*/);

        for (let i = 0; i < targets.length; i++) {
            targets[i] = document.querySelector(`.audio[data-name="${targets[i]}"]`);
        }
    }


    

    switch (fct) {
        case "play":
            controller.addEventListener(
                "click",
                function() {
                    ALL_AUDIOS.play(targets);
                }
            );
            
            break;
        case "pause":
            controller.addEventListener(
                "click",
                function() {
                    ALL_AUDIOS.pause(targets);
                }
            );
            break;
        case "toggle":
            controller.addEventListener(
                "click",
                function() {
                    ALL_AUDIOS.toggle(targets);
                }
            );
            break;
        case "rewind":
            controller.addEventListener(
                "click",
                function() {
                    ALL_AUDIOS.rewind(targets);
                }
            );
            break;

        case "button": 
        controller.addEventListener(
            "click",
            function() {
                ALL_AUDIOS.play(ALL_AUDIOS.effect);
            }
        );
            break;
        
    }
}






////////////////////////



ALL_AUDIOS.effect.volume = 0.3;
ALL_AUDIOS.effect.volume = 0.3;
let goodbye = document.querySelector(".audio[data-name='goodbye']");
goodbye.volume = 0.3;



//////////////

let photoAudios = document.querySelectorAll('.JS_photo_list');

for (let button of photoAudios) {
    let target = button.dataset.audiotarget.split(/\s*,\s*/);

    if (target.length == 1) target = target[0];
    else target = target[1];

    let audio = document.querySelector(`.audio[data-name="${target}"]`);

    let buttonNext = document.querySelector(`.photoset.${target} .js-photoset__button`);

    
    audio.addEventListener(
        'ended',
        function() {
            buttonNext.classList.add('visible');
        }
    );
}