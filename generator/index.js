/**
 * @description 负责raven的注册
 */

const { hasGit, execa } = require('@vue/cli-shared-utils');
const { getPluginName } = require('../util');

const getGitSha = ()=>{
  const { stdout } = execa.shellSync('git rev-parse HEAD');
  return stdout.substr(0, 7);
};

 module.exports = (api, opts) => {

    if((opts['release-mode']==='auto' && hasGit()) || !opts.release){
        opts.release = getGitSha();
    }

    api.extendPackage({
      dependencies: {
        'raven-js': '^3.27.0'
      },
      devDependencies:{
        'webpack-sentry-plugin':'^1.16.0'
      },
      vue:{
        pluginOptions:{
          [getPluginName()]: opts
        }
      }
    });

    api.injectImports(api.entryFile, `import './sentry.js'`);
    api.render('./template');

};