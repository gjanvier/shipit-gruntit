var utils = require('shipit-utils');
var util = require('util');

module.exports = function(gruntOrShipit) {

  utils.registerTask(gruntOrShipit, 'gruntit', [
    'gruntit:install',
    'gruntit:build'
  ]);


  var shipit = utils.getShipit(gruntOrShipit);

  shipit.on('fetched', function() {
    shipit.start('gruntit');
  });


  /**
   * Install npm dependencies
   */

  utils.registerTask(gruntOrShipit, 'gruntit:install', npmInstall);

  function npmInstall() {
    shipit.log('Install node modules');
    return shipit.local(
      'npm install',
      {cwd: shipit.config.workspace}
    );
  }

  /**
   * Run grunt and build assets
   */
  utils.registerTask(gruntOrShipit, 'gruntit:build', build);

  function build() {
    shipit.log('Buil assets with grunt');
    var gruntIt = shipit.config.gruntIt || {};
    return shipit.local(
      util.format('grunt %s', gruntIt.task !== undefined ? gruntIt.task : 'default'),
      {cwd: shipit.config.workspace}
    );
  }
};
