---
title: "Nestor's guide to creating a blog"
draft: false
comments: false
date: 2022-05-29
images:
---

**Disclaimer**: This guide is mostly about me keeping a trace of the process I followed to create this blog.
I *really* wanted to use GitHub for the hosting and that leads to a lot of additional complexity that you should avoid if you are not used to writing code.

## Hosting

I used [GitHub pages](https://pages.github.com/) to host my blog, they are free but only support static websites and, by default, force you to use their domain.
Both restrictions are fine by me since I wanted a static website and am okay with having a domain that makes it clear that writing code is a part of my life.

## Blogging platform

I really wanted to write my blog in [Markdown](https://www.markdownguide.org/) as I find it to be the proper level of abstraction to separate formatting from content.

GitHub pages recommends using [Jekyll](https://jekyllrb.com/) to have a Markdown-based blog.
However, I found their approach too restrictive for my needs: Jekyll felt heavily optimized for a normal blog organization (a series of posts in chronological order) while I wanted my content to be organized in a deep tree-like folder hierarchy.

I thus decided to use [Hugo](https://gohugo.io/), following [this excellent tutorial](https://4bes.nl/2021/08/29/create-a-website-with-hugo-and-github-pages/).

## Personalizing the blog

Hugo supports [a large number of themes](https://themes.gohugo.io/) and lets you customize things fairly easily.
So far I have barely scratched the surface.

I wrote some Javascript and CSS (loosely inspired by [this approach](https://scripter.co/sidenotes-using-ox-hugo/)) to automatically convert my footnotes into [side notes](https://www.gwern.net/Sidenotes).

I also added an `unlisted` field, using [this approach](https://bphogan.com/2020/08/11/2020-08-11-creating-unlisted-content-in-hugo/), to be able to link to pages that would not appear in the index by default (this can be done by setting them to draft but feels semantically wrong).

## Writing the content

I first drew from previous texts I wrote for friends and message boards as well as personal texts I kept in folders (this explains why some dates are anterior to the creation of the blog).

As I am not aiming for a chronological blog, I do not hesitate to come back to previous texts and edit them heavily to improve them.
I aim to keep doing this, coming back to texts from time to time when I see ways to improve them.

I have some essays and themes in mind for the new content.
I suspect that a key will be to make a note whenever a possible topic crosses my mind.
