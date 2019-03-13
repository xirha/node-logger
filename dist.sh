#!/bin/bash

set -e

echo "Compressing..."

NPM_FILENAME=$(npm pack)
DIST_FILENAME=node-logger-$(git rev-parse --short HEAD).tar.gz
ln -sf $NPM_FILENAME $DIST_FILENAME

echo "Uploading..."

ftp -v -n packages.swind.sk <<End-Of-Session
user packages packages
binary
cd n
put "$DIST_FILENAME"
bye
End-Of-Session

echo "Dist complete"

