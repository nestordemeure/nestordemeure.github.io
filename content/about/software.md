---
title: "Software I wrote"
draft: false
comments: false
images:
---

I am an engineer with a specialty in applied mathematics and computer science.

You can find most of the software I developed on [Github](https://github.com/nestordemeure) and [Gitlab](https://gitlab.com/nestordemeure). Here is a list of some noticeable libraries (focusing on projects where I am the lead developer):

#### [Divinatory GPTs](https://github.com/nestordemeure/DivinatoryGPTs) (Prompt)

This is a collection of scripts and prompts I used to make [custom GPTs](https://openai.com/blog/introducing-gpts) around the theme of divination (and, in particular, tools to help people become better tarot readers).

The point of this repository is to explore the usefulness and limits of custom GPTs, testing what can and cannot be done with them.

#### [Xmap](https://github.com/nestordemeure/xmap/tree/main) (Python)

An alternative [xmap](https://jax.readthedocs.io/en/latest/_autosummary/jax.experimental.maps.xmap.html) implementation for [Jax](https://github.com/google/jax).

This implementation solves my gripes with the official implementation: it provides a slightly improved interface, focuses on vectorizing a function along one or more axes (it implements none of the other functionalities supported by the official implementation), jits down to several calls to `vmap` (making it resilient to updates on Jax's side), and provides jit-time checks to try and catch common errors (such as forgetting an argument or passing something of the wrong shape/type) with nice error messages.

#### [letMeNERSCthatForYou](https://github.com/nestordemeure/letMeNERSCthatForYou) (Python)

This is the current *official* implementation of the NERSC Documentation Chatbot.

The chatbot was built to be able to answer user questions with NERSC-specific *sourced* answers using open models running fully *locally* on NERSC's premises.
We built interfaces around the models and tools we used (instead of using a framework like langchain) to be able to switch models easily as the technology progresses while having the control needed to ensure that our answers are good enough to be presented to NERSC users.

#### [Question Extractor](https://github.com/nestordemeure/question_extractor) (Python)

Question Extractor lets you use ChatGPT's API to extract question/answer pairs automatically from existing textual data, in order to fine-tune your own language model.

At the time of its creation, this script was able to process the full NERSC documentation in 6 minutes (running at about 93% of the model's rate limit), turning 318 markdown files into 8005 questions for $29.

#### [GPTranslate](https://github.com/nestordemeure/GPTranslate) (Python)

GPTranslate is a universal translator based on the [GPT family of large language models](https://openai.com/product). Give it a book in `epub` format and it will translate it into any language.

This application has two modes, one running in parallel and optimized for speed, and one focusing on human-AI interaction to produce the best translation possible.

#### [Impersonator](https://github.com/nestordemeure/impersonator) (Python)

Impersonator lets you create a chatbot that has the style and knowledge of any author, blogger, or person as easily as copy-pasting texts they have written into a folder.

Built on top of a large language model, it uses the provided sources to extract both stylistic and biographical information on a person, letting you simulate them as a chatbot.

The application focuses on ease of use, adding a new author is only a matter of creating a folder and putting texts (a variety of formats are supported) in it.

#### [StochasTorch](https://github.com/nestordemeure/stochastorch) / [Jochastic](https://github.com/nestordemeure/jochastic) (Python)

StochasTorch and Jochastic are Pytorch/JAX software-based implementations of [stochastic rounding](https://nhigham.com/2020/07/07/what-is-stochastic-rounding/) addition.

When encoding the weights of a neural network in low precision (such as `bfloat16`), one runs into stagnation problems: updates end up being too small relative to the precision of the encoding. This leads to weights becoming stuck and the model's accuracy significantly reduced.

Stochastic rounding lets you perform the addition in such a way that the weights have a non-zero probability of being modified anyway. This avoids the stagnation problem, averaging to accurate summation, without increasing memory usage (as might happen if one were using a [compensated summation](https://en.wikipedia.org/wiki/Kahan_summation_algorithm) to solve the problem).

#### [Ranger21](https://github.com/lessw2020/Ranger21) (Python)

Ranger21 is a deep-learning optimizer.

It was born from implementing a large number of publications and realizing that a lot of those ideas were orthogonal and synergetic: you would get better results putting them together. The result is an optimizer that is surprisingly robust and, looking further, the idea that we should build modular optimizers to foster research in that direction.

I co-wrote it with [Less Wright](https://github.com/lessw2020) as an update to his [Ranger optimizer](https://github.com/lessw2020/Ranger-Deep-Learning-Optimizer).

#### [ParetoFront](https://github.com/nestordemeure/paretoFront) (Rust)

ParetoFront is a Rust library to build a [Pareto front](https://en.wikipedia.org/wiki/Pareto_front) incrementally.

This is particularly useful in multi-objective optimization where, instead of having a single maximum that one can easily keep track of, one might want to keep track of various trade-offs, none of which is best on all axes, found during the optimization.

This crate tries to be small yet *really* fast, compatible with parallelism, and correct.

#### [Kronmult993](https://github.com/project-asgard/kronmult993) (C++)

Kronmult993 implements a batch version of a chained Kronecker product using [Algorithm 993](https://dl.acm.org/doi/abs/10.1145/3291041).

The library includes efficient parallel implementations, for both CPU (using OpenMP) and GPU (using CUDA), that have been tuned for the needs of [ASGarD](https://github.com/project-asgard/asgard).

#### [Flax Optimizers](https://github.com/nestordemeure/flaxOptimizers) (Python)

Flax Optimizers is a collection of optimizers for the [Flax deep learning framework](https://github.com/google/flax).

Nowadays, it has been supplanted by [Deepmind's Optax](https://github.com/deepmind/optax) but it reflects a lot of work I did to test various optimizers while collaborating on [Ranger21](https://github.com/lessw2020/Ranger21) and I believe it contains some of the most readable implementations of the optimizers it includes.

#### [Pandas2Numpy](https://github.com/nestordemeure/pandas2numpy) (Python)

Pandas2Numpy helps you convert Pandas data frames into Numpy tensors to feed them to your deep learning framework of choice.

This one is easily overlooked but I would highly recommend using it if you need to run some deep learning on tabular data. It *will* cut on a lot of unexpected debugging time while being simple to use and plug into any existing framework.

It deals with continuous as well as categorical data and integrates common transformations such as normalization.

#### [Friedrich](https://github.com/nestordemeure/friedrich) (Rust)

Friedrich is an implementation of Gaussian process in Rust (to the best of my knowledge, it is the leading implementation currently available on [crates.io](https://crates.io/crates/friedrich)).

I believe that it is my fifth or sixth implementation of Gaussian process (some of them [published](https://github.com/nestordemeure/tabularGP)) and, while still very imperfect, I think I succeeded at making it very practical: anyone who had to fight with failed Cholesky decompositions will be happy to discover that we provide a solution that does not destroy your uncertainty bounds... also, we make it very easy to sample from the distribution (which is useful but not that often featured in other implementations).

#### [Simplers](https://github.com/nestordemeure/Simplers) (Rust)

Simplers is a Rust implementation of the very elegant [Simple(x) black-box global optimization algorithm](https://github.com/chrisstroemel/Simple).

The algorithm (which should not be confused with the [simplex algorithm](https://en.wikipedia.org/wiki/Simplex_algorithm)) is closest to [Bayesian optimization](https://en.wikipedia.org/wiki/Bayesian_optimization). Its strengths, compared to Bayesian optimization, are the ability to deal with a large number of samples and high dimensions efficiently.

#### [Shaman](https://gitlab.com/numerical_shaman/shaman) (C++)

Shaman is the crown jewel of my Ph.D., it helps you track and measure the numerical error in computations by replacing the types (`double` becomes `Sdouble`) with instrumented versions.

I am, understandably, *very* proud of it. It was developed to be accurate (otherwise there is no point) but also fast enough to be applied to large simulations running in parallel on a supercomputer.

There is also a [Julia version](https://gitlab.com/numerical_shaman/shaman_julia) available.
