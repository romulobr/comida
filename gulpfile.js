var gulp = require('gulp'),
    exec = require('child_process').exec,
    run = require('gulp-run'),
    fs = require('fs');
    var install = require("gulp-install");

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('serve', function (cb) {
  new run.Command('export NODE_ENV=local').exec().pipe(process.stdout);
  new run.Command('mongod --dbpath ./mongodb').exec().pipe(process.stdout);
  new run.Command('slc run').exec().pipe(process.stdout);
});

gulp.task('serveprod', function (cb) {
  new run.Command('export NODE_ENV=production').exec().pipe(process.stdout);
  new run.Command('slc run').exec().pipe(process.stdout);
});

gulp.task('generateservice', function (cb) {
    new run.Command('lb-ng ./server/server.js client/js/lib/loopback/lb-services.js').exec().pipe(process.stdout);
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

  var newRelicConfigFile = "exports.config = {app_name : ['comida-app'],license_key :'" +process.env.NEW_RELIC_LICENSE_KEY+"',logging : { level : 'info' }};"
  fs.writeFile('./newRelic.js', newRelicConfigFile);
});
