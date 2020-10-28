#!/usr/bin/env sh
echo "start publish version: "$1
if test "$(git rev-parse --abbrev-ref HEAD)" == "master";
then
  echo "current branch is master"
  echo "start commit and push master"
  git add -A
  git commit -m "[master build] "$1
  git push origin
  echo "push success"
  echo "copy master lib to lib_tmp"
  mkdir lib_tmp
  cp -rf lib/* lib_tmp
  echo "check branch master-release"
  git checkout master-release
  echo "copy lib_tmp to master-release lib"
  cp -rf lib_tmp/* lib
  echo "start commit and push master-release"
  git add -A
  git commit -m "[master-release build] "$1
  git push origin
  echo "push master-release success"
  echo "create tag...."
  git tag -a $1 -m "version "$1
  git push origin $1
  echo "push tag success"
  echo "remove lib_tmp"
  rm -rf lib_tmp
else
  echo "current branch is not master"
  exit 128;
fi
