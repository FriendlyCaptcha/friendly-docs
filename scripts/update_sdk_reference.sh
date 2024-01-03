#!/bin/bash

# This script copies the SDK reference documentation from the SDK package installed in node_modules
# to the docs folder.

set -e


source="node_modules/@friendlycaptcha/sdk/docs/docusaurus/"
target="docs/sdk/reference"

rm -r "$target"
mkdir -p "$target"

cp -r "$source" "$target"
