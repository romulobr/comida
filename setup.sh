#!/bin/bash
sudo apt-get -y install git 
cd /vagrant
sudo npm install -g bower
npm install
cd client
bower install
cd ..
nodejs server/server.js&
