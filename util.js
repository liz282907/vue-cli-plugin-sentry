const { execa,chalk } = require('@vue/cli-shared-utils');
const uuidv4 = require('uuid/v4');

module.exports = {
    getPluginName() {
      return 'vue-cli-plugin-sentry';
    },
    getGitSha(){
      let hash = '';
      try{
        hash = execa.shellSync('git rev-parse HEAD').stdout;
      }catch(err){
        hash = uuidv4();
        console.log(chalk.yellow('have not commit, will use random uuid as release'));
      };
      return hash.substr(0, 7);
    },
    isProduction(){
      return 'production' === process.env.NODE_ENV;
    }
  };