---
title: "Nestor's guide to creating a blog"
draft: false
comments: false
date: 2022-05-29
images:
---

**Disclaimer**: this guide is mostly about me keeping a trace of the process I followed to create this blog.
I *really* wanted to use GitHub for the hosting and that leads to a lot of additional complexity that you should avoid if you are not used to writing code.

## Hosting

I used [GitHub pages](https://pages.github.com/) to host my blog, they are free but only support static websites and, by default, force you to use their domain.
Both restrictions are fine by me since I wanted a static website and am okay with having a domain that makes it clear that writing code is a part of my life.

## Blogging platform

I really wanted to write my blog in [Markdown](https://www.markdownguide.org/) as I find it to be the proper level of abstraction to separate formatting from content.

GitHub pages recommends using [Jekyll](https://jekyllrb.com/) in order to have a markdown-based blog.
However, I found their approach too restrictive for my needs: Jekyll felt heavily optimized for a normal blog organization (a series of post in chronological order) while I wanted my content to be organized in a deep tree-like folder hierarchy.

I thus decided to use [Hugo](https://gohugo.io/), following [this excellent tutorial](https://4bes.nl/2021/08/29/create-a-website-with-hugo-and-github-pages/).

## Personalizing the blog

Hugo supports [a large number of themes](https://themes.gohugo.io/) and lets you customize things fairly easily.
So far I have barely scratched the surface.
