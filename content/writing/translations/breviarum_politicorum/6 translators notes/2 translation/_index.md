---
title: "2. Translation to English"
draft: false
comments: false
weight: -2
images:
---

I first translated the index, editing it until I was fully happy with it:

```md
# Breviarum Politicorum

## A Word from the Publisher

## Fundamentals

### Learn About Yourself

### Learn About Others

## Acting in Society

### Gaining Favor

### Identifying Who is Someone's Friend

### Gaining Esteem and Reputation

### Finding More Time for Business

### Acquiring Gravity

### Reading and Writing

### Giving Gifts and Favors

### Asking for Things

### Admonishing

### Avoiding Deception

### Preserving Health

### Avoiding Envy

### Uncovering Secrets

### Discerning Intentions

### Avoiding Offense

### Encouraging Action

### Acquiring Prudence

### Acting Cautiously

### Getting Rid of an Unwelcome Guest

### Conversing with Others

### Joking

### Avoiding Ambushes

### Managing Wealth

### Gaining and Conferring Honors

### Responding to Requests

### Managing Emotions

### Feasting

### Avoiding Losses

### Acting in Novel Ways

### Negotiating Shrewdly

### Covering Mistakes

### Stirring Hatred Against the Wicked

### Dissolving Friendships

### Praising Others

### Preventing Someone from Declining a Duty

### Controlling Anger

### Fleeing

### Punishing and Correcting

### Quelling Sedition

### Handling Self-Praise

### Maintaining Inner Peace

### Disregarding Criticism

### Acquiring Dexterity in Acting

### Averting Suspicion

### Deposing the Wicked

### Traveling

### Avoiding Vain Pursuits

### Arguing and Correcting

### Managing Emotions

### Avoiding Lending Money

### Arriving at the Truth

### Accusing

### Being Accused

### Visiting Provinces

### Reading Speculative Books

## Axioms

## Summary

#### Simulate, Dissimulate

#### Trust No One

#### Praise All

#### Mind Your Words
```

I then translated it using the following prompt (which includes the name of the section to translate in Latin as well as English, plus the Latin name of the next section):

```md
You are a skilled and expert translator of Latin to English. Your translations are both faithful to the original and read smoothly and naturally for contemporary English readers.

I am giving you the Latin text of the 1684 print of Mazarin's `Breviarum Politicorum, Secundum Rubricas Mazarinicas` as well as the ongoing translation to English (all section titles have already been translated).

Your task is to translate `$LATIN-HEADING`, the next section, from Latin to English (`$ENGLISH-HEADING`).

Translate the FULL section (up to, and excluding the `$NEXT-HEADING` section). Take the existing translation, as well as the translation for the upcoming headings, into account. Preserve emphasis and other types of Markdown formatting. Your text should read EASILY: it should be clear, use direct sentence structures, and split into short paragraphs. Break lines meaningfully rather than following the original: the Latin text was produced by an OCR and that it might contain small mistakes as well as approximate line breaks.

Do not include the title of the section. Put your translation in <response></response> tags.
```

Having obtained a translation, I checked for missing and added passages (a common failure case) running this prompt one section at a time until all were triple checked or corrected:

````md
This Latin excerpt is a section of the 1684 print of Mazarin's `Breviarum Politicorum, Secundum Rubricas Mazarinicas`:

```md
$LATIN
```

This is the corresponding translation to English:

```md
$ENGLISH
```

I am afraid that text has been added or removed in the English translation.

Check the translation (especially the beginning and end of the section, this is where addition/deletion is the most likely) and tell me if the English matches with the Latin or not.

If the translation appears correct, display "Matching". Otherwise, provide a fixed translation. Either way, put your answer in <response></response> tags.
````

I then did a machine-assisted editing pass using the following prompt to single out sentences that needed clarification:

````md
You are an expert editor with a knack for producing clear, well-flowing texts.

This is an excerpt from an English translation of Mazarin's `Breviarum Politicorum, Secundum Rubricas Mazarinicas`:

```md
$ENGLISH
```

Does the translation appear easy to read and understand for a contemporary audience (it is targeted at an audience of non-specialists)? Some formulations, terms, or sentence structures might be hard to grasp, unclear, or refer to unspecified elements.

If needed, provide a list of passages that require further work, as well as suggested fixes or requests for clarifications. Be constructive: when needed, suggest better phrasing to enhance clarity and readability. Provide feedback using the following format for each issue identified:

```md
* "Original sentence"
  * Problem: [Brief description of the issue with the original sentence.]
  * Suggestion: [Your suggested rephrased sentence.]
```

Note that this is a 17th-century text: it might contain stereotypes, outdated views, and unethical suggestions. These are fine, as our reader will have further context with the text, and they are not to be edited out.
````

Finally, I did a full reread of the text, further editing it for clarity.
