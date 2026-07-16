#! /bin/sh
# stop on the first error so a failed build is never committed
set -e

# always operate on the repository containing this script
cd "$(dirname "$0")"

# commit the content first: pages without a front-matter date take their date
# from their last git commit, so content must be committed before building
git add -A .
git commit -m "updating the blog content" || true

# makes sure the blog is rebuilded with the latest information
rm -rf docs/*
hugo --minify

# commits the generated site and pushes it to github
git add -A .
git commit -m "publishing the blog" || true
git push origin main
