---
title: "Nestor's Guide to Giving a Presentation"
draft: false
comments: false
date: 2024-03-18
images: 
---

*"Only the prepared speaker deserves to be confident."*
— Dale Carnegie

In my early engineering school days, I was lucky to intern with a team of biologists who were *really* good at presenting their ideas (be it for conferences or internal meetings).
This taught me a lot of things and set what I believe are good practices.

Here are some of the key things I try to have in mind when I give a presentation[^me].
Some of these points will seem obvious to some readers, not to others, so I will try not to assume any knowledge from the reader.

[^me]: Note that the vast majority of the presentations I give are technical presentations with slides. However, a lot of the following applies to other types of presentation (such as blackboard presentations where one writes in real-time, and ted-talkish types of things that edge closer to one-person shows).

## The Slides

### The Software

First things first, what should you write your slides in? Most software is fine.

Math and Computer Science people tend to default to [LaTeX with packages like Beamer](https://www.overleaf.com/learn/latex/Beamer).
It is great if you need to display a lot of equations[^equation] and algorithms.
But, I have yet to see good-looking Beamer slides[^looking].

I have a soft spot for [Google Slides](https://docs.google.com/presentation/create) because it is easy to use, makes it trivial to share the slides with others (in particular teammates and event organizers), and is easily saved in a Google Drive folder (meaning that it will survive laptop replacements and other events).

Overall, *any software you are comfortable with* is likely to be fine.

[^equation]: At the moment, equations are definitely a pain to display in Google Slides. There are [plugins](https://webapps.stackexchange.com/a/172062) to help with it, but the situation is not ideal.

[^looking]: One could argue that *content* is what matters, but I have found that appearances *do* impact the way your work will be perceived, so you might as well cover your bases.

### The Structure

My slides often follow a set structure with known beats. Whether you want to emulate it or do your own thing, I would recommend getting familiar with its logic.

The title slide bears the name of the presentation, the name of the event, and the names of the people who contributed to the work (here, and the next slide, are the perfect places to credit them and let them know that, while you are the one presenting the work, you recognize their help).

My second slide is a "Who am I?" slide.
This slide does not have to be long; it is there to let the audience hear my name, current activities/position, and the credentials that make me an expert on the topic I will be presenting on.

The next slide is all about "Why do the work?".
It is there to convey the importance and purpose of your work: why bother and who would be impacted?

You can then, optionally, give the plan of your presentation. This is only needed for long, multi-part, and sometimes multi-topic, presentations.

Then comes the parts that make up the presentation, often starting with fundamentals or a state of the art.
I like to introduce each section with a question (these slides carry a single question, written in a very large font; they are a good way to wake people up...) letting the audience know why the upcoming part of the presentation matters, and what problem it tackles.

The slides usually conclude with a... conclusion section.
This is split into an overview, summarizing the work and its salient/memorable aspects, followed by perspective, which covers upcoming work and limitations of the current work (this slide is a great way to recognize and assume current weaknesses of your work).

I always end my slides on a "Thank You!" slide that contains my contact information.
The "Thank You!" part is there to both clearly let the audience know that the presentation is finished and give me an excuse to put my contact information (usually an email) on the slides (useful if they are later distributed, plus it reminds the audience of my name).

Practice, especially presenting on the same topic in front of different crowds, will quickly teach you that some questions keep coming.
Those can, and often should, be introduced into the slides.
However, if you believe that they are out of scope or would make the presentation too long, you can also prepare additional slides that you hide after your "Thank You!" slide.
Being able to bring new slides and plots as an answer to an audience question is always a very nice touch.

### The Text

First and foremost, *the text on the slides should be as short as you can make it* (which will often take several editing passes to get clear, concise formulations).
A block of text is a sure sign that you need to cut things out: people will either not bother reading it and doze off, or try to read it and stop listening to you, neither of which is a good outcome.
This might require breaking down slides that try to convey too many things[^convey].

One caveat would be information that matters to you. If you want your audience to hear a piece of information, especially if you are afraid to forget about it during the talk, *it should be written on the slides*.

Finally, you will want to talk *below* your audience's level.
You have expert knowledge and take a lot of things for granted. Aiming for a presentation that could be understood by people who are not as familiar with the topic as your audience lets you correct for this and produce a clear presentation.

[^convey]: Overall, you want to focus your presentation on what you consider key, important aspects. Given the choice, it is often best to focus on one thing rather than try to convey too many ideas and have the audience remember none of them.

### The Form

*Slides should be very readable*.
The most obvious aspect of this is that all text on a slide should be either big enough to be read or removed (you do not want people squinting to read while you are talking).
Bullet lists[^bullet] (a great, very clear way to convey... lists of items or properties) and bold (emphasizing keywords for further clarity) are your friends.

Tables and lists of numbers are a sure way to lose your audience[^equations] if they are not clear. Keeping them short and using bold helps.
Plots, when they are an option, are often a better way to go.

Speaking of plots, they are great and highly recommended when well executed.
But, you will want to ensure that the plot is legible (is the text readable? What are the axes of the plot? Are the colors visible once projected onto a screen?), and conveys your idea clearly (some plots look nice but are useless or misleading[^pie]).

Once your slides are readable, which sounds like the bare minimum but is a surprisingly high bar, you should care about *uniformity*.
Using similar item placement and font sizes throughout the slides.
A change of format draws attention and keeps your audience attentive: this is good but must be controlled and conscious. You cannot draw attention to a key result written in a large font if your font size is basically random in other slides.
Uniformity means that you can use different slide formats to move and renew the audience's focus.

Finally, have page numbers on your slides; those will be useful to reference specific slides during the questions part of the presentation.

[^bullet]: When listing pros and cons, a nice touch is to use green/orange/red bullets to convey this aspect graphically.

[^equations]: Equations are another. While they might be vital to the work (and conveying its legitimacy, which is often the role equations play in presentations), they should be kept to a minimum of key results.

[^pie]: Pie charts are famously bad at giving people an intuition of proportions (giving people an inflated view of rare phenomena).

## Presenting

### Rehearsing

It should be obvious, but *you need to rehearse your slides before the presentation*.

The rehearsing should be done out loud (this will let you talk at your actual speaking rhythm and anchor some breathing times into the presentation) and in conditions as close to the final presentation as possible (you do not want to rehearse using one piece of software, switch it out on the day of the presentation, and then find out that something is broken).

It is usually a great time to realize that the structure of your slides is not working and tweak things.
Furthermore, it should quickly give you a very clear idea of how long your presentation will take (the first few rehearsals are usually a bit longer due to hesitations) and let you adjust for the talk's requirements.
As a rule, you *never* want to go over time[^over].

I personally rehearse between 3 (bare minimum) and 8 (really important presentation) times before giving a talk.
If you planned things properly, then you will likely be able to just do one rehearsal a day until the presentation's day[^phd].

For an important presentation, you will want to have other people from your field attend rehearsals or, at least, go over your slides and give you feedback. They will often be able to point out weaknesses in your talk that you had become blind to.

[^over]: It denotes a lack of professionalism (which would not be good in some circles), makes the organizer's life harder, and traps the audience (who might have other priorities). None of whom you want to turn your back on. Going over time due to a large amount of audience questions would be fine as cutting those is the master of ceremony's role.

[^phd]: I rehearsed my slides 15 times for my PhD defense. Once a day starting on the day I wrote the finalized version of the slides. This is *too much*, but it definitely helps: by that point, you know that stress and sickness will not matter, as soon as you start saying your introduction, you are on solid tracks that will lead you all the way to the conclusion of the presentation.

### Before the Presentation

If you are not presenting remotely, always have a PDF[^pdf] copy of your slides on a USB stick with you and, if possible, send a copy of your slides to the organizer in advance.
That way, you will be covered if anything fails on your side.

Also, have a bottle of water on hand.
This will let you hydrate during long presentations and between presenting and answering any questions.

[^pdf]: PDFs are a very *portable* format. You know that it will run without problems independently of the organizer's technology of choice.

### The Presentation

Please *do not read your slides* (the text on the slides should be too concise to be read out loud anyway); this will draw all energy out of your presentation.

Similarly, if possible, try to present standing; this will give you further dynamism.
If you have to be seated, I would recommend sitting on the edge of your seat (an old theater trick to make a seated actor look regal and in control rather than sloppy and lazy).

If you can, and this is made easier by a mastery of your slides born out of rehearsing, try to look at your audience (covering various parts of the audience) as you talk.
A shortcut here is to talk at the back wall; this will also ensure that your voice can be heard by all if you are talking without any sound amplification/mike.

### Live Demonstrations

Well done, live demonstrations can be very impressive.
They can also (famously) fail on you and waste a lot of presentation time.

If you want to do a live demonstration, and think that it could bring value to your talk[^value], I would recommend doing something very reliable (a one in five failure rate will bite you back on demonstration day), making sure that the demonstration is as frozen and isolated as you can (you do not want something to update before or during the presentation), require as little thinking as possible (that can be worked around with automation, but if you automate all the things, you might as well be showing a recording[^record]), and rehearse it extensively (as you should).

[^value]: A lot of live presentations have no reason to be and would be best presented as one or two slides.

[^record]: Recordings are a very valid and reliable alternative to live demonstrations. You lose interactivity and some impressiveness but are able to ensure that things will go smoothly (obviously, always rehearse the presentation of your recording in conditions; you do not want that to be failing for technical reasons).

### After the Presentation

If at all possible, it is always nice to leave the audience (via the organizer) with a copy of your slides (as a bonus, you are leaving them with your contact information).

People are polite and will likely say good things about your presentation.
I found that a good way to gauge interest is to see how many questions you receive during and after the talk.

## Voilà

And voilà! This might seem like a lot, but it boils down to keeping your slides clear, organized and concise, then rehearsing them until you are confident in your delivery. Now go forth and present; practice makes perfect, and in a couple of talks, you will be fantastic[^mine]!

[^mine]: The curious reader will find slides and recordings of some of my presentations (of *very* varied quality) [here](/about/research/#talks).
