# Comida - App to order food for a bunch of people inside offices

### Backend: Express - [Strong Loop](http://strongloop.com/) - MongoDb
### Frontend: Angular - Angular Material Design

## Project set-up:

Before installing, make sure you have recent versions of
[Git](http://www.git-scm.com/), [Vagrant](https://www.vagrantup.com/)
and [VirtualBox](https://www.virtualbox.org/) installed on your
development machine.

Then, simply clone the repository:

```
git clone git@github.com:romulobr/comida.git
```

And create a Vagrant machine from the root of the project:

```
cd comida
vagrant up
```

This will download and install all the required dependencies, and
set up the database for you. To make sure everything worked well,
try running the application:

```
vagrant ssh -c 'cd /vagrant && ./gulp serve'
```

By default, the application is exposed on port 3001. You should be
able to visit http://localhost:3001/index and see an empty instance.

The MongoDB instance is also visible to your machine on port 27018.

# Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

This project rocks and uses the MIT LICENSE.
