VAGRANTFILE_API_VERSION = '2'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|
  config.vm.box = 'dansweeting/ubuntu-trusty64-mongo-node'

  config.vm.network :forwarded_port, guest:  3000, host:  3001 # app
  config.vm.network :forwarded_port, guest: 27017, host: 27018 # mongodb

  config.vm.provision :shell, path: 'setup.sh'
end
