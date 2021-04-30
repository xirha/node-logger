#!/bin/bash

set -e

echo "Compressing..."

NPM_FILENAME=$(npm pack)

echo "Uploading..."

ftp -v -n packages.swind.sk <<End-Of-Session
user packages packages
binary
cd n
put "$NPM_FILENAME"
bye
End-Of-Session

echo "Dist complete"

