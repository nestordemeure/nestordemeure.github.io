---
title: "Research I did"
draft: false
comments: false
images:
---

I am a researcher with specialties in numerical accuracy, artificial intelligence, data analysis, and high-performance computing.

## Papers

You can find most of my publications on [Researchgate](https://www.researchgate.net/profile/Nestor-Demeure):

#### [High-level GPU code: a case study examining JAX and OpenMP.](https://dl.acm.org/doi/10.1145/3624062.3624186) (high-performance computing)

This paper (published as part of the proceedings of *Supercomputing 2023*) contrasts and compares the use of both JAX and OpenMP target offload to port a large cosmology code to GPU.

It gives a practical look at porting a large pre-existing application to GPU, studying the performance of the resulting code but also usability and productivity.

#### [Porting a large cosmology code to GPU, a case study examining JAX and OpenMP.](https://cug.org/proceedings/cug2023_proceedings/at_a_glance.html) (high-performance computing)

This paper (published as part of the proceedings of the *Cray User Group 2023*) contrasts and compares the use of both JAX and OpenMP target offload to port a large cosmology code to GPU.

It gives a practical look at porting a large pre-existing application to GPU, studying the performance of the resulting code but also usability and productivity.

#### [Encapsulated error, a direct approach to evaluate floating-point accuracy](https://dl.acm.org/doi/10.1145/3549205) (numerical accuracy)

This paper covers my work on *encapsulated error*, a method designed to measure the numerical error of computations while being efficient enough to be applied to large parallel applications running on a supercomputer.

The method is interesting in that it is both relatively easy to implement as a library, accurate, and significantly faster than most alternatives.
Its main downside is the need to replace floating-point types used in an application with an instrumented alternative (which might not be practical when one has limited access to the source or when they are unwieldy to modify).

#### [Ranger21: a synergistic deep learning optimizer](https://arxiv.org/abs/2106.13731) (machine learning)

The Ranger21 paper was born from testing a large number of optimizers for deep learning and realizing that, while people were branding them as new optimizers, they often just included one new idea to an existing optimizer.
We realized a lot of those ideas were orthogonal and synergistic: you would get better results putting them together than what would be expected by looking at them individually.

The result is an optimizer that is surprisingly robust and, looking further, the idea that we should build modular optimizers to foster research in that direction.

#### [Tagged error: tracing numerical error through computations](https://ieeexplore.ieee.org/document/9603395) (numerical accuracy)

This paper covers my work on *tagged error*, an extension of *encapsulated error* designed to follow numerical error through a computation.

While the method introduces an important overhead, it is the best method I am aware of to find the source of a numerical error in computations.
I have even used it to improve the numerical stability of algorithms, fixing problems one after the other until I reached the desired precision.

#### [Compromise between precision and performance in high-performance computing.](https://www.researchgate.net/publication/348551075_Compromise_between_precision_and_performance_in_high_performance_computing) (numerical accuracy)

This covers all the work I did during my Ph.D. (do not let the first pages fool you, it is written in English).

It covers the theory behind Shaman including *encapsulated error* (a very efficient way to measure the numerical error of computations) and *tagged error* (a very precise way to find the source of the numerical error that ends up in a result).

It also includes some work on applying artificial intelligence to pick the proper solver and preconditioner to solve a linear system (we obtained really promising results, a paper dedicated to the subject should come out at some point).

#### [Large-scale neuroanatomical study uncovers 198 gene associations in mouse brain morphogenesis](https://www.nature.com/articles/s41467-019-11431-2) (data analysis)

This paper concludes a large study, measuring 118 neuroanatomical parameters over 1,566 mutant mice.
This leads to the identification of 198 genes that impact brain formation.

I contributed some data analysis to the paper (admittedly a drop in the bucket, with 18 co-authors contributing much more important pieces of the puzzle).

## Talks

Here are slides (or recordings when available) of talks I gave:

#### [Intelligence Artificielle : Opportunités, Risques et Défis](https://docs.google.com/presentation/d/1sB0Djb66kHxQ-18t6-8NgTFtR5HUKh8T6rvvdbwIVps/edit?usp=sharing) (machine learning)

This talk was given at the French *École Supérieure Arts Appliqués Textile* (School of Higher Studies in Applied Arts and Textiles), an art school specializing in design and textiles, in April 2024.
The goal was to provide an overview of how modern generative AI works, what it can and cannot currently do, current legislation, as well as societal impacts of these techniques. With an emphasis on what we know, don't know, and cannot yet know as techniques are rapidly evolving.

An audio recording of the talk and subsequent discussion can be found on [RADAR](https://audioblog.arteradio.com/blog/201201/podcast/226908/intelligence-artificielle-conference-interactive), the school's radio station.

#### [High-level GPU code: A case study examining JAX and OpenMP.](https://docs.google.com/presentation/d/1JQwaMre9_-iiwPqslPXS7CW-SvQxv5XPgdWBd12L0io/edit?usp=sharing) (high-performance computing)

This talk was given at *P3HPC* (Performance, Portability & Productivity in HPC, a workshop given as part of *Supercomputing 2023*) and the *Summit Series XIII* (an NVIDIA and US national labs joined conference).
It contrasts and compares the use of both JAX and OpenMP target offload to port a large cosmology code to GPU, looking at the performance of the resulting code but also usability and productivity.

A paper is also available in the [proceedings of the conference](https://dl.acm.org/doi/10.1145/3624062.3624186).

#### [Porting a large cosmology code to GPU, a case study examining JAX and OpenMP.](https://docs.google.com/presentation/d/1eVrpDsUJYp2ZqG05TYHSpAfvJ0AJRZPzS0_lND2ivk8/edit?usp=sharing) (high-performance computing)

This talk, given at the *Cray User Group 2023*, contrasts and compares the use of both JAX and OpenMP target offload to port a large cosmology code to GPU, looking at the performance of the resulting code but also usability and productivity.

A paper is also available in the [proceedings of the conference](https://cug.org/digital-library/).

#### [Workshop: Introduction to porting Python to GPU with JAX.](https://youtu.be/YhXUymsQ_3g?list=PL20S5EeApOStvfX3byEoJe-Z93D64xaLE) (high-performance computing)

This workshop (given in 2022 for the *Commonwealth Computational Summit 2022* and later at the *Data Day 2022* and *NUG Meeting 2022*) is an introduction to porting Python code, and in particular numerical and scientific applications, to GPU with [JAX](https://github.com/google/jax).

It comes with [exercises](https://drive.google.com/drive/folders/12SO8IwMv2CP6vRmtgWwJ9Xekw8a2B-aT?usp=sharing) and is designed such that, by the end of the workshop, someone starting with knowledge of Python and Numpy should be able to port their code to GPU using JAX *and* decide on whether it is the best way forward.

#### [Tagged error: Tracing numerical error through computations.](https://drive.google.com/file/d/1mt-QCBOqcdD36-6DwI4eE6GwHIoX_hGf/view?usp=sharing) (numerical accuracy)

This talk (given in 2021 for the *28th IEEE International Symposium on Computer Arithmetic.*) covers my work on *tagged error*, an extension of *encapsulated error* designed to follow numerical error through a computation.

It has since been published as a [paper](https://ieeexplore.ieee.org/document/9603395).

#### [Erreur Encapsulée: Une méthode directe pour estimer l’erreur due à l’arithmétique à virgule flottante](https://drive.google.com/file/d/1US7Toi0T45VulCMWRyxALYfezKznEjOJ/view?usp=sharing) (numerical accuracy)

This talk (given in 2021 for the *Rencontres Arithmétiques de l'Informatique Mathématique 2021*) covers my work on *encapsulated error*, a method designed to measure the numerical error of computations while being efficient enough to be applied to large parallel applications running on a supercomputer.

It has since been published as a [paper](https://ieeexplore.ieee.org/document/9603395).

#### [AI-augmented linear solvers: using machine learning to predict the convergence profile of a linear solver](https://youtu.be/kXwPJAPwLz0?list=PLr1vc4ZveozN3DCzlIxJd_oLG9MpLev1B) (machine learning)

This talk (given in 2020 for the *Digital French-German Summer School with Industry*) covers my work on using machine learning to predict the performance of linear solvers and preconditioners when solving a given linear system.

We showed that we could predict the convergence profile of the solver with enough accuracy to determine which solver should be used given some target precision and time constraints.

You can find further information [in my Ph.D.](https://www.researchgate.net/publication/348551075_Compromise_between_precision_and_performance_in_high_performance_computing)

## Posters

Here are posters I presented:

#### [A Direct Method to Assess Floating-Point Accuracy](https://drive.google.com/file/d/1GNm7FKPzk9YUpYDiCeoIgLMvE9FJbPlP/view?usp=sharing) (numerical accuracy)

This poster (presented in 2021 at the *Platform for Advanced Scientific Computing (PASC)* Conference) covers my work on measuring numerical error and tracing it through computations.

#### [Uncertainty Quantification and Numerical Accuracy](https://drive.google.com/file/d/1VrqqRQgU2RDPcv2JdEbuSsbQj7hWE-pM/view?usp=sharing) (numerical accuracy)

This poster (presented in 2020 at *MASCOT-NUM*) covers some of my work on measuring numerical error and its application in comparing various uncertainty quantification methods and measuring their sensitivity to numerical error in their inputs.

This particular case study is further detailed [in my Ph.D.](https://www.researchgate.net/publication/348551075_Compromise_between_precision_and_performance_in_high_performance_computing)
