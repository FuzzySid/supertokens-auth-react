#!/bin/bash

# pack-unpack repo to simulate an install
npm pack
cd $1

rm -rf node_modules/supertokens-auth-react/lib || true
rm -rf node_modules/supertokens-auth-react/recipe || true
mkdir -p node_modules/supertokens-auth-react
tar -xf ../../supertokens-auth-react-*.tgz --strip-components=1 -C node_modules/supertokens-auth-react
rm ../../supertokens-auth-react-*.tgz

cd node_modules/supertokens-auth-react

# install prod dependencies only
npm i --production --legacy-peer-deps

# We symlink the supertokens-web-js dep to ensure it's the same version (maybe linked locally)
rm -rf node_modules/supertokens-web-js || true
mkdir -p node_modules/supertokens-web-js
ln -s ../../../../node_modules/supertokens-web-js node_modules/supertokens-web-js

# We symlink the supertokens-website dep to ensure it's the same version (maybe linked locally)
rm -rf node_modules/supertokens-website || true
mkdir -p node_modules/supertokens-website
ln -s ../../../../node_modules/supertokens-website node_modules/supertokens-website

echo "$1 prepped."