#!/bin/bash
set -e
set -x

if [ "${TRAVIS_BRANCH}" = "master" ]; then
    # always push to stage-beta
    HUB_CLOUD_BETA="true" npm run deploy
    echo "PUSHING qa-beta"
    rm -rf ./dist/.git
    .travis/release.sh "qa-beta"

    # only push to stage-stable when enabled
    if [ -f .cloud-stage-cron.enabled ]; then
        HUB_CLOUD_BETA="false" npm run deploy
        echo "PUSHING qa-stable"
        rm -rf ./dist/.git
        .travis/release.sh "qa-stable"
    fi
fi

if [[ "${TRAVIS_BRANCH}" = "prod-beta" ]]; then
    HUB_CLOUD_BETA="true" npm run deploy
    echo "PUSHING prod-beta"
    rm -rf ./build/.git
    .travis/release.sh "prod-beta"

    # FIXME: remove .. triggering a stage-stable push from non-master commit
    HUB_CLOUD_BETA="false" npm run deploy
    echo "PUSHING qa-stable"
    rm -rf ./dist/.git
    .travis/release.sh "qa-stable"
fi

if [[ "${TRAVIS_BRANCH}" = "prod-stable" ]]; then
    HUB_CLOUD_BETA="false" npm run deploy
    echo "PUSHING prod-stable"
    rm -rf ./build/.git
    .travis/release.sh "prod-stable"
fi

