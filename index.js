const SentryPlugin = require('webpack-sentry-plugin');
const { getPluginName } = require('./util');
module.exports = (api, projectOptions) => {

    const options = optionValidator(projectOptions.pluginOptions[getPluginName()]);
    const {'release-mode': releaseMode, dsn, ...others } = options;
    // webpack相关的sourcemap及上传
    api.chainWebpack(webpackConfig => {
      webpackConfig.plugin('SentryPlugin')
        .use(SentryPlugin,[others]);
    });

};
module.exports.defaultModes = {
  build: 'production'
};

function optionValidator(options){
    return options;
}