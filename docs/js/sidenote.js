//-------------------------------------------------------------------------------------------------
// FOOTNOTE TO SIDENOTES

// inserts just after a given html element
// see: https://stackoverflow.com/a/4793630/6422174
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

// iterates as long as we can find footnotes
sidenoteList = []
while (true) {
    id = sidenoteList.length + 1
    // finds the footnote number in the text
    footnote_number_id = `fnref:${id}`
    footnote_number = document.getElementById(footnote_number_id)
    if (footnote_number) {
        // builds sidenote
        sidenote = document.createElement("small")
        footnote_id = `fn:${id}`
        sidenote.setAttribute('id', footnote_id)
        sidenote.classList.add("sidenote")
        // add note number in a first column
        number_column = document.createElement("div")
        number_column.classList.add("sidenote-number")
        number_column.textContent = `${id}.`
        sidenote.appendChild(number_column)
        // add text in a second column
        text_column = document.createElement("div")
        text_column.classList.add("sidenote-text")
        footnote_text = document.getElementById(footnote_id).innerHTML
        text_column.innerHTML = footnote_text
        sidenote.appendChild(text_column)
        // inserts sidenote's html after footnote marker
        insertAfter(footnote_number, sidenote)
        // updates sidenote list
        sidenoteList.push([footnote_number, sidenote])
    }
    else {
        // the id has no associated footnote, we are done
        break
    }
}

// delete the footnote footer if there was at least one footnote
if (sidenoteList.length > 0) {
    footnote_footer = document.getElementsByClassName("footnotes")[0]
    footnote_footer.remove()
}

/*
// FOOTNOTE HTML

// markers
for their own good < sup id = "fnref:3" > <a href="#fn:3" class="footnote-ref" role="doc-noteref">3</a></sup >

// footnotes
<div class="footnotes" role="doc-endnotes">
    <hr>
    <ol>
        <li id="fn:1">
            <p>They ca thstatus quo.&#160;<a href="#fnref:1" class="footnote-backref" role="doc-backlink">&#x21a9;&#xfe0e;</a></p>
        </li>
        <li id="fn:2">
            <p>As the tit in love with.&#160;<a href="#fnref:2" class="footnote-backref" role="doc-backlink">&#x21a9;&#xfe0e;</a></p>
        </li>
    </ol>
</div>

// SIDENOTE HTML

for their own good < sup id = "fnref:4" > <a href="#fn:4" class="footnote-ref" role="doc-noteref">4</a></sup >
<small id="fn:4" class="sidenote sidenote-right">
    <div class="sidenote-number">4.</div>
    <div class="sidenote-text">
        <p>A lot of the charm of the movie is inherited from the source material, the exellent and eponym book by Umberto Eco</a>.&nbsp;<a href="#fnref:4" class="footnote-backref" role="doc-backlink">↩︎</a></p>
    </div>
</small>
*/

//-------------------------------------------------------------------------------------------------
// SIDENOTE PLACEMENT

// gets the [x,y,top,bottom] positions of an element on screen
function getPosition(element) {
    box = element.getBoundingClientRect()
    // x
    x_relative = (box.right + box.left) / 2
    x = x_relative + window.pageXOffset
    // y
    y_relative = (box.top + box.bottom) / 2
    y = y_relative + window.pageYOffset
    return [x, y, box.top, box.bottom]
}

// computes the best shift and resulting ceiling
function getShiftCeiling(y, ytarget, top, bottom, ceiling, margin) {
    // shift to get one margin below the ceiling
    shiftCeiling = (ceiling + margin) - top
    // shift to get aligned with the target
    shiftNumber = ytarget - y
    // shift that gets us lower of the two
    shift = Math.max(shiftCeiling, shiftNumber)
    // new ceiling once we take the shift
    ceiling = bottom + shift
    return [shift, ceiling]
}

// positions all the side notes
// left/right and vertically
function positionSidenotes() {
    // the width of the screen
    screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // the font size
    fontsize = parseFloat(getComputedStyle(document.documentElement).fontSize)
    // true if we are on a computeur screen
    isComputeurScreen = window.matchMedia('(min-width: 1400px)').matches

    // sets everything to the default
    for ([number, note] of sidenoteList) {
        note.style.cssText = ""
    }

    // if we are dealing with a computeur, pick a side and shifts verticaly
    if (isComputeurScreen) {
        margin = fontsize
        ceilingRight = -window.pageYOffset
        ceilingLeft = -window.pageYOffset
        for ([number, note] of sidenoteList) {
            var [numberx, numbery, numberTop, numberBottom] = getPosition(number)
            // pick side
            goLeft = numberx < screenWidth * 0.45
            isAmbiguous = (numberx > screenWidth * (5 / 12)) && (numberx < screenWidth * (7 / 12))
            if (isAmbiguous) {
                // try left
                note.classList.remove("sidenote-right")
                note.classList.add("sidenote-left")
                var [notex, notey, noteTop, noteBottom] = getPosition(note)
                var [shiftLeft, newCeilingLeft] = getShiftCeiling(notey, numbery, noteTop, noteBottom, ceilingLeft, margin)
                // try right
                note.classList.remove("sidenote-left")
                note.classList.add("sidenote-right")
                var [notex, notey, noteTop, noteBottom] = getPosition(note)
                var [shiftRight, newCeilingRight] = getShiftCeiling(notey, numbery, noteTop, noteBottom, ceilingRight, margin)
                // picks best direction
                if ((newCeilingLeft < newCeilingRight) || ((newCeilingLeft == newCeilingRight) && goLeft)) {
                    // left is better
                    // or equal but the prefered direction
                    note.classList.remove("sidenote-right")
                    note.classList.add("sidenote-left")
                    ceilingLeft = newCeilingLeft
                    shift = shiftLeft
                }
                else {
                    // right is better
                    // (no need to change our class to right as it was the latest test)
                    ceilingRight = newCeilingRight
                    shift = shiftRight

                }
            }
            else if (goLeft) {
                // change side to right
                note.classList.remove("sidenote-right")
                note.classList.add("sidenote-left")
                // computes shift and new ceiling
                var [notex, notey, noteTop, noteBottom] = getPosition(note)
                var [shift, ceilingLeft] = getShiftCeiling(notey, numbery, noteTop, noteBottom, ceilingLeft, margin)
            }
            else {
                // change side to left
                note.classList.remove("sidenote-left")
                note.classList.add("sidenote-right")
                // computes shift and new ceiling
                var [notex, notey, noteTop, noteBottom] = getPosition(note)
                var [shift, ceilingRight] = getShiftCeiling(notey, numbery, noteTop, noteBottom, ceilingRight, margin)
            }
            // applies shift
            note.style.cssText = `transform: translateY(${shift}px);`
        }
    }
}

// runs the function once and on any screen resizing
window.onresize = positionSidenotes
positionSidenotes()
