#!/bin/bash

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

if [ "$#" -eq 0 ]
then
  >&2 echo "error: missing flag"
  echo "usage: $(basename $0) [-Mmp]"
  exit 1
fi

if [ "$#" -gt 1 ]
then
  >&2 echo "error: too many flags"
  echo "usage: $(basename $0) [-Mmp]"
  exit 1
fi

while getopts ":Mmp" Option
do
  case $Option in
    M ) major=true;;
    m ) minor=true;;
    p ) patch=true;;
    ? ) 
     >&2 echo "error: unknown flag"
     echo "usage: $(basename $0) [-Mmp]"
     exit 1
  esac
done

shift $(($OPTIND - 1))


currentVersion=$(grep -Po '"version": "\K[1-9]+\.[0-9]+\.[0-9]+(?=")' package.json)

versionParts=(${currentVersion//./ })

if [ ! -z $major ]
then
  ((versionParts[0]++))
  versionParts[1]=0
  versionParts[2]=0
fi

if [ ! -z $minor ]
then
  ((versionParts[1]++))
  versionParts[2]=0
fi

if [ ! -z $patch ]
then
  ((versionParts[2]++))
fi

newVersion="${versionParts[0]}.${versionParts[1]}.${versionParts[2]}"


sed -i "s/\"version\": \"${currentVersion}\"/\"version\": \"${newVersion}\"/" "${SCRIPT_DIR}/package.json"
sed -i "s/v${currentVersion}/v${newVersion}/g" "${SCRIPT_DIR}/README.md"
sed -i "s/\"version\": \"${currentVersion}\"/\"version\": \"${newVersion}\"/" "${SCRIPT_DIR}/src/manifest.json"
sed -i "s/^## Unreleased/## Release ${newVersion}/" "${SCRIPT_DIR}/CHANGELOG.md"
sed -i '2 a ## Unreleased\n' "${SCRIPT_DIR}/CHANGELOG.md"
