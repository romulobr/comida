var gulp = require('gulp'),
    exec = require('child_process').exec,
    fs = require('fs');
    var install = require("gulp-install");

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('serve', function (cb) {
  exec('export NODE_ENV=production', function (err, stdout, stderr) {

  });
  exec('mongod --dbpath ./mongodb', function (err, stdout, stderr) {
    stdout.on('data', function (data) {
        process.stdout.write('slc: ' + data);
    });
    stderr.on('data', function (data) {
      process.stdout.write('slc: ' + data);
    });
    cb(err);
  });
  exec('slc run', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('serveprod', function (cb) {
  exec('export NODE_ENV=production', function (err, stdout, stderr) {

  });
  exec('slc run', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
});

gulp.task('configProduction', function (cb) {
  var productionDatabaseConfiguration = {
    db:{
      name:"db",
      connector: "loopback-connector-mongodb",
      url:process.env.DBURL
    }
  };
  fs.writeFile('./server/datasources.production.json', JSON.stringify(productionDatabaseConfiguration));
});

gulp.src(['./client/bower.json']).pipe(install());