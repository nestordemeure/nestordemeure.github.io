#! /bin/sh
# stop on the first error so a failed build is never committed
set -e

# always operate on the repository containing this script
cd "$(dirname "$0")"

# makes sure the blog is rebuilded with the latest information
rm -rf docs/*
hugo

# pushes the blog to github
git add -A .
git commit -m "updating the blog content"
git push origin main
