#!/usr/bin/env bash
set -euo pipefail

UPSTREAM_URL="https://github.com/57Darling02/VitePress_butterfly.git"

if ! git remote get-url upstream >/dev/null 2>&1; then
  git remote add upstream "$UPSTREAM_URL"
fi

git fetch upstream
git checkout main
git reset --hard upstream/main
git push origin main --force
