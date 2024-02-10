// create an element with 'tagname'
function create(tagname) {return document.createElement(tagname)};
// create an element with 'tagname' and containing 'text' (can be anything)
function createHTML(tagname, text) {
    let nw = create(tagname);
    if (typeof text == "string")
        nw.appendChild(document.createTextNode(text));
    else nw.appendChild(text);
    return nw;
};

// returns a random int [min; max]
function random(min, max) {
    if (min > max) {
        let oldMin = min;
        min = max;
        max = oldMin;
    }
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


(function() {
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

    
    /////////////// chat

    let convo = document.querySelector(".js-chat");

    let sendsection = convo.querySelector(".js-chat__send");

    let messages = document.querySelectorAll(".chat__send");

    for (let message of messages) {
        message.addEventListener(
            "click",
            function() {
                updateConvo(this, messages);
            }
        );
    }

    console.log(createSMS("ahahah"));
})();

function createSMS(text) {
    let nw = document.querySelector(".js-smsExample").cloneNode(true);
    nw.classList.remove('js-smsExample');
    nw.querySelector(".chat__msg").innerHTML = text;
    return nw;
}

function updateConvo(element, elements) {
    console.log(element.innerHTML);
    let nw = createSMS(element.innerHTML);
    document.querySelector(".chat__messages").appendChild(nw);
    for (msg of elements) msg.remove();
}