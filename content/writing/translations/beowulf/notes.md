---
title: "Translator's Notes"
draft: false
comments: false
weight: -10
images:
---

The bulk of the translation work was done using Artificial Intelligence (and in particular [Claude Opus](https://www.anthropic.com/news/claude-3-family)[^claude]).

The process and prompt I used are detailed below.
They were born out of a lot of trial and error and are likely still very imperfect (as demonstrated by the fact that I was not able to capture the style I wanted).

[^claude]: Mostly because it boasts both a very long context length (giving it the ability to read and write long texts such as Beowulf) and best-in-class abilities when it comes to literary writing. Sadly, and likely not coincidentally, it is much weaker than alternatives like [GPT-4](https://openai.com/gpt-4) at following instructions.

## Chapters

First, I cut the story into chapters (as a way to both break down the work and introduce breathing points into the reading), starting from [Carrigan's model of Beowulf's design](https://en.m.wikipedia.org/wiki/File:Carrigan%27s_model_of_Beowulf%27s_Design.svg) then trying to produce units of text of similar size[^size] and each ending on a dramatic or suspenseful note:

* I. Beginnings (from the beginning to the introduction of Grendel)
* II. Grendel (from the description of Grendel's action to Beowulf being invited to sit in the hall)
* III. Beowulf (from Beowulf's swimming story to the end of the fight with Grendel)
* IV. The Morning After (from Grendel's arm cut on the floor to telling us about his mother's existence)
* V. Grendel's Mother (from telling us about Grendel's mother to ending with Grendel's head in the hall)
* VI. Trophies (from telling us about Grendel's head in the hall to telling us about the existence of the dragon)
* VII. The Dragon (from telling us about the dragon to Beowulf being deadly wounded)
* VIII. Twilight (the end)

[^size]: `Trophies` might be worth splitting further (when Beowulf leaves), but I am not quite sure that the splitting point would be able to sustain a reader's interest.

## Literal translation

Then I used the following prompts as well as a transcript from Old English (from the excellent [Electronic Beowulf project](https://ebeowulf.uky.edu/ebeo4.0/CD/main.html)) to produce a very raw translation. Trying to extract the chapters and transcribe, as faithfully as possible, the facts of the text into English:

```md
I gave you a transcription of Beowulf in Old English. Write a translation, very literal right now we want to make sure that we capture all of the elements of the story, we will revisit the style later, of a first chapter (which we will call `Beginnings`​) that goes from the beginning to the introduction of Grendel (our first dramatic note).

I gave you a transcription of Beowulf in Old English. Write a translation, very literal right now we want to make sure that we capture all of the elements of the story, we will revisit the style later, of a second chapter (which we will call `Grendel`​) that goes from the description of Grendel's action to Beowulf being invited to sit in the hall (just before the swimming story).

I gave you a transcription of Beowulf in Old English. Write a translation, very literal right now we want to make sure that we capture all of the elements of the story, we will revisit the style later, of a third chapter (which we will call `Beowulf`​) that goes from Beowulf's swimming story to the end of the fight with Grendel (ending on the dramatic and bloody note of the arm being cut).

I gave you a transcription of Beowulf in Old English. Write a translation, very literal right now we want to make sure that we capture all of the elements of the story, we will revisit the style later, of a fourth chapter (which we will call `The Morning After`​) that goes from Grendel's arm cut on the floor to telling us about his mother's existence (a dramatic note resonant with us being told about Grendel's existence).

I gave you a transcription of Beowulf in Old English. Write a translation, very literal right now we want to make sure that we capture all of the elements of the story, we will revisit the style later, of a fifth chapter (which we will call `Grendel's Mother`​) that goes from telling us about Grendel's mother to ending with Grendel's head in the hall (a dramatic and bloody note resonant with Grendel's arm in the hall).

I gave you a transcription of Beowulf in Old English. Write a translation, very literal right now we want to make sure that we capture all of the elements of the story, we will revisit the style later, of a sixth chapter (which we will call `Trophies`​) that goes from telling us about Grendel's head in the hall to telling us about the existence of the dragon (a very dramatic note).

I gave you a transcription of Beowulf in Old English. Write a translation, very literal right now we want to make sure that we capture all of the elements of the story, we will revisit the style later, of a seventh chapter (which we will call `The Dragon`​) that goes from telling us about the dragon to Beowulf being deadly wounded (a dramatic point).

I gave you a transcription of Beowulf in Old English. Write a translation, very literal right now we want to make sure that we capture all of the elements of the story, we will revisit the style later, of the last chapter (which we will call `Twilight`​).
```

I edited this translation, removing all Christian references (such as "Cain" and "Almighty God"), and making sure that the chapters started and ended where I wanted.
I also added notes to highlight parts of the text and elements I care for in order to ensure that they survive the next step.

## Style

I used the following prompt to transcribe the text into the style I wanted[^improved]:

````md
I have provided you with a literal translation of the first chapter of Beowulf, titled "Beginnings," which covers the story from the start up to the introduction of Grendel. The translation includes annotations in square brackets to highlight key elements and aspects that I find particularly important or compelling. Please note that Christian vocabulary has been deliberately minimized or removed.

Your task is to rewrite this chapter, focusing on enhancing the style while preserving the story's content and details. We will tackle the remaining chapters in subsequent tasks. As you edit, please prioritize the following three aspects:

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
   - Bear in mind that Beowulf is an oral story narrated by a storyteller who addresses the audience directly (akin to Rudyard Kipling's style in "Just So Stories"). Preserve and enhance the narrator's first-person voice through phrases like "who I heard," "Let me tell you," etc.
   - Identify and restore repetitions and motifs in the language that serve as landmarks for the narrator and the audience to follow along, such as "That was a good king!", "That was a good people!", "Son of," etc. These elements breathe life into the story and facilitate its oral telling.

Your goal is to enhance the style and flow of the chapter while staying true to the original intentions and meaning. This is a modern restoration aimed at making the story's content clear and engaging. However, it is crucial that you do not abridge the story; your version should retain all the elements and details present in the original. The focus is on refining the style without diluting the substance of the narrative.
````

[^improved]: This prompt was written by Claude. It took an earlier prompt I wrote (of similar complexity) and cleaned it up.

### Final Notes

I obtained a serviceable translation of Beowulf into prose[^old].
It, however, fails at capturing the style I wanted, the orality of the poem.
Fixing it will be for another day.

[^old]: Hard to say how much of the quality of the end result comes from the model being able to read Old English and how much of it comes from Beowulf being a classic text.
