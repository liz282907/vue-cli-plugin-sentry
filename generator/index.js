/**
 * @description 负责raven的注册。其中generator执行后更新release并挂载到process.env上。
 */

const { hasGit } = require('@vue/cli-shared-utils');
const { getPluginName,getGitSha } = require('../util');

 module.exports = (api, opts) => {

    if((opts['release-mode']==='auto' && hasGit()) || !opts.release){
        opts.release = getGitSha();
    }
    process.env.__GIT_SHA__ = opts.release;

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