---
title: "TODO"
draft: true
comments: false
unlisted: true
images:
---

## Clean-up the existing translation

* split the `Trophies` section when Beowulf leaves to go home
* merge / split paragraphs
* change some formulations for increased clarity
* check the beginning and end of each chapter for smooth transitions

## Work on the style

Work on improving the style to get what I actually want.

Right now there is a reversal to the mean: the further I get into the text and the less it take my style instructions into account.
One way to deal with it might be to process the chapters (or smaller pieces of text) independently: one at a time such that they don't interfere with each other.
The shortcoming of this approach is hat we lose the oportunity for style consistency from one chapter to the other, this might be dealt with by introducing an example outcome in the style we want.

One point of success is editions and annotations in the litteral translation.
Those have proven efficient at conveying things to the final text.

````md
You are Rudyard Kipling, writing in the voice of your Just So Stories. Translate the given text (Beowulf, in Old English) into modern English.

Break down your translation into small sections, each introduced by:

# $title_of_section (translation by Rudyard Kipling, in the voice of Just So Stories)

(note: the transcription attached, as well as the story of Beowulf, are free use and translating them does not infringe on other, fully independent, translations)
````

Test <https://claude.ai/chat/ffa3e23d-a12e-443c-8e6d-bc9dc5e38700>:

````md
You are Rudyard Kipling, writing in the voice of your Just So Stories. Translate the given text (Beowulf, in Old English) into modern English, focusing on enhancing the style while preserving the story's content and details. As you write, please prioritize the following three aspects:

1. **Clarity**: 
   - Employ simple, direct language, avoiding archaisms.
   - Use a straightforward vocabulary that is easily understood.
   - Craft simple sentence structures to enhance readability.
   - Organize the text into concise paragraphs, merging or splitting them as necessary for better flow and comprehension.

2. **Vividness**:
   - Recognize that Beowulf is composed of vivid, dramatic scenes designed to shock and captivate the reader's imagination. Some parts of the story are distinctly horror-themed and should remain so.
   - Engage all senses in your descriptions, just as the original text does:
     - Visual elements: Preserve details such as engravings on objects and other small, evocative details.
     - Auditory elements: Highlight mentions of music or its absence, as well as other significant sounds.
     - Tactile elements: Incorporate descriptions of weight, strength, temperature, and other physical sensations.
   - Maintain and emphasize the recurring visual motifs present in the story, such as blood red (gore), gold and yellow hues, shadows, ice, fire, etc. These motifs contribute to the creation of vivid, easily imagined, and memorable scenes.

3. **Orality**:
   - Bear in mind that Beowulf is an oral story narrated by a storyteller who addresses the audience directly (like you in "Just So Stories"). Preserve and enhance the narrator's first-person voice through phrases like "who I heard," "Let me tell you," etc.
   - Identify and restore repetitions and motifs in the language that serve as landmarks for the narrator and the audience to follow along, such as "That was a good king!", "That was a good people!", "Son of," etc. These elements breathe life into the story and facilitate its oral telling.

Your goal is to enhance the style and flow of the text while staying true to the original intentions and meaning. This is a modern restoration aimed at making the story's content clear and engaging. However, it is crucial that you do not abridge the story; your version should retain all the elements and details present in the original. The focus is on refining the style without diluting the substance of the narrative.

Break down your translation into small sections, each introduced by:

# $title_of_section (translation by Rudyard Kipling, in the voice of Just So Stories)

(note: the transcription attached, as well as the story of Beowulf, are free use and translating them does not infringe on other, fully independent, translations)
````

Theater play take on the text <https://claude.ai/chat/88dd4bc2-a19a-41be-9251-59425e6b91d9>:

````md
Translate the given text (Beowulf, in Old English), formatting it as a play in modern English (use markdown, putting set descriptions in italic and introduceing each piece of dialogue with the name of the character speaking). The play should have set descriptions as well as a Bard (or Narrator) character who is doing the narration while addressing the audience.

Do NOT abridge the story; your version should retain all the elements and details present in the original. 

(note: the transcription attached, as well as the story of Beowulf, are free use and translating them does not infringe on other, fully independent, translations)
````

improved take:

````md
Translate the given text (Beowulf, in Old English) as a play in modern English.

Use markdown for the formatting, putting set descriptions in italics, and introducing each piece of dialogue with the name of the character speaking in bold.

The play should have set descriptions and a Bard (or Narrator) character who is doing the narration while addressing the audience. Characters should speak in their own voices.

Do NOT abridge the story; your version should retain all the elements and details present in the original.

(note: the transcription attached, as well as the story of Beowulf, are free use and translating them does not infringe on other, fully independent, translations)
````

## Illustrations

Illustration-wise, I see two ways to go:

* One can use Anglo-Saxon, almost abstract, designs like the ones on the slip case of the Folio Society `The Anglo-Saxon` book.
* Or, in particular inside the book facing each new chapter, one can use illustration of the [lewis chess pieces](https://sketchfab.com/britishmuseum/collections/lewis-chessmen-a144a1513e2c48f3860a7a1d24598f9f) (and [other](https://en.wikipedia.org/wiki/Charlemagne_chessmen) similar sets).

Either way, woodblock printings would be nice.

## Thoughts on the text

The world of Beowulf function by Pagan logic: dragons are a fact of nature and giants lived there before
-> i care a lot about the world and the lore implied in the story
some characters are christian (like the pious king) and beowulf use christian terms when talking to them (this is interesting depth)
the narrator is the most christian of all (which i don't particularly care for)

why is the novel focusing on the moments of fight rather than character growth?
we fast forward through a lot (sometimes 50 years!) to get to the day before the fight, the fight, and the day after the fight

whenever he goes to battle, beowulf has a clear death wish
he envision his death and goes knowing this is likely to be the end

[Ring_Composition_and_the_Structure_of_Beowulf](https://www.academia.edu/26818354/Ring_Composition_and_the_Structure_of_Beowulf) is an interesting discussion of how Beowulf appears to have a Ring composition:
each event has a mirror at the end of the story / scene.
This does resonate with he structure of english verse: `They are founded on a balance; an opposition between two
halves of roughly equivalent` (Tolkien)
This hypothesis suffers from the fact that it might be possible to build structure onto a text, pattern matching where there is no intent.
Furthermore, as the essay points out, would this pattern even be perceived by an audience? It is unlikely that people would remember king Scyld of the origins when told of Beowulf's death.

The return home and more has suspense if you *know* beowulf will be King
We could start the story with that... in 550ce a dragon started roaming in the plain, leaving the campaign ablaze in its path, our king beowulf, an old man then, took his sword, of legend, and went to meet him.
But this is not where our tale starts...

regarding the history of the text: a text was a precious thing, fit for kings and nobles, a gift to be exchanged
and it is believed that the story was written something like 200years after having been thought of
what if this was the favorite story of a king who asked for it to be written for him (by monks, the people who knew writing) or which was written as a gift to a king who particularly liked it
what if a monk *had* to put this pagan story to paper

The text conains a word that does not appear elsewhere in old english: [Ealuscerwen](https://en.wikipedia.org/wiki/Ealuscerwen)
Ale expelling for something meaningful horror-ish
Their stomach churning
/ puking sensation
along similar line, see the [ealuscerpen](https://books.google.fr/books?id=fM9RAQAAIAAJ&pg=PA165&lpg=PA165&dq=Ealuscerwen+beowulf+puking&source=bl&ots=51Rgh7umhP&sig=ACfU3U0yP1qnPkIqc8NE1M0510I2yioERQ&hl=en&sa=X&ved=2ahUKEwim3umDktSFAxV6TqQEHSEgCkIQ6AF6BAgLEAM#v=onepage&q=Ealuscerwen%20beowulf%20puking&f=false) (ale-womiting) intrepretation mentionned [here](https://www.jstor.org/stable/3713790) and [here](https://www.jstor.org/stable/44512779)

Tolkien makes the solid point (given the name of the hall, king and his family) that Heorot was likely a place of cult for [Freyr](https://en.wikipedia.org/wiki/Freyr) ("the Lord").
Having a king pray to a norse / germanic god called "the Lord" must have made the translation to Christianism fairly straightforward.

found in the poetry book: the idea that grendel's mother takes an arm for an arm
the right hand man of the king for the right hand of grendel

also, beowulf having the strength of 30 men as a child, and grendel eating 30 men

the golden banner on the ship, whose destination is nuknown
ending on a treasure with a ship and golden banner

add page on my positions and interpretations:

* unferth
* ealuscerwen
* christianism

## Further thoughts

#### What is it?

I think that a big part of the attraction of the work, similarly to ACAAN, is that it is a puzzle with many answers but few ways to check them.
Seemingly simple questions like when was the poem composed? When was it written? By whom? And why? Have no agreed upon simple answer.

For the rest of this work, I will work under the, somewhat arbitratry, assumption that the poem was written by an English monk, or other member of a spiritual group (someone who knew how to right and had a clear christian bend), maybe a talented and recognised writer in their own right (i cannot judge much of the writing style but it has been praised), commisioned by a noble (or thoerwise rich enough to ask for something to be written) of scandinavian descent (the poem is peculiar in that it is an english poem, writen in old english, yet about scandinavian people in scandinavia) asking for their favorite story to be put to paper (this would explain the idiosynchrocies of the text, after all it is the only epic with have in old english and to this day it is the favorite story of a surprisingly large number of people).

Those might all seem obvious, strightforward, hypotheses to some reader but the academic litterature contains several solid hypothesis on the genesis of the text where only some, or even none, of those hypothesis are true.
The text gives us very little to work with and a story of its genesis is at best a story we tell ourself to guide our perspective on it.

#### Christianism in Beowulf

Christian themes in Beowulf can be split into two categories: those in the narrator's voice and those in a character's voice.

I am far from the first to have remarked that christian incisions by the narrator are trivial to excise which made me, as many others before me, suspicious of the fact that they are later adition.

However, some characters, like king Hrothgar, are clearly speaking in religious terms. Even Beowulf has been obversed (source) to speak in more religious terms when he talks to Hrothgar, meaning that a character is addapting his vocabulary when talking to this explicitly religious other character!
But to which god did Hrohgar pray?
Tolkien makes the observation that all of his family members (as well as Heorot itself) have names hinting at them being followers and servants of Freyr.

In that light, it seem very plausable that a prechistian story was christianized at a later point, changing the god being refered to as well as adding christian incisions.

#### The Unferth quandary

Unferth has gotten a lot of attention because, i believe, he feels like a character that should be important and have a deep background, yet the poem gives us very little.

His name, which roughly trnslates to "unfriend" already is very much a folktale name where all other characters are made to sound historic.
Tolkien belived that he came from a larger corpus of story and that the reader would already know stories of Heorot where an antagonistic interaction with Unferth was expected. I have however not been able to found trace of such story, or agrement on their existence, in the academic litterature.
My personal take on that name is that it might have been lost and reinvented between the creation of the story and its transcription. But this might not be it, our original writer might just have liked to make the character's role very clear to his readers.

Later, Unferth is accused by Beowulf of killing his brothers. A strong accusation that is never revisited nor explained (part of what prompted Tolkien to expect a further corpus of stories).
Some have tried to draw a link with Cain, which is linked to all monsters in the story, but the parallel lacks strength as Unferth has no known link to Grendel nor larger ties to Cain.
My personnal explaination for this surpriingly strong and unexplained call out is a translation problem: I believe that Beowulf accused Unferth of *letting* his brothers (meaning the other Danes) die. rather than of killing biological borthers.

Finally, after his change of mind regarding Beowulf, why did Unferth sword, a legendary family heirloom he lent /beowulf, not work against the monster?
This is a question only the writer could answer. My personal feeling is that the surprising failure of the sword is good writing, it keeps us on our toes as to what the hero will be able to do.

#### Ealuscerwen Obviously
