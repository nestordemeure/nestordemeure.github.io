---
title: "TODO"
draft: true
comments: false
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
* Or, in particular inside the book facing each new chapter, one can use illustration of the [lewis chess pieces](https://www.nms.ac.uk/explore-our-collections/stories/scottish-history-and-archaeology/lewis-chess-pieces/) (and [other](https://en.wikipedia.org/wiki/Charlemagne_chessmen) similar sets).

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
This hypothesis suffers from the fact that it might be possible to build structure onto a text, pattern matching where there is no intent.
Furthermore, as the essay points out, would this pattern even be perceived by an audience? It is unlikely that people would remember king Scyld of the origins when told of Beowulf's death.

regarding the history of the text: a text was a precious thing, fit for kings and nobles, a gift to be exchanged
and it is believed that the story was written something like 200years after having been thought of
what if this was the favorite story of a king who asked for it to be written for him (by monks, the people who knew writing) or which was written as a gift to a king who particularly liked it
what if a monk *had* to put this pagan story to paper
