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

I explored the use of [littlefoot.js](https://littlefoot.js.org/) to have footnote that would be displayed when hovered upon.
However, the results proved to be fragile.
At some point I might come back to the problem in order to try and add [side notes](https://capnfabs.net/posts/margin-notes-hugo-theme/).

## Writing the content

I first drew from previous texts I wrote for friends and message board as well as personal text I kept in folders (this explains why some dates are anterior to the creation of the blog).

As I am not aiming for a chronological blog, I did not hesitate to come back to previous texts and edit them heavily in order to improve them.
My aim is to keep doing this, coming back to texts from time to time when I see a way to improve them.

I have some essays and themes in mind for the new content.
I suspect that a key will be to make a note whenever a possible topic cross my mind.
