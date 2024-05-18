---
title: "1. Establishing a Latin reference"
draft: false
comments: false
weight: -1
images:
---

I first went through the various editions' scans of the original book that can be found online.

From this emerged the picture of a `1684` original edition, a `1701` expanded edition (with additional aphorisms as well as what looks like two booklets on similar topics added for padding), and a `1724` simplified edition (which drops the padding booklets; this is what was used for the official French translation).

I decided to work from the `1701` expanded edition as it contains all parts present in other editions, which gave me the freedom to cut it down to either other edition at a later point.

After listing the chapters of the book (using [Claude Opus](https://www.anthropic.com/news/claude-3-family)[^claude] and some manual clean-up[^index]), I turned the two OCRs I had for this edition into a master version (one section at a time) using the following prompt (which includes the table of contents of the Latin text as well as the name of the section to clean up and the name of the next section):

````md
I am giving you two OCRs of the 1701 print of Mazarin's `Breviarum Politicorum, Secundum Rubricas Mazarinicas`.

The book is structured as follows:

```md
$INDEX
```

Your task is to clean up the `$HEADING` section (the FULL section: up to, and excluding the `$NEXT-HEADING` section).

Use modern Latin standards, such as substituting 's' for 'f', clarifying 'u/v' and 'i/j' ambiguities, ASCII character set, and standardizing orthography for consistency with contemporary usage.
Using appropriate markdown features such as emphasis, etc., where applicable.

Do not include the title of the section. Put your response in <response></response> tags.
````

The text was then checked against a scan of the book to ensure that all of it had been transcribed, as well as to check for paragraph breaks, italics, and other forms of emphasis.

Finally, I cut the padding out (`De Conciliatione Animorum` and `Ubi Ingenium Excolendum`), which gave me a text similar to the `1724` simplified edition. Going forward, this is my reference Latin text to be translated.

[^index]: Note that the book is only *loosely* organized, forming a list of parts of widely varying sizes. Thus, splitting it into parts does include an element of subjectivity.

[^claude]: It is the model used with all following prompts. Due to both its long context length (able to take the full book as input) and superior performance on literary tasks.
