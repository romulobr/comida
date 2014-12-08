#!/bin/bash
set -e
set -o pipefail
set -x

pushd /vagrant

  if [ -f .needs-update ]; then
    apt-get -y update
    apt-get -y upgrade
    rm -rf .needs-update
  fi

  which git > /dev/null || apt-get -y install git

  npm install -s
  pushd client
    ../node_modules/bower/bin/bower --allow-root install
  popd

popd
