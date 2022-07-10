---
title: "A path to make significant contributions to research"
draft: true
comments: false
date: 2022-07-04
images:
---

**TODO: pick intro**

It is my experience that most good ideas *never get to the end of the publication process*.

Some ideas are very hard to prove to a point that would convince a reviewing comitee[^comitee], 
some researchers do not have the skills or energy to write a scientific paper that would be read by their peers
and, some ideas are published but never rise to mainstream knowledge.

All work toward reducing those barriers will increase the number of good ideas reaching us and have a multiplicative effect on the quality of research.

[^comitee]: That has their own bias due to being researchers in the field themselves.

----

I believe that one of the biggest contributions we can make to research is to *make research easier to publish*.
Going from [having an idea](/writing/guides/ideas) to checking its correctness to making others aware of our work is a difficult process.
Thus, a lot of good ideas never get known, slowing down research.

In the following, I describe a *practical* plan that, if you can apply it to your field[^1], should have a significant impact: *introducing standardized tests and centralizing the results*.

I first explain the steps you have to go through to publish your research before detailing how my proposed solution would lower the bar to making good ideas known.
I expect research to move significantly faster in your field of choice if you can put it into application.

[^1]: Keep in mind that, while I try to be as general as possible, [my experience](/about/research) is mostly limited to the fields of numerical accuracy, artificial intelligence, and high-performance computing. All have to do with computer science, this might be much harder to apply to something like biology (which is not to say that it would be inapplicable).

## The Steps to getting an idea out

Once you have an idea[^2], there are several steps to go through before the world hears about it:

[^2]: For the sake of this argument, we will assume that your idea is novel and most likely worth sharing.

#### Checking your idea

The first thing to do is to be able to check that your idea is correct and useful.

This is important to convince yourself that your idea is worth pursuing but also because *these results will be used as part of your publication and to get your idea to other people*.
Thus, you need a way to validate your idea that is *accepted by your community* and *lets you compare your idea to the state-of-the-art*.

If your field does not have an agreed-upon way to check a result and compare it to others, you will have to come up with a best guess as to what would be considered enough proof, be able to build that test, and convince others that it is a good test.

#### Writing your idea

Once you have an idea and a way to prove to the world that it is a good idea, you need to write it.

Assuming you already have universally agreed upon proofs that your idea is good, it is still a lot of work: it is very unlikely that having good ideas in your field is correlated with being a good technical writer (able to explain those ideas in text and structure them properly) and you need to know and follow the conventions of your field of choice[^3].

This is a skill that [can be acquired](/writing/guides/writing) but, even once it is acquired, writing a paper is still a lot of work, akin to writing and polishing a short story.

[^3]: If you have no academic background, this might be a lot of effort and you are likely to either publish a blog post or publish a paper that ignores the codes of your field and might thus be discarded based solely on its form.

#### Publishing your idea

Once your idea is intelligible, you need to publish it which requires three steps[^steps]:

* You need to submit your idea to a platform that will make it available to researchers in your field. Usually, this would be a scientific journal (or the great [Arxiv](https://arxiv.org/)).
* You need to market your idea, most scientific journals and other publishing platforms will do little effort to make your idea known to the world, it is your responsibility to make your publication known to the scientific community and ensure that they are aware of its quality.
* Your idea needs to be reusable, you might have fully solved a problem but if [no one can implement your solution then no one will use it](https://mathoverflow.net/questions/374089/does-there-exist-a-complete-implementation-of-the-risch-algorithm).

[^steps]: Most people do not talk about steps two and three. They make it seem as if one just needs a journal to accept their paper.

## Standardized tests and centralized results

#### Historical precedents

A lot of machine learning relies on [standardized datasets](https://paperswithcode.com/datasets) to prove the quality of their result and compare methods (it is, in essence, an ever-going competition between algorithms).
This strikes me as something that might be generalized to other fields.

Looking into it, I discovered several other fields that use standardized tests or a centralized competition to gauge ideas.
They are all characterized by fast progress (as can be quantified by the previously-mentioned standardized tests) that is sometimes said to have started when the tests were introduced:

* Image classification with common benchmarks such as [MNIST](https://paperswithcode.com/dataset/mnist) and [ImageNet](https://paperswithcode.com/dataset/imagenet) (having common, well-accepted benchmarks has now diffused to most of the machine learning community),
* Pseudo random number generation [TestU01](https://en.wikipedia.org/wiki/TestU01) (and [others such as SmallCrunch and BigCrunch](https://www.pcg-random.org/statistical-tests.html)),
* SAT solvers with a [yearly competition](http://www.satcompetition.org/),
* Approximate nearest neighbor search with [ANN Benchmarks](http://ann-benchmarks.com/).

I then started to wonder about the general rules that make a good standardized test.

#### Good standardized tests

I believe that good standardized tests should have the following qualities:

* Anyone can use them (low barrier of entry),
* they produce results that are easy to quantify and share (this is important to... share the results),
* everyone agrees on their quality (they are enough to convince a researcher of the quality of your results),
* they can be improved upon (the tests *will* be imperfect, any metric will be gamed, but it is better to have a flawed test to be improved upon rather than no test).

**TODO:describe property of the centralized platform needed**

My thesis is that introducing standardized tests can help **solve most problems of the publication process**.

#### Usefulness

One might wonder how introducing standardized tests might solve our hurdles to getting ideas out there?

By definition standardized tests check your idea in a way that is acceptable and convincing to your community.

Having good test results in a format easily readable to the rest of your community will make it an easy for a researcher to evaluate your idea.
They can now decide objectively on whether your paper is worth reading in details.

Standardized test results can be published (with their accompagnying paper) on a *centralized* platform[^6] making it easy to raise good ideas to common awareness without resorting to advertisement or a reviewing comitee: good ideas would speak by themselves.

The two things this does not do is make it easier to understand and reproduce good ideas[^7].

[^6]: Unsurprisingly, given that they already have commonly agreed upon standardized tests, there is [some work](https://paperswithcode.com/sota/image-classification-on-imagenet) toward that goal in some subfields of deep-learning.

[^7]: Both are linked, an idea perfectly understood should be easy to reproduce and making it trivial to reproduce an idea should make it much easier to understand it.
I suspect that this might be solved by building common building blocks that researchers can use to formulate their ideas (mathematics are often those common building blocks bu they tend to be too general for ease of understanding).
However, new ideas are bound to break the conventions and find new approach that defy the current building blocks, making this approach inherently limited.

#### Practicality

It is very hard to contribute significantly to a field of research, any field of research.
But, I believe that for most fields (I do not believe that this is a general solution), introducing standardized tests is one of the easiest ways to push research forward.

To do so you need to:

* Design a standardized test that respects the [above conditions](/writing/essays/research/#standardized-tests),
* set-up a centralized place to gather results on this standardized test,
* apply this test to a maximum of exciting ideas in your field,
* contact researchers in your field to let them know of your test and invite them to improve on it (they *will* have remarks, especially if their idea do not come out on top).

It is not glamourous work and might not even get you noticed but it is fairly easy to do[^8] (you will find an example of how I would apply this technique to improve the field of deep learning optimizers [here](writing/essays/hidden/research_example)) and has proven effective in the few fields that already do it: it is most likely one of the lowest hanging fruits if you care about improving the state of the art in your field of research.

I believe that this is in the power of most researchers.
However, if you are part of a larger organization (such as a famous research team, laboratory or a very large and well known company), things are even *easier*.
Bigger players have more leverage: you most likely have access to both the talent needed to design the test and to a lot of visibility to help you make it known to the wider community.
If you are part of such a team, *use those ressources and make your field a better place!*

[^8]: This is simple hard work. Much easier than having a ground-breaking idea that breaks the status quo. 

## Conclusion

