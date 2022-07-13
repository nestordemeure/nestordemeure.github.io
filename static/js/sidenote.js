/*
Converts footnotes into sidenotes.
*/

// the width of the screen
screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
// the font size
fontsize = parseFloat(getComputedStyle(document.documentElement).fontSize)
// returns true if we are on a computeur screen
isComputeurScreen = window.matchMedia('(min-width: 1400px)').matches

// gets the x position of an element on screen
function getxPosition(element) {
    box = element.getBoundingClientRect()
    x_relative = (box.right + box.left) / 2
    x_absolute = x_relative + window.pageXOffset
    return x_absolute
}

// inserts just after a given html element
// see: https://stackoverflow.com/a/4793630/6422174
function insertAfter(referenceNode, newNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
}

// takes a list of element and center them vertically while insuring that they are separated by at least 'margin'
function centerVertically(elements, margin) {
    ceiling = 0
    for (element of elements) {
        // gets size information
        box = element.getBoundingClientRect()
        ytop = box.top
        ybottom = box.bottom
        // computes the shift to center vertically while respecting the margin
        maxlegalshift = ceiling + margin - ytop // gets one margin below the ceiling
        optimumshift = (ytop - ybottom) / 2 // centered on the element
        yshift = Math.max(maxlegalshift, optimumshift)
        // applies the shift and updates the ceiling
        element.style.cssText = `transform: translateY(${yshift}px);`
        ceiling = ybottom + yshift
    }
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
        if (getxPosition(footnote_number) < screenWidth * 0.45) {
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

if (id > 1) {
    // delete the footnote footer if there was at least one footnote
    footnote_footer = document.getElementsByClassName("footnotes")[0]
    footnote_footer.remove()

    // centers the notes vertically
    // now that they have been placed and have a height and base position
    if (isComputeurScreen) {
        // right then left
        sidenotesRight = document.getElementsByClassName("sidenote-right")
        centerVertically(sidenotesRight, fontsize)
        sidenotesLeft = document.getElementsByClassName("sidenote-left")
        centerVertically(sidenotesLeft, fontsize)
    }
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

