# Breviarum Politicorum Secundum Rubricas Mazarinicas

This folder contains the raw Latin text of the `Breviarum Politicorum Secundum Rubricas Mazarinicas` as well as the OCRs that were used to produce it and its English translation.

It is provided as is to help with further work or alternative translations of this text.

#### Organization of the files

Each folder corresponds to a chapter from the Latin text.
The chapters are purposefully not grouped into sections as the Latin text is very loosely organized.

In each folder you will find:

* `raw1.txt` and `raw2.txt`, the OCRs that were used as a basis for the translation,
* `latin.txt`, the Latin reference that was produced from the OCRs,
* `english.txt`, a translation of the text (which might have been later improved).

#### Building the Latin reference

I used an OCR of [this edition](https://books.google.com/books?id=MAsFAAAAcAAJ) (`raw1`) and an OCR of [that edition](https://books.google.com/books?id=gd0WwAEACAAJ) (`raw2`) from [Google Books](https://books.google.com/) as my references.

While the pictures are clear, each OCR is muddled (words and letters are missing or replaced, and linebreaks are all over the place) in its own way.
I cut each OCR into one file per chapter, cut line numbers and page headings manually then merged them into a Latin version using the following prompt:

```
Here are two OCR versions of a text in Latin. Please compare them carefully and produce a single, clean Latin version, making sure to include any additional sentences or parts of sentences from either OCR:

# OCR1:

raw1

# OCR2:

raw2
```

When needed, I passed the following prompt to have GPT4 finish a partial answer:

```
Keep going from where you left off.
```

Finally, for each file, I went back to both Latin references to make sure that no part of the text was missing (some paragraphs are missing from some versions of the text) and that linebreaks respected the original (those were mostly lost or randomized in the process).

This gave me `latin`, the Latin reference text used for the translation[^latin]. While not perfect (there are still incorrect linebreaks, missing characters and word substitutions, they are just a lot less common), this version is good enough to proceed with the translation.

[^latin]: Interestingly, `latin` has idiosyncracies inherited from *both* references. Making it its own version of the text rather than a clean-up of either source.

#### Translation process

`latin` was translated into `english` using the following prompt (sometimes run several times, picking the best translation for each sentence):

```
Translate from Latin to English (the text was written by Cardinal Jules Mazarin):

latin
```

Note that I specify that the text was written by Cardinal Jules Mazarin to give some style context for the translation.

The translation was then polished by hand before being fact-checked against an [existing French translation](https://www.arlea.fr/Breviaire-des-politiciens) to make sure that meaning was not lost in the process of cleaning the text or translating it[^differ].

Finally, I went over chapter titles and had GPT4 harmonize them.

*Do not hesitate to contact me if you want to work on this data or can suggest fixes to the Latin reference or its translation!*

[differs]: The meaning of some passages *does differ* between both translations, mostly where the original is so terse that one needs to interpret it to keep the text readable.