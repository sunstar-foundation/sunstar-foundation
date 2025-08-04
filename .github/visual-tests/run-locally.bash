#!/usr/bin/env bash

#export DOMAIN_MAIN="main--vg-macktrucks-com--sunstar-foundation.aem.page"
#export DOMAIN_BRANCH="update-from-boilerplate--vg-macktrucks-com--sunstar-foundation.aem.page"

export DOMAIN_MAIN="main--sunstar-foundation--sunstar-foundation.aem.page"
export DOMAIN_BRANCH="visual-tests--sunstar-foundation--sunstar-foundation.aem.page"

export TEST_PATHS="/"

# we ignore the exit code of the test command because we want to continue
npx playwright test
set -e

cat test-results/visual-diff.md
