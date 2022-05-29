#! /bin/sh

# makes sure the blog is rebuilded with the latest information
rm -r docs/*
hugo

# pushes the blog to github
git add -A .
git commit -m "updating the blog content"
git push origin main
