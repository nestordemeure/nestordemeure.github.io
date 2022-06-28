/*
Converts footnotes into sidenotes.
*/

// gets the x position of an element on screen
function getxPosition(element) {
    box = element.getBoundingClientRect()
    x_relative = (box.right + box.left) / 2
    x_absolute = x_relative + window.pageXOffset
    return x_absolute
}

// the width of the screen
screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);

// is there a side flipping problem that needs to be compensated for?
flip_sides = (getxPosition(document.body) < screenWidth * 0.45)
console.log(`flip_sides:${flip_sides}`)

// returns true if the element is considered to be on the right side
function isOnRightSide(element) {
    result = getxPosition(element) < screenWidth * 0.45
    if (flip_sides) {
        return !result
    }
    else {
        return result
    }
}

// inserts just after a given html element
// see: https://stackoverflow.com/a/4793630/6422174
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

// iterates as long as we can find footnotes
id = 1
while (true) {
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
        // place the note on the right or the left depending on the position of its number
        if (isOnRightSide(footnote_number)) {
            sidenote.classList.add("sidenote-left")
        }
        else {
            sidenote.classList.add("sidenote-right")
        }
        // inserts sidenote's html after footnote marker
        insertAfter(footnote_number, sidenote)
        // increments the footnote id
        id += 1
    }
    else {
        // the id has no associated footnote, we are done
        break
    }
}

// delete the footnote footer if there was at least one footnote
if (id > 1) {
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

