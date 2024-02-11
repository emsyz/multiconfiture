import * as decisions from "./decisionTree.js";
import {random, create, createHTML} from "./header.js";



let sendsection = document.querySelector(".js-chat__send");
let messagessection = document.querySelector(".js-chat");
let smsExample = document.querySelector(".display-none .js-smsExample");
const ALL_MESSAGES = document.querySelector(".chat__messages");

    

function createSMS(infos) {
    let nw = smsExample.cloneNode(true);
    nw.classList.remove('js-smsExample');
    if (!infos.pending) {
        nw.classList.remove('send');
    } else {
        sendingTextHandling(nw, infos);
    }

    if (infos.character == "other") {
        nw.classList.add(infos.character);
        nw.classList.remove("self");
    }




    let inner = nw.querySelector(".chat__msg");
    inner.innerHTML = infos.text;
    inner.classList = "chat__msg";

    if (infos.id) {
        inner.dataset.id = infos.id;
    }


    return nw;
}

function sendingTextHandling(el, infos) {
    el.addEventListener(
        "click",
        function() {
            let nw = updateConvo(this, infos);
        }
    )
}

function respondTextHandling(el, infos) {
    setTimeout(() => {     
        if (!infos.next) {
            let nw = createSMS({
                text: infos.text,
                id: infos.id,
                pending: false
            });
            return;
        }

        let nw = createSMS(
            decisions.tree[infos.next]
        );

        nw.classList.add("removing");
        ALL_MESSAGES.appendChild(nw);
        setTimeout(() => {
            nw.classList.remove("removing");
        }, 10);
        ALL_MESSAGES.scrollTo(0, ALL_MESSAGES.scrollHeight);

        let nexts = decisions.tree[infos.next].next;

        if (nexts == undefined) {
            setTimeout(() => {
                document.querySelector("#SMS .js-closeGameWindow").classList.add('visible');
                return;
            }, 1000);
        }

        setTimeout(() => {
            addSendingTexts(nexts);
        }, 300);

        
    }, 1500);
}

function updateConvo(element, infos) {
    let article = element.querySelector(".chat__msg");
    let nw = createSMS({
        text: infos.trueText != undefined ? infos.trueText : infos.text,
        id: infos.id,
        pending: false
    });


    
    
    //////// MOVE MESSAGE
    let elements = document.querySelectorAll(".chat__sendsection .chat__li.send");
    sendsection.classList.add("removing");
    setTimeout(() => {
        nw.classList.add("removing");

        

        if (infos.image != undefined) {
            nw.classList.add("img");
        }
        ALL_MESSAGES.appendChild(nw);
        setTimeout(() => {
            nw.classList.remove("removing");
            sendsection.classList.remove("removing");
            respondTextHandling(nw, infos);
            
        }, 400);

        for (let msg of elements) {
            msg.remove();
        }
    }, 400);

    return nw;
}





//////////////////////////: CHAT

let smsCards = document.querySelectorAll(".grid-sms__card");

let article = document.querySelector("#SMS");

for (const card of smsCards) {
    card.addEventListener(
        "click",
        function(event) {
            let name = this.dataset.person;
            let pages = article.querySelectorAll(".sms-chat");
            let page = article.querySelector(`.sms-chat[data-person='${name}']`);

            for (let p of pages) {
                p.classList.remove('visible');
            }
            page.classList.add('visible');

        }
    )
}


/////////////// MAIN

function addSendingTexts(textsIds) {
    if (typeof textsIds == "string") textsIds = [textsIds];
    for (let text of textsIds) {
        let infos = decisions.tree[text];
        let nw = createSMS(infos);


        nw.classList.add("removing");
        sendsection.appendChild(nw);
        setTimeout(() => {
            nw.classList.remove("removing");
        }, 1000);
    }

    
}

addSendingTexts(decisions.tree.start);

/*

let nw = createSMS({
    text: "ta gueule mamy",
    trueText: "En fait ferme-là wesh",
    id: "0-tg",
    pending: true,
    next: "1-why"
});

let nw1 = createSMS({
    text: "quand est-ce que tu crèves",
    id: "0-die",
    pending: true,
    next: "1-why"
});

let nw2 = createSMS({
    text: "fdp",
    id: "0-fdp",
    pending: true
});

let mamy1 = createSMS({
    text: "mais pourquoi",
    id: "1-why",
    pending: false
})

console.log(">>>> main");
console.log(nw);
sendsection.appendChild(nw);
sendsection.appendChild(nw1);
sendsection.appendChild(nw2);*/