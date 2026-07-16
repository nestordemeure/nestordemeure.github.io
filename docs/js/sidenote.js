(function () {
    'use strict'

    //-------------------------------------------------------------------------------------------------
    // FOOTNOTE TO SIDENOTES

    // inserts just after a given html element
    // see: https://stackoverflow.com/a/4793630/6422174
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }

    // iterates as long as we can find footnotes
    const sidenoteList = []
    while (true) {
        const id = sidenoteList.length + 1
        // finds the footnote number in the text
        const footnote_number = document.getElementById(`fnref:${id}`)
        if (!footnote_number) {
            // the id has no associated footnote, we are done
            break
        }
        // builds sidenote
        const sidenote = document.createElement("small")
        const footnote_id = `fn:${id}`
        sidenote.classList.add("sidenote")
        // add note number in a first column
        const number_column = document.createElement("div")
        number_column.classList.add("sidenote-number")
        number_column.textContent = `${id}.`
        sidenote.appendChild(number_column)
        // add text in a second column
        const text_column = document.createElement("div")
        text_column.classList.add("sidenote-text")
        text_column.innerHTML = document.getElementById(footnote_id).innerHTML
        sidenote.appendChild(text_column)
        // the sidenote takes over the footnote's id once the footer is deleted below,
        // so that #fn:id anchors keep working
        sidenote.setAttribute('id', footnote_id)
        // inserts sidenote's html after footnote marker
        insertAfter(footnote_number, sidenote)
        // updates sidenote list
        sidenoteList.push([footnote_number, sidenote])
    }

    // delete the footnote footer if there was at least one footnote
    if (sidenoteList.length > 0) {
        document.getElementsByClassName("footnotes")[0].remove()
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

    // desktop breakpoint, defined once in sidenote.css
    const breakpoint = getComputedStyle(document.documentElement)
        .getPropertyValue('--sidenote-breakpoint').trim() || '1400px'
    const desktopQuery = window.matchMedia(`(min-width: ${breakpoint})`)

    // gets the [x,y,top,bottom] positions of an element on screen
    function getPosition(element) {
        const box = element.getBoundingClientRect()
        // x
        const x = (box.right + box.left) / 2 + window.pageXOffset
        // y
        const y = (box.top + box.bottom) / 2 + window.pageYOffset
        return [x, y, box.top, box.bottom]
    }

    // computes the best shift and resulting ceiling
    function getShiftCeiling(y, ytarget, top, bottom, ceiling, margin) {
        // shift to get one margin below the ceiling
        const shiftCeiling = (ceiling + margin) - top
        // shift to get aligned with the target
        const shiftNumber = ytarget - y
        // shift that gets us lower of the two
        const shift = Math.max(shiftCeiling, shiftNumber)
        // new ceiling once we take the shift
        const newCeiling = bottom + shift
        return [shift, newCeiling]
    }

    // positions all the side notes
    // left/right and vertically
    function positionSidenotes() {
        // the width of the screen
        const screenWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0)
        // the font size
        const fontsize = parseFloat(getComputedStyle(document.documentElement).fontSize)

        // sets everything to the default
        for (const [, note] of sidenoteList) {
            note.style.cssText = ""
        }

        // on mobile, notes stay inline where they were inserted
        if (!desktopQuery.matches) return

        // if we are dealing with a computeur, pick a side and shifts verticaly
        const margin = fontsize
        let ceilingRight = -window.pageYOffset
        let ceilingLeft = -window.pageYOffset
        for (const [number, note] of sidenoteList) {
            const [numberx, numbery] = getPosition(number)
            let shift
            // pick side
            const goLeft = numberx < screenWidth * 0.45
            const isAmbiguous = (numberx > screenWidth * (5 / 12)) && (numberx < screenWidth * (7 / 12))
            if (isAmbiguous) {
                // try left
                note.classList.remove("sidenote-right")
                note.classList.add("sidenote-left")
                const [, lefty, leftTop, leftBottom] = getPosition(note)
                const [shiftLeft, newCeilingLeft] = getShiftCeiling(lefty, numbery, leftTop, leftBottom, ceilingLeft, margin)
                // try right
                note.classList.remove("sidenote-left")
                note.classList.add("sidenote-right")
                const [, righty, rightTop, rightBottom] = getPosition(note)
                const [shiftRight, newCeilingRight] = getShiftCeiling(righty, numbery, rightTop, rightBottom, ceilingRight, margin)
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
                // change side to left
                note.classList.remove("sidenote-right")
                note.classList.add("sidenote-left")
                // computes shift and new ceiling
                const [, notey, noteTop, noteBottom] = getPosition(note)
                ;[shift, ceilingLeft] = getShiftCeiling(notey, numbery, noteTop, noteBottom, ceilingLeft, margin)
            }
            else {
                // change side to right
                note.classList.remove("sidenote-left")
                note.classList.add("sidenote-right")
                // computes shift and new ceiling
                const [, notey, noteTop, noteBottom] = getPosition(note)
                ;[shift, ceilingRight] = getShiftCeiling(notey, numbery, noteTop, noteBottom, ceilingRight, margin)
            }
            // applies shift
            note.style.cssText = `transform: translateY(${shift}px);`
        }
    }

    // runs the function once now, then again when late-loading resources
    // (images, webfonts) have shifted the layout, and on resizes
    positionSidenotes()
    window.addEventListener('load', positionSidenotes)
    if (document.fonts) {
        document.fonts.ready.then(positionSidenotes)
    }
    let resizeTimer = null
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(positionSidenotes, 100)
    })
})()
