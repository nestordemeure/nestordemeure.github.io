
// alternate sidenotes lefts and right

// gets the x position of an element on screen
function getxPosition(element) {
    var x = 0;
    while (element) {
        x += (element.offsetLeft - element.scrollLeft + element.clientLeft);
        element = element.offsetParent;
    }
    return x;
}
// the width of the screen
screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

// gets all sidenotes and their components
// TODO iterate on sidenotes
var sidenotes = document.getElementsByClassName("sidenote-text");
var sidenote_numbers = document.getElementsByClassName("sidenote-number");
var sidenote_backrefs = document.getElementsByClassName("sidenote-backref");

// iterates on sidenotes 
// (from last to first as first to last would interfere with the iterator)
for (var i = sidenotes.length - 1; i >= 0; i--) {
    var note = sidenotes[i];
    var number = sidenote_numbers[i]
    var backref = sidenote_backrefs[i];
    // give them unique ids
    id = i + 1;
    number.setAttribute('id', `snref:${id}`);
    note.setAttribute('id', `sn:${id}`);
    // add links
    number.setAttribute('href', `#sn:${id}`);
    backref.setAttribute('href', `#snref:${id}`);
    // move notes whose number is on the left side of the screen to the left
    // we don't use the midpoint because there is a bias to prefering sidenotes to be on the right
    if (getxPosition(number) < screenWidth * 0.45) {
        note.classList.add("sidenote-left");
    }
    else {
        note.classList.add("sidenote-right");
    }
}

// put side notes in a span
// content becoes its own class
// reintroduce hover
