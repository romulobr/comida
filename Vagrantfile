#!/usr/bin/env ruby

VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = 'dansweeting/ubuntu-trusty64-mongo-node'

  script = <<-SCRIPT
#!/bin/bash
set -e
set -o pipefail
set -x

pushd /vagrant

  # do we need to update/upgrade the distro?
  if [ -f .needs-update ]; then
    apt-get -y update
    apt-get -y upgrade
    rm -rf .needs-update
  fi

  # do we have git?
  which git > /dev/null || apt-get -y install git

  # do we have a running mongodb?
  mongo --eval 'db.runCommand({ping:1})' 2>&1 > /dev/null || service mongod restart

  # install all dependencies
  npm install -s
  pushd client
    ../node_modules/bower/bin/bower --allow-root install
  popd

popd
SCRIPT

  config.vm.provision 'shell', inline: script

  config.vm.network :forwarded_port, guest:  3000, host:  3001 # app
  config.vm.network :forwarded_port, guest: 27017, host: 27018 # mongodb

end
