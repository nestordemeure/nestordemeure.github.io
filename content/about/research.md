---
title: "Research I did"
draft: false
comments: false
images:
---

I am a researcher with specialties in numerical accuracy, artificial intelligence, data analysis and high performance computing.

## Papers

You can find most of my publications on [Researchgate](https://www.researchgate.net/profile/Nestor-Demeure).
Here is a list of them in no particular order:

#### [Ranger21: a synergistic deep learning optimizer](https://arxiv.org/abs/2106.13731) (machine learning)

The Ranger21 paper was born from testing a large number of optimizers for deep learning and realizing that, while people where branding them as new optimizers, they often just included one new idea to an existing optimizer.
We realized a lot of those ideas where orthogonal and synergetic: you would get better results putting them together than what would be expected by looking at them individually.

The result is an optimizer that is surprisingly robust and, looking further, the idea that we should build modular optimizers to foster research in that direction.

#### [Compromise between precision and performance in high performance computing.](https://www.researchgate.net/publication/348551075_Compromise_between_precision_and_performance_in_high_performance_computing) (numerical accuracy)

This covers all the work I did during my PhD (do not let the first pages fool you, it is written in English).

It covers the theory between Shaman including *encapsulated error* (a very efficient way to measure the numerical error of a computation) and *tagged error* (a very precise way to find the source of the numerical error that ends up in a result).

It also includes some work on applying artificial intelligence to pick the proper solver and preconditioner to solve a linear system (we obtained really promising results, a paper dedicated to the subject should come out at some point).

#### [Tagged error: tracing numerical error through computations](https://ieeexplore.ieee.org/document/9603395) (numerical accuracy)

This paper covers my work on *tagged error*, an extension of *encapsulated error* destined to follow numerical error through a computation.

While the method introduce an important overhead, it is the best method I am aware of to find the source of a numerical error in a computation.
I have even used it to improve an algorithm fixing problems one after the other until I reached the desired precision.

#### [Large-scale neuroanatomical study uncovers 198 gene associations in mouse brain morphogenesis](https://www.nature.com/articles/s41467-019-11431-2) (data analysis)

This paper concludes a large study, measuring 118 neuroanatomical parameters over 1,566 mutant mouses.
This lead to the identification of 198 genes that impact the brain formation.

I contributed some data analysis to the paper (admittedly a drop in a bucket, with 18 co-authors contributing much more important pieces of the puzzle).

## Talks

Here are some slides (or recordings when available) of talks I gave:

#### [Tagged error: Tracing numerical error through computations.](https://drive.google.com/file/d/1mt-QCBOqcdD36-6DwI4eE6GwHIoX_hGf/view?usp=sharing) (numerical accuracy)

This talk (given in 2021 for the *28th IEEE International Symposium on Computer Arithmetic.*) covers my work on *tagged error*, an extension of *encapsulated error* destined to follow numerical error through a computation.

It has since been published as a paper.

#### [Erreur Encapsulée: Une méthode directe pour estimer l’erreur due à l’arithmétique à virgule flottante](https://drive.google.com/file/d/1US7Toi0T45VulCMWRyxALYfezKznEjOJ/view?usp=sharing) (numerical accuracy)

This talk (given in 2021 for the *Rencontres Arithmétiques de l'Informatique Mathématique 2021*) covers my work on *encapsulated error*, a method designed to measure the numerical of a computation while being efficient enough to be applied to large parallel applications running on a supercomputer.

*This work has been submitted to a journal but is not published yet, you can find more information in my PhD.*

#### [AI augmented linear solvers: using machine learning to predict the convergence profile of a linear solver](https://youtu.be/kXwPJAPwLz0?list=PLr1vc4ZveozN3DCzlIxJd_oLG9MpLev1B) (machine learning)

This talk (given in 2020 for the *Digital French-German Summer School with Industry*) covers my work on using machine learning to predict the performance of linear solvers and preconditionners when solving a given linear system.

We showed that we could predict the convergence profile of the solver with enough accuracy to determine which solver should be used given some target precision and time constraints.

*This work has been submitted to a journal but is not published yet, you can find more information in my PhD.*

## Posters

#### [A Direct Method to Assess Floating-Point Accuracy](https://drive.google.com/file/d/1GNm7FKPzk9YUpYDiCeoIgLMvE9FJbPlP/view?usp=sharing) (numerical accuracy)

This poster (presented in 2021 at the *Platform for Advanced Scientific Computing (PASC)* Conference) covers my works on measuring numerical error and tracing it through a computation.

#### [Uncertainty Quantification and Numerical Accuracy](https://drive.google.com/file/d/1VrqqRQgU2RDPcv2JdEbuSsbQj7hWE-pM/view?usp=sharing) (numerical accuracy)

This poster (presented in 2020 at *MASCOT-NUM*) covers some of my work on measuring numerical error and its application to comparing various uncertainty quantification method and measuring their sensitivity to numerical error in their inputs.

This particular case study is further detailed in my PhD.
