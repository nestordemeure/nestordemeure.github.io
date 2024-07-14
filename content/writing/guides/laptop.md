---
title: "Nestor's Guide to Setting Up a New Laptop"
draft: true
comments: false
date: 2024-07-10
images:
---

**Disclaimer**: This guide is mostly about me keeping a trace of the process I followed when buying and setting up a new laptop. It is likely of little use to others.

## The Laptop

### Specs

**Things I care about:**

* 15" laptops (small enough to be portable but large enough for day-to-day development and writing work)
* 16GB RAM (to run a browser and an IDE concurrently smoothly)
* 8 cores (to run parallel algorithms efficiently)
* SSD storage
* NVIDIA GPU (less friction with most libraries) powerful enough for machine learning research locally (this criterion might be worth dropping at some point)

**Things I do not care about:**

* Sound quality
* Video quality
* Webcam quality
* More than 250GB of hard drive (500GB might be nice, 1TB is a waste of money)
* Windows operating system (if I have it, I will switch to a dual boot anyway)

**Nice bonuses to have:**

* Ability to close my webcam mechanically (one can also buy a cheap plastic cover online)

### Brand

I have been mostly happy with [ThinkPads](https://www.lenovo.com/us/en/d/deals/thinkpad-laptops) and recently updated my dying laptop (a [ThinkPad T15p Gen 2 (15” Intel)](https://www.lenovo.com/us/outletus/en/p/laptops/thinkpad/thinkpadt/thinkpad-t15-gen-2-(intel)/)) to a [ThinkPad T15p Gen 3 (15” Intel)](https://www.lenovo.com/us/en/p/laptops/thinkpad/thinkpadt/thinkpad-t15p-gen-3-(15-inch-intel)/len101t0039).

At some point, I hope to switch to a [Framework](https://frame.work/), mostly out of love for their philosophy of open technologies and repairability. I usually change my laptop because a critical component, such as the screen or hinges, died in a way that is not fixable cleanly. However, they are currently low on stock and still on the early adoption side of the curve, which feels too risky for a laptop that will be my daily driver.

Some sort of [MacBook](https://www.apple.com/shop/buy-mac/macbook-air/15-inch-m3) switched to Linux might also do the trick. I expect them to be sturdy and performant, but I am afraid that software I care about would still have only partial support for its hardware. They clearly prioritize features I do not care about, such as video quality, which makes me suspect that I should be able to spend the same amount of money, downgrade those aspects, and get a more performant laptop.

## The Software

### Linux

#### Distribution

I like Linux for its customizability and good fit for my needs. These days I don't really play video games or do intensive video or photo editing; my needs are mostly code-focused.

In particular, I use the blandest distribution of [Ubuntu](https://ubuntu.com/) in the hope that any bug I encounter will have a clear solution online. My major version update process is simple: I wait for my laptop to die and install the latest LTS version on the new laptop.

#### Installing Ubuntu

I do not use Windows enough to bother with a dual boot, but installation setups are such that I [still](https://bugs.launchpad.net/subiquity/+bug/2045480) need to finalize the Windows installation before getting started with the Ubuntu one. This requires turning off `fast startup` to be able to get back into the BIOS menu.

First, you need to create a Ubuntu boot USB stick. Ubuntu has instructions [here](https://ubuntu.com/tutorials/create-a-usb-stick-on-ubuntu).

Then you need to wrestle with the BIOS to install it. Lenovo has a ThinkPad-specific guide [here](https://download.lenovo.com/pccbbs/mobiles_pdf/tp_p1_gen2_ubuntu_18.04_lts_installation_v1.0.pdf) (you will likely want the most recent guide) that will help you deal with their BIOS. Ubuntu has a general guide [here](https://ubuntu.com/tutorials/install-ubuntu-desktop) that will help you deal with the rest of the installation.

I personally let the installer access the internet and accept third-party software and formats.

#### Configuration

**Settings:**

* Dark mode
* Resolution to be 1600 x 900 (16:9)
* Display battery percentage
* No home icon (no icon)
* Display weekday
* Automatic time zone
* Low volume for system sounds
* Only one workspace

**Files preference:**

* Create link enabled
* Big icons

**Software and updates:**

* Never display new Ubuntu versions

**Dock:**

* Add system monitor
* Add shell

**Desktop:**

* No trash in dock

**GNOME Text Editor:**

* My favorite dark theme
* Line numbers
* No session restart
* 4 spaces instead of tabs
* 80% sized font
* Make it the default Git editor (`git config --global core.editor "gnome-text-editor"`)

### Software

**`apt` install:**

* `gdebi` (to be able to install `.deb` files)
* `git`
* `curl`
* `ocrmypdf`, `pdfunite`, `pdf2txt`

**`.deb` files:**

* Chrome
  * My Google account
  * My baseline tabs/group
* Zoom

**App center:**

* VSCode
  * Sync profile
* CheeseCAM
* VLC
* HandBrake
* Shotwell (for quick, tiny image editing)

## Files

I then move most of my files, including:

* My laptop background picture
* My icon
* My templates

**SSH:**

* Creating a new key and setting it up for GitHub
* Setting up a folder-over-SSH for remote work (`sftp://perlmtter-p1.nersc.gov/global/u2/n/nestor`)
