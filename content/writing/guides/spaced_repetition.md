---
title: "Nestor's Guide to Remembering Things Forever"
draft: false
comments: false
date: 2024-02-12
images: 
---

*"La répétition fixe la notion."*
— Anonymous

I have been using mnemotechnic techniques for about a dozen years now (they are definitely the one thing I wish I would have known when I was a student with important exams coming up), but I recently became enamored with spaced repetition as an easy way to learn anything you want and remember it forever.

*Imagine being able to trust the process and knowing that if you get started today, in six months you will know a complex piece of knowledge.* That is the promise of spaced repetition.

## What is Spaced Repetition

Spaced repetition is an elaboration on the idea that practicing at regular intervals works significantly better (giving you better long-term recall for lower effort) than binge working a topic (the common experience of reviewing the night before an exam and having forgotten everything by the next day)[^science].

[^science]: The benefits of regular work, and in particular spaced repetition, have been [thoroughly researched and reproduced across a wide variety of domains](https://gwern.net/spaced-repetition#literature-review). It is one of those few things having to do with the human brain that have actually been *proven* to work.

To use it, you break the knowledge you want to remember into cards that are each a simple pass/fail task (i.e., "What is the French for butter?" / "Beurre"), add the cards to your implementation of choice (I will give you various options later in this guide), and it will ask you about them at regular intervals.
If you fail, it will test you again soon. If you succeed, it will take a little more time before testing you again so that you don't waste time reviewing easy cards too often[^efficient].

[^efficient]: This is a *key* advantage of the method. It is very efficient and lets you make the most out of your practice time.

So, what can I use it for? Turns out that you can apply it to remember a lot of very different things[^imagination]:

* *school work* is the most obvious application; a lot of education (at least up to high school, but also a number of certifications that one might need to get as an adult) is still very much a test of one's ability to recall given information.
* *languages* are the killer app of spaced repetition; it makes it trivial to increase your vocabulary and memorize the rules of grammar. It will not be enough to fully grasp a language, but it takes a lot of the work out of the task.
* *multi-step processes* this could be memorizing a piece of music, a full theater play, a complex hypnotic induction, etc. Anything that has too many steps to fit comfortably in one's head.
* *scripts* there are [great ways](https://youtu.be/k8k_rNTDjJM) to remember scripts down to the exact word; spaced repetition becomes useful when you want to *keep* that knowledge in for the long term or if you want to remember a series of ideas rather than specific words (talks would be an example of something where you do not have to be word-exact).
* *maintaining motor tasks* is more tricky to find uses for[^motor] but very much worth it when you can find a use case. Basically, any manual activity that you can practice as a bite-sized thing and classify as pass or fail would fall into this category.
* *remembering everything* some people just want to remember every movie or book they ever read. Adding a summary of it to your system is an easy way to do that if it is of interest to you (I personally [just take notes](/writing/guides/ideas/#how-do-you-organize-knowledge)).
* *preserve existing knowledge* any knowledge you currently have and fear you will forget with time is, pretty much by definition, perfect for spaced repetition.

[^imagination]: Most people are surprisingly unimaginative with their applications, focusing on languages and academic knowledge. But it can be applied to a *lot* of skills you might want to learn.

[^motor]: Surprisingly, people have found that spaced repetition works to learn motor skills as varied as [typewriting, archery, and javelin throwing](https://gwern.net/spaced-repetition#motor-skills).

I would insist on the fact that it is a system designed for *forever learning*. If you need to practice for next week's exam, then binging is actually more likely to get you ready in time (!).
But if you care about remembering the information next month or next year, then spaced repetition is the gold standard.

To me, the value in spaced repetition is that *it makes time work for me and not against me*.
Before using it, any knowledge I would learn would be at risk of being lost if I did not practice it often enough[^forget].
Now, I know that every day gets me closer to having a good recall of the knowledge I placed in the system.

[^forget]: Which led me to make the conscious decision to *not* learn some useful things because I knew I would not use them often enough to keep them at a useable state of recall.

## How Can I Use Spaced Repetition

First and foremost, the key behind spaced repetition is *regular work*.
The exact details of how you use it matter less than dedicating time to it every day, every other day, or every week.
Someone using hastily written flashcards in a shoebox every day will get better results than someone using state-of-the-art algorithms and impeccable cards every month.

### Implementations

Spaced repetition is fairly easy (and fun!) to implement by yourself if you know some programming.
As a corollary, you will find many free implementations of spaced repetition (there is no reason to pay for it[^support]).

The classic one is [Anki](https://apps.ankiweb.net/). It is pretty much the reference open source implementation by which all others are measured.
You will find front ends for it on computers as well as phones *but*, I found that their barebone user interface is a big turn-off for me.

I am currently using [Space](https://play.google.com/store/apps/details?id=com.space.space&hl=en_US&gl=US), a free Android app.
It is... fine. I like the user interface, and it works; that is all one needs.

If you like analogue solutions, then you can do with 5 boxes (or envelopes) and a bunch of flashcards with the [Leitner System](https://en.wikipedia.org/wiki/Leitner_system).
It will be slightly less optimized from an algorithmic perspective, but it works.

[^support]: Unless you want to support a particular developer's work, obviously.

### Writing Cards

Writing cards is a skill and you will get better at it with practice.
I have found that a few key things are good to know when you are getting started:

First and foremost, *you should write your own cards*.
The process of writing them is a great way to let your brain know that a piece of information is of interest to you and worth remembering; that alone will boost your recall.

At first, you might be tempted to turn wide topics into single cards; that will make your life significantly harder.
Smaller, as easy and bite-sized as you can, cards are a lot easier to learn which compounds nicely: a single card will be a lot harder to learn than five cards covering each a fifth of the topic[^break].
*Break down your subject as much as you can!*[^caveat]

As you break down a topic, you will end up with a lot of easy cards and, naturally, immediately add all of them to the system.
That can quickly overwhelm you (when the daily review gives you 30 things to review, it starts feeling like a very real effort).
The solution for that is to take your time (after all, time is your friend here) and *add one or two cards a day, no more.*[^many]

Finally, spaced repetition is there to help you remember things *forever*.
I would thus recommend *being picky with what you apply it to*. Many things are not worth remembering forever and would only clutter your system.
Focus on things you have always wanted to know and learn, things you know and don't want to forget, or things you know for a fact you will need to know in the future.

[^many]: The number of card you can comfortably add in a day *obviously* depends a lot on how long and correlated your cards are. Adding five tiny cards all tackling the same concept would be fine, but I would not add two medium-sized cards covering different topics.

[^break]: Furthermore, tackling a topic from different complementary angles [has been shown](https://universeofmemory.com/spaced-repetition-apps-dont-work/) to improve recall significantly.

[^caveat]: One caveat is that breaking down knowledge too much can lead us to lose track of the structure underlying it. In this case, or if you will have to gather this knowledge (you might be remembering parts of a speech, but you will have to present the full speech), I would recommend breaking down the knowledge *and* having big all-encompassing cards that give you occasions for larger reviews of a topic.

## Further Reading

Resources on the topic abound. If you want to give it a try, I would recommend giving the following a go:

* Nicky Case has a [fantastic educational game introducing spaced repetition](https://ncase.me/remember/), it is a great way to understand what it is, how it works, and if it might be a fit for you.
* As usual, Gwern has a [very good in depth article](https://gwern.net/spaced-repetition) on the topic and the science behind it.
* Fernando Borretti has a [great article](https://borretti.me/article/effective-spaced-repetition) on how to use the method effectively, giving you further tips on card writing.