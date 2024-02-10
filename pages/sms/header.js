// create an element with 'tagname'
export function create(tagname) {return document.createElement(tagname)};
// create an element with 'tagname' and containing 'text' (can be anything)
export function createHTML(tagname, text) {
    let nw = create(tagname);
    if (typeof text == "string")
        nw.appendChild(document.createTextNode(text));
    else nw.appendChild(text);
    return nw;
};

// returns a random int [min; max]
export function random(min, max) {
    if (min > max) {
        let oldMin = min;
        min = max;
        max = oldMin;
    }
  
    return Math.floor(Math.random() * (max - min + 1)) + min;
}