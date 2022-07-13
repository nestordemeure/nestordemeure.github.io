---
title: "Introducing standardized tests to the field of deep-learning optimizers"
draft: true
comments: false
date: 2022-07-04
unlisted: true
images:
---

One of my fields of interest is deep-learning optimizers.
Here is a step-by-step plan to introduce standardized tests to this particular field of research[^1].

[^1]: I have not done it myself (yet) because I lack the time to do so and believe that a big player (such as Facebook or Google) would be in a better position to maximize the impact of introducing this test to the field.
I guess step one of my plan is to get into the research team of a large enough lab...

## Deep-learning optimizers

how one can divide the field of deep-learning

what are optimizers

note that, contrary to applications, they lack standardized test

## Suggested tests

benchmarks
* anyone can use them (low barrier of entry),
* they produce results that are easy to quantify and share (csv and standardized plot that can be plugged into paper, we also use centralization to produce comparison to other algorithms),
* everyone agrees on their quality (they are enough to convince a researcher of the quality of your results[^5]),
* they can be improved upon[^improve] (the tests *will* be imperfect, any metric will be gamed, but it is better to have a flawed test that we improve upon rather than no test).

optimizers
people send their implementation that needs to follow a format (pytorch optimizer, ptax, etc)
thus we can easily distribute implementation
we can even easily put them together in a library, having people clean-up the bests ones and making them available to the community at large

plateform

## Going further

a big entity (facebook, google, etc) would help a lot with marketing

they would also be able to run the tests themselves for people
you could then have a small test and, at any point in time, the bests on that small test get some free compute to run the bigger one
that way even someone with low compute can be entered

finally, they could work with the best entries to clean-up their code nd make it useable
