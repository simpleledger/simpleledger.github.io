#!/usr/bin/env sh

set -e

npm run docs:build

cd docs/.vuepress/dist

echo 'slp.dev' > CNAME

git init
git add -A
git commit -m 'deploy'

git push -f git@github.com:simpleledger/simpleledger.github.io.git master

cd -
