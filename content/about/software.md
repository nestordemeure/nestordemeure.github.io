---
title: "Software I wrote"
draft: false
comments: false
images:
---

I am an engineer with a specialty in applied mathematics and computer science.

You can find most of the software I developed on [Github](https://github.com/nestordemeure) and [Gitlab](https://gitlab.com/nestordemeure).
Here is a list of some noticeable libraries (focussing on projects where I am the main developer) in no particular order:

#### [Shaman](https://gitlab.com/numerical_shaman/shaman) (C++)

Shaman is the crown jewel of my Ph.D., it helps you track and measure the numerical error in computations by replacing the types (`double` becomes `Sdouble`) with instrumented version.

I am, understandably, *very* proud of it.
It was developed to be accurate (otherwise there is no point) but also fast enough to be applied to large simulations running in parallel on a supercomputer.

There is also a [Julia version](https://gitlab.com/numerical_shaman/shaman_julia) available.

#### [Friedrich](https://github.com/nestordemeure/friedrich) (Rust)

Friedrich is an implementation of Gaussian process in Rust (to the best of my knowledge it is the best implementation currently available on crates.io).

I believe that it is my fifth or sixth implementation of Gaussian process (some of them [published](https://github.com/nestordemeure/tabularGP)) and, while still very imperfect, I think I succeeded at making it very practical: anyone who had to fight with failed Cholesky decompositions will be happy to discover that we provide a solution that does not destroy your uncertainty bounds... also, we make it very easy to sample from the distribution (which is useful but not that often featured in other implementations).

#### [Pandas2Numpy](https://github.com/nestordemeure/pandas2numpy) (Python)

Pandas2Numpy helps you convert Pandas data frames into Numpy tensors to feed them to your deep learning framework of choice.

This one is easily overlooked but I would highly recommend using it if you need to run some deep learning on tabular data.
It *will* cut on a lot of unexpected debugging time while being simple to use and plug into any existing framework.

It deals with continuous as well as categorical data and integrates common transformations such as normalization.

#### [ParetoFront](https://github.com/nestordemeure/paretoFront) (Rust)

ParetoFront is a Rust library to build a [Pareto front](https://en.wikipedia.org/wiki/Pareto_front) incrementally.

This is particularly useful in multi-objectives optimization where, instead of having a single maximum that one can easily keep track of, one might want to keep track of various trade-offs, none of which is best on all axis, found during the optimization.

This crate tries to be small yet *really* fast, compatible with parallelism, and correct.

#### [Flax Optimizers](https://github.com/nestordemeure/flaxOptimizers) (Python)

Flax Optimizers is a collection of optimizers for the [Flax deep learning framework](https://github.com/google/flax).

Nowadays, it has been supplanted by [Deepmind's optax](https://github.com/deepmind/optax) but it reflects a lot of work I did to test various optimizers while collaborating on [Ranger21](https://github.com/lessw2020/Ranger21) and I believe it contains some of the most readable implementations of the optimizers it includes.

#### [Simplers](https://github.com/nestordemeure/Simplers) (Rust)

Simplers is a Rust implementation of the, very elegant, [Simple(x) black-box global optimization algorithm](https://github.com/chrisstroemel/Simple).

The algorithm (which should not be confused with the [simplex algorithm](https://en.wikipedia.org/wiki/Simplex_algorithm)) is closest to [Bayesian optimization](https://en.wikipedia.org/wiki/Bayesian_optimization).
Its strengths, compared to Bayesian optimization, are the ability to deal with a large number of samples and high dimension efficiently.

#### [Kronmult993](https://github.com/project-asgard/kronmult993) (C++)

Kronmult993 implements a batch version of a chained Kronecker product using [Algorithm 993](https://dl.acm.org/doi/abs/10.1145/3291041).

The library includes efficient parallel implementations, for both CPU (using OpenMP) and GPU (using CUDA), that have been tuned for the needs of [ASGarD](https://github.com/project-asgard/asgard).
