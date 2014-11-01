var gulp = require('gulp');
var exec = require('child_process').exec;

gulp.task('default', function() {
  // place code for your default task here
});

gulp.task('serve', function (cb) {
  exec('mongod --dbpath ./mongodb', function (err, stdout, stderr) {
    stdout.on('data', function (data) {
        process.stdout.write('slc: ' + data);
    });
    stderr.on('data', function (data) {
      console.log('slc: ' + data);
    });
    cb(err);
  });
  exec('slc run', function (err, stdout, stderr) {
    console.log(stdout);
    console.log(stderr);
    cb(err);
  });
})