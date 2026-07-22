// Footnotes -> sidenotes, TeX-style justification, and sidenote placement.
//
// Pipeline (order matters):
//   1. turn Hugo's footnotes into sidenote elements
//   2. run justif (Knuth-Plass line breaking) on the body text AND the sidenotes
//   3. place the sidenotes in the margin, aligned to their markers
//
// justif reflows the body text, which moves the footnote markers, so it MUST
// run before placement (step 3 measures marker positions). justif also cannot
// justify a paragraph that contains a non-inline child, so each sidenote is
// inserted as a sibling *after* its marker's block rather than inline next to
// the marker: the marker (an inline <sup>) stays in the paragraph, keeping the
// paragraph justifiable.

import { justify } from './justif/index.js'
import { hyphenateEnUS } from './justif/hyphenate/en-us.js'

;(function () {
    'use strict'

    // block-level text elements justif should justify, within post content.
    // sidenote text is justified separately (see below); everything inside a
    // .sidenote is excluded from this pass.
    const CONTENT_SELECTOR = [
        '.post-content p', '.post-content li', '.post-content figcaption', '.post-content dd',
        '.posts .content p', '.posts .content li', '.posts .content figcaption', '.posts .content dd',
    ].join(', ')

    const justifyOptions = { hyphenate: hyphenateEnUS }

    //-------------------------------------------------------------------------------------------------
    // FOOTNOTE TO SIDENOTES

    // inserts just after a given html element
    // see: https://stackoverflow.com/a/4793630/6422174
    function insertAfter(referenceNode, newNode) {
        referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling)
    }

    // iterates as long as we can find footnotes
    const sidenoteList = []
    // remembers the last node inserted after a given block, so several
    // footnotes in the same block keep their document order
    const lastInsertedForBlock = new Map()
    while (true) {
        const id = sidenoteList.length + 1
        // finds the footnote number in the text
        const marker_id = `fnref:${id}`
        const footnote_number = document.getElementById(marker_id)
        if (!footnote_number) {
            // the id has no associated footnote, we are done
            break
        }
        // put the "[" "]" around the marker into real text rather than CSS
        // ::before/::after: justif measures line widths from the DOM text, so
        // pseudo-element brackets are invisible to it and every justified line
        // carrying a marker ends up ~2 characters wider than justif aimed for
        // (its right edge overshoots the margin).
        const ref = footnote_number.querySelector('.footnote-ref')
        if (ref && !ref.dataset.bracketed) {
            ref.textContent = `[${ref.textContent}]`
            ref.dataset.bracketed = '1'
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
        // insert the sidenote *after* the marker's block (not inline next to the
        // marker) so the block stays free of non-inline children and justif can
        // justify it; the inline marker stays put for placement.
        const block = footnote_number.closest('p, li, blockquote, figcaption, dd, dt, pre, h1, h2, h3, h4, h5, h6') || footnote_number
        const reference = lastInsertedForBlock.get(block) || block
        insertAfter(reference, sidenote)
        lastInsertedForBlock.set(block, sidenote)
        // store the marker's id, not the element: justif rebuilds each paragraph
        // and replaces the marker with a (re-)cloned copy, so the element must be
        // looked up fresh by id every time we measure it (see positionSidenotes).
        sidenoteList.push([marker_id, sidenote])
    }

    // delete the footnote footer if there was at least one footnote
    if (sidenoteList.length > 0) {
        document.getElementsByClassName("footnotes")[0].remove()
    }

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
        for (const [markerId, note] of sidenoteList) {
            // look the marker up fresh: justif may have replaced the original
            // element with a clone (the stored reference would be detached)
            const number = document.getElementById(markerId)
            if (!number) continue
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

    //-------------------------------------------------------------------------------------------------
    // ORCHESTRATION

    // justifies a set of elements and waits for justif to settle (fonts +
    // layout). justif skips anything it cannot handle (paragraphs holding an
    // image or table, etc.), leaving the CSS `text-align: justify` fallback.
    // never throws: even if justif fails we still want the notes placed.
    async function justifyAndSettle(elements) {
        if (elements.length === 0) return
        try {
            await justify(elements, justifyOptions).ready
        } catch (err) {
            console.error('justif failed:', err)
        }
    }

    async function run() {
        const contentTargets = Array.from(document.querySelectorAll(CONTENT_SELECTOR))
            .filter(el => !el.closest('.sidenote'))
        const noteTargets = Array.from(document.querySelectorAll('.sidenote-text'))

        // 0. wait for the webfonts before justifying. justif's initial pass runs
        //    synchronously and enhances every element up front, but its post-font
        //    re-measurement is viewport-gated: an off-screen element measured with
        //    the (narrower) fallback font can be left un-justified because its
        //    correction is parked until scrolled into view. A short note then
        //    wraps to a second line under the real font and falls back to the
        //    browser's justification, which will not hyphenate a capitalised word
        //    (e.g. "Necronomicon") -> large gaps. Measuring with fonts already
        //    loaded avoids that entirely.
        if (document.fonts && document.fonts.ready) {
            try { await document.fonts.ready } catch (err) { /* ignore */ }
        }

        // 1. justify the body text FIRST and wait for it to settle: this reflows
        //    the text and moves the footnote markers, so it must finish before we
        //    measure marker positions.
        await justifyAndSettle(contentTargets)

        // 2. markers are now in their final positions: place the notes with the
        //    vetted algorithm. this also gives each note its final narrow width.
        positionSidenotes()

        // 3. justify the sidenote text now that it has its final width.
        await justifyAndSettle(noteTargets)

        // 4. justifying the notes changed their heights, so place once more
        //    against the final layout.
        positionSidenotes()
    }

    run()

    // reposition when late-loading resources (images, webfonts) shift the layout,
    // and on resize (justif reflows via its own ResizeObserver first)
    window.addEventListener('load', positionSidenotes)
    if (document.fonts) {
        document.fonts.ready.then(positionSidenotes)
    }
    let resizeTimer = null
    window.addEventListener('resize', function () {
        clearTimeout(resizeTimer)
        resizeTimer = setTimeout(positionSidenotes, 150)
    })
})()
