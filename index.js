/**
 * @description: webpack sentry plugin的设置
 *  关于 release: 手动设置则不变更，否则为每次项目的git_sha。
    vue.config.json内写入的只是项目新建时的，以内存中为准。
 * @author: chenlu.leila
 * @email: chenlu.leila@bytedance.com
 *
 * @created: 2018-10-09 11:53:39
 */

const SentryPlugin = require('webpack-sentry-plugin');
const { getPluginName, getGitSha, isProduction } = require('./util');
const GIT_SHA = getGitSha();

function optionValidator(options){
    return options;
}

function extractFromOptions(projectOptions){

    const defaultOptions = {
        deleteAfterCompile:true,
        suppressConflictError: true
    };
    const receivedOptions = projectOptions.pluginOptions[getPluginName()];
    const options = optionValidator(Object.assign(receivedOptions,defaultOptions));
    const {'release-mode': releaseMode, dsn, ...others } = options;

    if(releaseMode==='auto'){
        process.env.__GIT_SHA__ = GIT_SHA;
        others.release = GIT_SHA;
    }
    return others;
}

module.exports = (api, projectOptions) => {

    if(!isProduction()) return;

    const webpackSentryPluginOptions = extractFromOptions(projectOptions);
    // webpack相关的sourcemap及上传
    api.chainWebpack(webpackConfig => {
      webpackConfig.plugin('SentryPlugin')
        .use(SentryPlugin,[webpackSentryPluginOptions]);
    });

};
module.exports.defaultModes = {
  build: 'production'
};
